const addQty = function(qty, transactionDetail) {
    return qty + transactionDetail.qty;
};

const getTransactionMessage = function(transaction) {
    transactionMessage = `${transaction.empId},${transaction.beverage},`;
    transactionMessage += `${transaction.qty},${transaction.date.toJSON()}`;
    return transactionMessage;
};

const saveMessage = function(transaction) {
    let headerMessage = "Transaction Recorded:";
    headerMessage += "\nEmployee ID,Beverage,Quantity,Date";
    return `${headerMessage}\n${getTransactionMessage(transaction)}`;
};

const queryMessage = function(transactions) {
    const headerMessage = "Employee ID,Beverage,Quantity,Date";
    const transactionMessages = transactions.map(getTransactionMessage);

    const totalQty = transactions.reduce(addQty, 0);
    const juiceSuffix = totalQty > 1 ? "Juices" : "Juice";
    const footerMessage = `Total: ${totalQty} ${juiceSuffix}`;

    return [headerMessage, ...transactionMessages, footerMessage].join("\n");
};

exports.getTransactionMessage = getTransactionMessage;
exports.save = saveMessage;
exports.addQty = addQty;
exports.query = queryMessage;
