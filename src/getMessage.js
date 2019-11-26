const addQty = function(qty, transactionDetail) {
    return qty + transactionDetail.qty;
};

const addTransactionMessage = function(message, transaction) {
    message += "\n" + transaction.empId + ",";
    message += transaction.beverage + ",";
    message += transaction.qty + ",";
    message += transaction.date;
    return message;
};

const saveMessage = function(transactionDetail) {
    let message = "Transaction Recorded:";
    message += "\nEmployee ID,Beverage,Quantity,Date";
    return addTransactionMessage(message, transactionDetail);
};

const queryMessage = function(transactions) {
    let message = "Employee ID,Beverage,Quantity,Date";
    message = transactions.reduce(addTransactionMessage, message);
    const totalQty = transactions.reduce(addQty, 0);
    return message + "\nTotal: " + totalQty + " Juices";
};

exports.addTransactionMessage = addTransactionMessage;
exports.save = saveMessage;
exports.addQty = addQty;
exports.query = queryMessage;
