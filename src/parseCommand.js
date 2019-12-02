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
    const empId = userInputs.includes("--empId") ? +userInputs[userInputs.lastIndexOf("--empId") + 1] : undefined;
    const date = userInputs.includes("--date") ? userInputs[userInputs.lastIndexOf("--date") + 1] : undefined;
    const beverage = userInputs.includes("--beverage")
        ? userInputs[userInputs.lastIndexOf("--beverage") + 1]
        : undefined;

    const queryCmd = {
        command: "query",
        isValid: true,
        value: { empId, date, beverage }
    };
    //queryCmd.isValid = queryCmd.isValid && queryOptions.includes(userInputs[0]);
    return queryCmd;
};

/*
const isOptionValid = function(option) {
    const options = ["--beverge", "--qty", "--empId", "--date"];
    return option.includes(option);
};

const isEmpIdValid = function(empId) {
    return Number.isInteger(empId) && empId > 0;
};

const isBeverageValid = function(beverage) {
    return true;
};

const isQtyValid = function(qty) {
    return qty > 0;
};

const isDateValid = function(date) {
    SON.stringify(new Date(date)).slice(1, 11) == date;
};
*/
const parseCommand = function(userInputs, env, date) {
    /*
    const commands = ["--save", "--query"];
    const isOptionValueVAlid = {
        "--empId": isEmpIdValid,
        "--beverage": isBeverageValid,
        "--qty": isQtyValid,
        "--date": isDateValid
    };
    */
    const command = userInputs[0].slice(2);
    /*
    const userOptions = userInputs.slice(1);

    const commandDetails = {
        command: command,
        isValid: commands.includes(command),
        value: {}
    };

    for (let index = 0; index < userOptions.length; index += 2) {
        const option = userOptions[index];
        const optionValue = userOptions[index + 1];

        commandDetails.isValid = commandDetails.isValid && isOptionValid(option);
        commandDetails.isValid = commandDetails.isValid && isOptionValueVAlid[option](optionValue);

        commandDetails.value[option.slice(2)] = optionValue;
    }
    */
    const parseCmd = {
        save: parseSaveCmd,
        query: parseQueryCmd
    };

    const dateToAdd = env.now === undefined ? date : env.now;
    return parseCmd[command](userInputs.slice(1), dateToAdd);
};

exports.parseCommand = parseCommand;
