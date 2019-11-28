const parseCommand = require("./parseCommand").parseCommand;
const evalCommand = require("./evalCommand");
const getMessage = require("./getMessage.js");
const utils = require("./utils");

const getMessageAndPerformCommand = function(userInputs, requiredProperties) {
    const date = requiredProperties.date();
    const commandDetails = parseCommand(userInputs, date);

    if (!commandDetails.isValid) {
        return "Invalid Command or Options";
    }

    const doesExist = requiredProperties.doesExist;
    const reader = requiredProperties.reader;
    const filePath = requiredProperties.filePath;
    const encodingType = requiredProperties.encodingType;

    let transactionsRecord = utils.readRecord(doesExist, filePath, reader, encodingType);
    transactionsRecord = JSON.parse(transactionsRecord);
    transactionsRecord = transactionsRecord.map(utils.parseToDateObj);

    if (commandDetails.command === "save") {
        const transaction = commandDetails.value;
        let updatedTransactionsRecord = evalCommand.save(transactionsRecord, transaction);
        updatedTransactionsRecord = JSON.stringify(updatedTransactionsRecord);

        const writer = requiredProperties.writer;
        utils.writeRecord(writer, filePath, updatedTransactionsRecord, encodingType);

        return getMessage.save(transaction);
    }

    const queriedTransactionsDetail = commandDetails.value;
    const queriedTransactions = evalCommand.query(transactionsRecord, queriedTransactionsDetail);

    return getMessage.query(queriedTransactions);
};

exports.getMessageAndPerformCommand = getMessageAndPerformCommand;
