const readRecord = function(doesExist, filePath, reader, encoding) {
    return (!doesExist(filePath) && "[]") || reader(filePath, encoding);
};

const writeRecord = function(writer, filePath, record, encoding) {
    writer(filePath, record, encoding);
};

const parseToDateObj = function(transaction) {
    transaction.date = new Date(transaction.date);
    return transaction;
};

exports.readRecord = readRecord;
exports.writeRecord = writeRecord;
exports.parseToDateObj = parseToDateObj;
