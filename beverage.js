const fs = require("fs");

const getMessageAndPerformCommand = require("./src/getMessageAndPerformCommand").getMessageAndPerformCommand;

const beverage = function() {
    console.log("Anna Juice Ltd");
    const requiredProperties = {
        doesExist: fs.existsSync,
        reader: fs.readFileSync,
        writer: fs.writeFileSync,
        env: process.env,
        date: () => new Date(),
        filePath: "./beverageRecord.json",
        encodingType: "utf-8"
    };

    console.log(getMessageAndPerformCommand(process.argv.slice(2), requiredProperties));
};

beverage();
