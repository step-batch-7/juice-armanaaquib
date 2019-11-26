const readRecord = function(isExist, filePath, reader, encoding) {
    return (!isExist(filePath) && "[]") || reader(filePath, encoding);
};

const writeRecord = function(writer, filePath, record, encoding) {
    writer(filePath, record, encoding);
};

exports.readRecord = readRecord;
exports.writeRecord = writeRecord;
