const isQueried = function(empId, date) {
    return function(transaction) {
        const isValidEmpId = transaction.empId === empId;
        const isValidDate = transaction.date.slice(0, 10) === date;

        let isValid = (empId && isValidEmpId) || (true && !empId);
        isValid = isValid && ((date && isValidDate) || (true && !date));

        return isValid;
    };
};

const evalSave = function(transactionsRecord, transaction) {
    transactionsRecord.push(transaction);
    return transactionsRecord;
};

const evalQuery = function(transactionsRecord, queriedTransactionsDetail) {
    const empId = queriedTransactionsDetail.empId;
    const date = queriedTransactionsDetail.date;
    const queriedTransactions = transactionsRecord.filter(isQueried(empId, date));

    return queriedTransactions;
};

exports.save = evalSave;
exports.isQueried = isQueried;
exports.query = evalQuery;
