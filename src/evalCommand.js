const sumQty = function(qty, transactionDetail) {
    return qty + transactionDetail.qty;
};

const insertEmpId = function(empId) {
    return function(transactionDetail) {
        transactionDetail.empId = empId;
        return transactionDetail;
    };
};

const evalSave = function(transactionsRecord, transactionDetail) {
    const empId = transactionDetail.empId;
    const transaction = transactionDetail.transaction;

    if (!transactionsRecord[empId]) {
        transactionsRecord[empId] = {
            empId: empId,
            transactions: []
        };
    }

    transactionsRecord[empId].transactions.push(transaction);
    return transactionsRecord;
};

const evalQuery = function(transactionsRecord, transactionDetail) {
    transactionsDetail = {
        total: 0,
        transactions: []
    };
    const empId = transactionDetail.empId;

    if (transactionsRecord[empId]) {
        transactionsDetail.transactions = transactionsRecord[empId].transactions;
        transactionsDetail.total = transactionsDetail.transactions.reduce(sumQty, 0);
        transactionsDetail.transactions = transactionsDetail.transactions.map(insertEmpId(empId));
    }

    return transactionsDetail;
};

exports.save = evalSave;
exports.sumQty = sumQty;
exports.insertEmpId = insertEmpId;
exports.evalQuery = evalQuery;
