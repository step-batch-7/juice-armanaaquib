const readRecord = function(doesExist, filePath, reader, encoding) {
    return (!doesExist(filePath) && "[]") || reader(filePath, encoding);
};

const writeRecord = function(writer, filePath, record, encoding) {
    writer(filePath, record, encoding);
};

exports.readRecord = readRecord;
exports.writeRecord = writeRecord;
