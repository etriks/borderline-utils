const ObjectID = require('mongodb').ObjectID;
const defines = require('./defines.js');
const ErrorStack = require('./error.js');

/**
 * @fn Configuration
 * @desc Provides a convenient interface to report
 * the current health/status/state of a service inside a common mongoDB collection
 * @param serviceType {String} Name of the borderline project creating this class
 * @param configurationCollection MongoDB collection of the configuration to synchronise with.
 * @constructor
 */
function Configuration(serviceType, configurationCollection) {
    // Init member vars
    this._fetched = false;
    this._type = serviceType;
    this._model = Object.assign({}, defines.configurationModel, { type: this._type });
    this._configurationCollection = configurationCollection;

    // Bind public member functions
    this.getModel = Configuration.prototype.getModel.bind(this);

    // Bind private member functions
    this._sync = Configuration.prototype._sync.bind(this);
}

/**
 * @fn getModel
 * @desc Retrieves the model of this configuration
 * @return {Object} The current model as a plain JS object attribute container
 */
Configuration.prototype.getModel = function () {
    let _this = this;
    return new Promise(function (resolve, reject) {
        if (_this._fetched)
            resolve(_this._model);
        else
            _this._sync().then(function () {
                _this._fetched = true;
                resolve(_this._model)
            }).catch(function (error) {
                reject(ErrorStack('Update configuration failed', update_error))
            })
    })
};

/**
 * @fn setModel
 * @desc Update the service model by merging the attributes in the given object.
 * If attributes are the same, the attributes from the parameters overrides the internal model values
 * @param model {Object} A plain js object attribute container
 * @return {Object} The updated model attributes.
 */
Configuration.prototype.setModel = function (model) {
    this._model = Object.assign({}, this._model, model);
    return this._model;
};

/**
 * @fn _sync
 * @desc Update this service configuration model in the configuration collection
 * @return {Promise} Resolves to true on success, rejects an Errorstack otherwise
 * @private
 */
Configuration.prototype._sync = function () {
    let _this = this;
    return new Promise(function (resolve, reject) {
        let model_update = Object.assign({}, _this.getModel());
        let mongo_id = model_update._id;
        delete model_update._id; // Let mongoDB handle ids
        _this._configurationCollection.findOneAndUpdate({ type: _this.type }, model_update, { returnOriginal: false, upsert: true }).then(function (result) {
            // Update local model with whats inside the DB
            _this.setModel(result.value);
            resolve(true); // All good, update successful
        }, function (update_error) {
            reject(ErrorStack('Update configuration failed', update_error));
        })
    });
};

module.exports = Configuration;