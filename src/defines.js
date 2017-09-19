const configurationModel = {
    type: 'borderline-component',
    swift: {
        host: '127.0.0.1',
        port: 80,
        protocol: 'http',
        username: '',
        password: ''
    }
}

const registryModel = {
    type: 'borderline-component',
    status: '',
    version: '0.0.1',
    lastUpdate: '',
    port: 4242,
    ip: 'localhost',
    hostname: 'localhost',
    protocol: 'http',
    system: {
        arch: 'unknown',
        type: 'unknown',
        platform: 'unknown',
        version: '0.0'
    },
    cpu: {
        cores: [
        ],
        loadavg: [0, 0, 0]
    },
    memory: {
        total: 0,
        free: 0
    }
};


const userModel = {
    username: '',
    password: '',
    admin: false
};

const dataSourceModel = {
    type: '',
    name: '',
    host: '',
    port: 8080,
    protocol: 'http',
    baseUrl: '',
    public: false,
    users: []
};

const extensionModel = {
    name: '',
    description: '',
    author: '',
    build: '',
    version: '0.0.1',
    enabled: {}
};

const stepModel = {
    create: '', //Datetime
    update: '', //Datetime
    workflow: '',
    user: '',
    extension: [],
    context: {}
};

const workflowStepModel = {
    parent: null,
    children: []
};

const workflowModel = {
    create: '', //Datetime
    update: '', //Datetime
    owner: '',
    read: [],
    write: [],
    graph: workflowStepModel
};

const credentialsModel = {
    username: '',
    password: ''
};

const executionModel = {
    status: 'query-status-unknown',
    start: null,
    end: null,
    info: ''
};

const dataModel = {
    label: '',
    metadata: {
    },
    cache: {
        dataSize: '0 b',
        storageId: ''
    }
};

const queryModel = {
    endpoint: dataSourceModel,
    credentials: credentialsModel,
    status: executionModel,
    input: [],
    output: []
};

module.exports = {
    serverServiceName: 'borderline-server',
    middlewareServiceName: 'borderline-middleware',
    uiServiceName: 'borderline-ui',

    statusServiceUnknown: 'borderline_service_unknown',
    statusServiceIdle: 'borderline_service_idle',
    statusServiceBusy: 'borderline_service_busy',
    statusServiceDead: 'borderline_service_dead',

    global_configurationCollectionName: 'borderline_global_configuration',
    global_registryCollectionName: 'borderline_global_registry',
    global_storageCollectionName: 'borderline_global_storage',
    global_sessionCollectionName: 'borderline_global_sessions',

    server_userCollectionName: 'borderline_server_users',
    server_workflowCollectionName: 'borderline_server_workflows',
    server_stepCollectionName: 'borderline_server_steps',
    server_dataSourcesCollectionName: 'borderline_server_data_sources',
    server_extensionsCollectionName: 'borderline_server_extensions',
    middleware_queryCollectionName: 'borderline_middleware_queries',


    queryTypeTransmart: 'TS171',
    queryTypeFile: 'File',
    queryTypeEAE: 'eAE.v2',

    queryStatusUnknown: 'query-status-unknown',
    queryStatusError: 'query-status-error',
    queryStatusInitialize: 'query-status-0',
    queryStatusExecute: 'query-status-1',
    queryStatusTerminate: 'query-status-2',
    queryStatusDone: 'query-status-3',

    sessionTimeout: 6 * (24 * 60 * 60), // 6 Days
    registryUpdateInterval: 5 * 1000, // 5 * 1000 ms = 5 seconds
    extensionUpdateInterval: 10 * 1000, // 10 * 1000 ms = 10 seconds
    extensionManifestFilename: 'manifest.json',

    configurationModel: configurationModel,
    registryModel: registryModel,
    userModel: userModel,
    dataSourceModel: dataSourceModel,
    extensionModel: extensionModel,
    stepModel: stepModel,
    workflowStepModel: workflowStepModel,
    workflowModel: workflowModel,
    executionModel: executionModel,
    credentialsModel: credentialsModel,
    dataModel: dataModel,
    queryModel: queryModel,
};