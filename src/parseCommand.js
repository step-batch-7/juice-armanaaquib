const parseSaveCmd = function(userInputs, date) {
    //const saveOptions = ['--beverage','--empId','--qty']
    const empId = +userInputs[userInputs.lastIndexOf("--empId") + 1];
    const beverage = userInputs[userInputs.lastIndexOf("--beverage") + 1];
    const qty = +userInputs[userInputs.lastIndexOf("--qty") + 1];
    const saveCmd = {
        command: "save",
        isValid: true,
        value: { empId, beverage, qty, date }
    };
    //saveCmd.isValid = saveCmd.isValid &&
    return saveCmd;
};

const parseQueryCmd = function(userInputs) {
    //const queryOptions = ["--empId"];
    const empId = (userInputs.includes("--empId") && +userInputs[userInputs.lastIndexOf("--empId") + 1]) || undefined;
    const date = (userInputs.includes("--date") && userInputs[userInputs.lastIndexOf("--date") + 1]) || undefined;

    const queryCmd = {
        command: "query",
        isValid: true,
        value: { empId, date }
    };
    //queryCmd.isValid = queryCmd.isValid && queryOptions.includes(userInputs[0]);
    return queryCmd;
};

const parseCommand = function(userInputs, date) {
    //const commands = ["--save", "--query"];
    const command = userInputs[0].slice(2);
    const parseCmd = {
        save: parseSaveCmd,
        query: parseQueryCmd
    };
    /*
    const parseCmd = {
        command: command,
        isValid: commands.includes(command),
        value: {}
    }
    */
    return parseCmd[command](userInputs.slice(1), date);
};

exports.parseCommand = parseCommand;
