const getStorePath = function(env) {
    const testPath = env.beverageRecordStorePath;
    const defaultPath = "./data/beverageRecord.json";
    return testPath || defaultPath;
};

const getDate = function(env) {
    const now = () => new Date(env.now).toJSON();
    const date = () => new Date();
    return env.now === undefined ? date : now;
};

exports.getStorePath = getStorePath;
exports.getDate = getDate;
