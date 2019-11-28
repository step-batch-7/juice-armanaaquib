const isQueried = function(queried) {
    return function(transaction) {
        const isQueriedEmpId = transaction.empId === queried.empId;
        const isQueriedDate = transaction.date.slice(0, 10) === queried.date;
        const isQueriedBeverage = transaction.beverage === queried.beverage;

        let isQueried = (queried.empId && isQueriedEmpId) || (true && !queried.empId);
        isQueried = isQueried && ((queried.date && isQueriedDate) || (true && !queried.date));
        isQueried = isQueried && ((queried.beverage && isQueriedBeverage) || (true && !queried.beverage));

        return isQueried;
    };
};

const evalSave = function(transactionsRecord, transaction) {
    transactionsRecord.push(transaction);
    return transactionsRecord;
};

const evalQuery = function(transactionsRecord, queriedTransactionsDetail) {
    const queriedTransactions = transactionsRecord.filter(isQueried(queriedTransactionsDetail));
    return queriedTransactions;
};

exports.save = evalSave;
exports.isQueried = isQueried;
exports.query = evalQuery;
