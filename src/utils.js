const readRecord = function(isExist, filePath, reader, encoding) {
    if (!isExist(filePath)) {
        return {};
    }

    return reader(filePath, encoding);
};

const writeRecord = function(writer, filePath, record, encoding) {
    writer(filePath, record, encoding);
};

exports.readRecord = readRecord;
exports.writeRecord = writeRecord;
