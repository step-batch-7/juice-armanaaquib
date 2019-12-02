const getStorePath = function(env) {
    if (env.beverageRecordStorePath === undefined) {
        return "./data/beverageRecord.json";
    }

    return env.beverageRecordStorePath;
};

exports.getStorePath = getStorePath;
