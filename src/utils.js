const readRecord = function(path, reader, isExist) {
    if (!isExist(path)) {
        return {};
    }

    return reader(path, "utf-8");
};

const writeRecord = function(filePath, writer, record) {
    writer(filePath, record, "utf-8");
};

exports.readRecord = readRecord;
exports.writeRecord = writeRecord;
