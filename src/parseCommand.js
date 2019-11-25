/*
const parseSaveCmd = function(userInputs) {
    const saveOptions = ['--beverage','--empId','--qty']
    const saveCmd = {
        command: "save",
        isValid: userInputs.length == 6,
        value: {
            empId: userInputs[3],
            beverage: userInputs[1],
            qty: userInputs[5]
        }
    };
    saveCmd.isValid = saveCmd.isValid && 
    return saveCmd;
};

const parseQueryCmd = function(userInputs) {
    const queryOptions = ["--empId"];
    const queryCmd = {
        command: "query",
        isValid: userInputs.length == 2,
        value: {
            empId: userInputs[1]
        }
    };
    queryCmd.isValid = queryCmd.isValid && queryOptions.includes(userInputs[0]);
    return queryCmd;
};

const parseCommand = function(userInputs) {
    const commands = ["--save", "--query"];
    const command = userInputs[0].slice(2);
    const parseCmd = {
        save: parseSaveCmd,
        query: parseQueryCmd
    };

    const parseCmd = {
        command: command,
        isValid: commands.includes(command),
        value: {}
    }

    return parseCmd.isValid && parseCmd[command](userInputs.slice(1));
};
*/
