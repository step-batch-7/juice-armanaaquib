const fs = require("fs");

const { getMessageAndPerformCommand } = require("./src/getMessageAndPerformCommand");
const { getStorePath, getDate } = require("./src/config");

const beverage = function() {
    const requiredProperties = {
        doesExist: fs.existsSync,
        reader: fs.readFileSync,
        writer: fs.writeFileSync,
        date: getDate(process.env),
        storePath: getStorePath(process.env),
        encodingType: "utf-8"
    };

    console.log(getMessageAndPerformCommand(process.argv.slice(2), requiredProperties));
};

beverage();
