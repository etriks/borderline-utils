const defines = require('./defines.js');
let ErrorStack = require('./error.js');
let RegistryModule = require('./registry.js');
let ConfigurationModule = require('./configuration.js');

module.exports = {
    Models: {
        BL_MODEL_REGISTRY: defines.registryModel,
        BL_MODEL_USER: defines.userModel,
        BL_MODEL_WORKFLOW: defines.workflowModel,
        BL_MODEL_STEP: defines.stepModel,
        BL_MODEL_EXTENSION: defines.extensionModel,
        BL_MODEL_DATA_SOURCE: defines.dataSourceModel,
        BL_MODEL_EXECUTION: defines.executionModel,
        BL_MODEL_CREDENTIALS: defines.credentialsModel,
        BL_MODEL_DATA: defines.dataModel,
        BL_MODEL_QUERY: defines.queryModel
    },
    Constants: {
        BL_SERVER_SERVICE: defines.serverServiceName,
        BL_MIDDLEWARE_SERVICE: defines.middlewareServiceName,

        BL_SERVICE_STATUS_UNKNOWN: defines.statusServiceUnknown,
        BL_SERVICE_STATUS_IDLE: defines.statusServiceIdle,
        BL_SERVICE_STATUS_BUSY: defines.statusServiceBusy,
        BL_SERVICE_STATUS_DEAD: defines.statusServiceDead,

        BL_GLOBAL_COLLECTION_CONFIGURATION: defines.global_configurationCollectionName,
        BL_GLOBAL_COLLECTION_REGISTRY: defines.global_registryCollectionName,
        BL_GLOBAL_COLLECTION_SESSIONS: defines.global_sessionCollectionName,
        BL_GLOBAL_COLLECTION_STORAGE: defines.global_storageCollectionName,

        BL_SERVER_COLLECTION_USERS: defines.server_userCollectionName,
        BL_SERVER_COLLECTION_WORKFLOW: defines.server_workflowCollectionName,
        BL_SERVER_COLLECTION_STEPS: defines.server_stepCollectionName,
        BL_SERVER_COLLECTION_DATA_SOURCES: defines.server_dataSourcesCollectionName,
        BL_SERVER_COLLECTION_EXTENSIONS: defines.server_extensionsCollectionName,

        BL_MIDDLEWARE_COLLECTION_QUERY: defines.middleware_queryCollectionName,

        BL_DEFAULT_SESSION_TIMEOUT: defines.sessionTimeout,
        BL_DEFAULT_REGISTRY_FREQUENCY: defines.registryUpdateInterval,
        BL_DEFAULT_EXTENSION_FREQUENCY: defines.extensionUpdateInterval,
        BL_DEFAULT_EXTENSION_MANIFEST: defines.extensionManifestFilename,


        BL_QUERY_TYPE_TS171: defines.queryTypeTransmart,
        BL_QUERY_TYPE_FILE: defines.queryTypeFile,
        BL_QUERY_TYPE_EAE: defines.queryTypeEAE,

        BL_QUERY_STATUS_UNKNOWN: defines.queryStatusUnknown,
        BL_QUERY_STATUS_ERROR: defines.queryStatusError,
        BL_QUERY_STATUS_INITIALIZE: defines.queryStatusInitialize,
        BL_QUERY_STATUS_EXECUTE: defines.queryStatusExecute,
        BL_QUERY_STATUS_TERMINATE: defines.queryStatusTerminate,
        BL_QUERY_STATUS_DONE: defines.queryStatusDone
    },
    ErrorHelper: ErrorStack,
    ConfigurationHelper: ConfigurationModule,
    RegistryHelper: RegistryModule,
    RegistryIdentifier: RegistryModule.identifier
};