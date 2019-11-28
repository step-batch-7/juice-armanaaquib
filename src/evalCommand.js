const isQueried = function(queried) {
    return function(transaction) {
        /*
        let isQueriedEmpId = transaction.empId === queried.empId;
        let isQueriedDate = transaction.date.slice(0, 10) === queried.date;
        let isQueriedBeverage = transaction.beverage === queried.beverage;

        isQueriedEmpId = (queried.empId && isQueriedEmpId) || (true && !queried.empId);
        isQueriedDate = isQueried && ((queried.date && isQueriedDate) || (true && !queried.date));
        isQueriedBeverage = isQueried && ((queried.beverage && isQueriedBeverage) || (true && !queried.beverage));
        */

        let isQueriedEmpId = true;
        let isQueriedBeverage = true;
        let isQueriedDate = true;

        if (queried.empId !== undefined) {
            isQueriedEmpId = transaction.empId === queried.empId;
        }

        if (queried.beverage !== undefined) {
            isQueriedBeverage = transaction.beverage === queried.beverage;
        }

        if (queried.date !== undefined) {
            isQueriedDate = transaction.date.toJSON().slice(0, 10) === queried.date;
        }

        return isQueriedEmpId && isQueriedBeverage && isQueriedDate;
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
