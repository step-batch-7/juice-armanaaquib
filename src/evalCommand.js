const isQueriedEmpId = function(empId) {
    return function(transaction) {
        return transaction.empId === empId;
    };
};

const evalSave = function(transactionsRecord, transaction) {
    transactionsRecord.push(transaction);
    return transactionsRecord;
};

const evalQuery = function(transactionsRecord, queriedTransactionsDetail) {
    const empId = queriedTransactionsDetail.empId;
    const queriedTransactions = transactionsRecord.filter(isQueriedEmpId(empId));
    return queriedTransactions;
};

exports.save = evalSave;
exports.isQueriedEmpId = isQueriedEmpId;
exports.query = evalQuery;
