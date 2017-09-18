const os = require('os');
const ObjectID = require('mongodb').ObjectID;
const bytes = require('bytes');
const ip = require('ip');
const defines = require('./defines.js');
const ErrorStack = require('./error.js');

/**
 * @fn Registry
 * @desc Provides a convenient interface to report
 * the current health/status/state of a service inside a common mongoDB collection
 * @param serviceType {String} Name of the borderline project creating this class
 * @param registryCollection MongoDB collection of the registry to synchronise with.
 * @constructor
 */
function Registry(serviceType, registryCollection) {
    // Init member vars
    this._type = serviceType;
    this._model = Object.assign({}, defines.registryModel, { type: this._type });
    this._interval_timer = null;
    this._registryCollection = registryCollection;

    // Bind public member functions
    this.getModel = Registry.prototype.getModel.bind(this);
    this.setModel = Registry.prototype.setModel.bind(this);
    this.setStatus = Registry.prototype.setStatus.bind(this);
    this.getStatus = Registry.prototype.getStatus.bind(this);
    this.startPeriodicUpdate = Registry.prototype.startPeriodicUpdate.bind(this);
    this.stopPeriodicUpdate = Registry.prototype.stopPeriodicUpdate.bind(this);

    // Bind private member functions
    this._sync = Registry.prototype._sync.bind(this);
    this._systemInfoUpdate = Registry.prototype._systemInfoUpdate.bind(this);
}

let _global_process_identifier = 'default';
Registry.identifier = function () {
    return _global_process_identifier;
};

/**
 * @fn getModel
 * @desc Retrieves the model of this registry
 * @return {Object} The current model as a plain JS object attribute container
 */
Registry.prototype.getModel = function () {
    return this._model;
};

/**
 * @fn setModel
 * @desc Update the service model by merging the attributes in the given object.
 * If attributes are the same, the attributes from the parameters overrides the internal model values
 * @param model {Object} A plain js object attribute container
 * @return {Object} The updated model attributes.
 */
Registry.prototype.setModel = function (model) {
    this._model = Object.assign({}, this._model, model);
    return this._model;
};

/**
 * @fn setStatus
 * @desc Setter on the status property. This triggers a db sync
 * @param newStatus[in] {String} New value for the status
 * @return {String} Updated status
 */
Registry.prototype.setStatus = function (newStatus) {
    this._model.status = newStatus;
    this._sync();
    return _this._model.status;
};

/**
 * @fn getStatus
 * @desc Getter on the status property
 * @return {String} Returns the current status of this service
 */
Registry.prototype.getStatus = function () {
    return this._model.status;
};

/**
 * @fn startPeriodicUpdate
 * @desc Start updating every [delay] the registry collection with
 * updated system information and status
 * @param[in] delay Frequency of the refresh in milliseconds
 */
Registry.prototype.startPeriodicUpdate = function (delay = defines.registryUpdateInterval) {
    let _this = this;
    _this.stopPeriodicUpdate(); // Stop running interval timer if any
    // Start interval timer update
    _this._interval_timer = setInterval(function () {
        _this._systemInfoUpdate(); // Refresh model
        _this._sync(); // Silently synchronise with DB
    }, delay);
};

/**
 * @fn stopPeriodicUpdate
 * @desc Stops the current interval timer ticks if any
 */
Registry.prototype.stopPeriodicUpdate = function () {
    let _this = this;
    if (_this._interval_timer !== null && _this._interval_timer !== undefined) {
        clearInterval(_this._interval_timer);
        delete _this._interval_timer;
    }
};

/**
 * @fn _sync
 * @desc Update this service registry model in the registry collection
 * @return {Promise} Resolves to true on success, rejects an Errorstack otherwise
 * @private
 */
Registry.prototype._sync = function () {
    let _this = this;
    return new Promise(function (resolve, reject) {
        let model_update = Object.assign({}, _this.getModel());
        let mongo_id = model_update._id;
        delete model_update._id; // Let mongoDB handle ids
        _this._registryCollection.findOneAndUpdate({ _id: new ObjectID(mongo_id) }, model_update, { returnOriginal: false, upsert: true }).then(function (result) {
            // Assign global identifier value of this process
            _global_process_identifier = result.value._id.toHexString();
            // Update local model with whats inside the DB
            _this.setModel(result.value);
            resolve(true); // All good, update successful
        }, function (update_error) {
            reject(ErrorStack('Update registry failed', update_error));
        })
    });
};

Registry.prototype._systemInfoUpdate = function () {
    let _this = this;

    //Assign status values
    this._model.lastUpdate = new Date();
    this._model.ip = ip.address().toString();
    this._model.hostname = os.hostname();

    //Retrieving system information
    this._model.system.arch = os.arch();
    this._model.system.type = os.type();
    this._model.system.platform = os.platform();
    this._model.system.version = os.release();

    //Retrieving memory information
    this._model.memory.total = bytes(os.totalmem());
    this._model.memory.free = bytes(os.freemem());

    //Retrieving CPUs information
    this._model.cpu.loadavg = os.loadavg();
    this._model.cpu.cores = [];
    os.cpus().forEach(function (cpu) {
        _this._model.cpu.cores.push({
            model: cpu.model,
            mhz: cpu.speed
        }
        );
    });
};

module.exports = Registry;