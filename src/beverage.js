const parseCommand = require("./parseCommand").parseCommand;
const evalCommand = require("./evalCommand");
const getMessage = require("./getMessage.js");
const utils = require("./utils");
const fs = require("fs");

const getPrintableString = function(userInputs) {
    const commandDetails = parseCommand(userInputs);
    const transactionRecord = JSON.parse(
        utils.readRecord(fs.existsSync, "./beverageRecord.json", fs.readFileSync, "utf-8")
    );

    if (commandDetails.command === "save") {
        const updatedTransactionRecord = evalCommand.save(transactionRecord, commandDetails.value, new Date().toJSON());
        utils.writeRecord(fs.writeFileSync, "./beverageRecord.json", JSON.stringify(updatedTransactionRecord), "utf-8");
        return getMessage.save(commandDetails.value, new Date().toJSON());
    }

    const matchedTransactions = evalCommand.evalQuery(transactionRecord, commandDetails.value);
    return getMessage.query(matchedTransactions);
};

exports.getPrintableString = getPrintableString;
