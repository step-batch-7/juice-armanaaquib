const parseCommand = require("./parseCommand").parseCommand;
const evalCommand = require("./evalCommand");
const getMessage = require("./getMessage.js");
const utils = require("./utils");

const saveAndGetMessage = function(transactionsRecord, requiredProperties, transaction) {
    let updatedTransactionsRecord = evalCommand.save(transactionsRecord, transaction);
    updatedTransactionsRecord = JSON.stringify(updatedTransactionsRecord);

    const filePath = requiredProperties.filePath;
    const encodingType = requiredProperties.encodingType;
    const writer = requiredProperties.writer;
    utils.writeRecord(writer, filePath, updatedTransactionsRecord, encodingType);

    return getMessage.save(transaction);
};

const queryAndGetMessage = function(transactionsRecord, requiredProperties, queriedTransactionsDetail) {
    const queriedTransactions = evalCommand.query(transactionsRecord, queriedTransactionsDetail);
    return getMessage.query(queriedTransactions);
};

const getMessageAndPerformCommand = function(userInputs, requiredProperties) {
    const date = requiredProperties.date();
    const commandDetails = parseCommand(userInputs, date);

    if (!commandDetails.isValid) {
        return "Invalid Command or Options";
    }

    const commandAndGetMessage = {
        save: saveAndGetMessage,
        query: queryAndGetMessage
    };

    const doesExist = requiredProperties.doesExist;
    const reader = requiredProperties.reader;
    const filePath = requiredProperties.filePath;
    const encodingType = requiredProperties.encodingType;

    let transactionsRecord = utils.readRecord(doesExist, filePath, reader, encodingType);
    transactionsRecord = JSON.parse(transactionsRecord);
    transactionsRecord = transactionsRecord.map(utils.parseToDateObj);

    const command = commandDetails.command;
    return commandAndGetMessage[command](transactionsRecord, requiredProperties, commandDetails.value);
};

exports.getMessageAndPerformCommand = getMessageAndPerformCommand;
