const getMessageAndPerformCommand = require("../src/getMessageAndPerformCommand").getMessageAndPerformCommand;
const assert = require("assert");

describe("Testing getMessageAndPerformCommand", function() {
    it("should give Save Message and update TransactionRecord if file does not exist", function() {
        const userArgs = ["--save", "--beverage", "orange", "--empId", "25275", "--qty", "1"];
        const date = new Date().toJSON();
        const requiredProperties = {
            doesExist: filePath => false,
            reader: (filePath, encodingType) => "[]",
            writer: (filePath, transactionsRecord, encodingType) => {
                const expectedValue = JSON.stringify([{ empId: 25275, beverage: "orange", qty: 1, date }]);
                assert.deepStrictEqual(transactionsRecord, expectedValue);
            },
            date: () => date,
            filePath: "somePath",
            encodingType: "utf-8"
        };

        let expectedMessage = "Transaction Recorded:";
        expectedMessage += "\nEmployee ID,Beverage,Quantity,Date";
        expectedMessage += `\n25275,orange,1,${date}`;

        assert.deepStrictEqual(getMessageAndPerformCommand(userArgs, requiredProperties), expectedMessage);
    });

    it("should give Save Message and update TransactionRecord if file exists", function() {
        const userArgs = ["--save", "--beverage", "orange", "--empId", "25275", "--qty", "1"];
        const date = new Date().toJSON();
        const requiredProperties = {
            doesExist: filePath => true,
            reader: (filePath, encodingType) =>
                '[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":"2019-11-27T05:56:20.097Z" }]',
            writer: (filePath, transactionsRecord, encodingType) => {
                const expectedValue = JSON.stringify([
                    { empId: 25275, beverage: "orange", qty: 1, date: "2019-11-27T05:56:20.097Z" },
                    { empId: 25275, beverage: "orange", qty: 1, date }
                ]);
                assert.deepStrictEqual(transactionsRecord, expectedValue);
            },
            date: () => date,
            filePath: "somePath",
            encodingType: "utf-8"
        };

        let expectedMessage = "Transaction Recorded:";
        expectedMessage += "\nEmployee ID,Beverage,Quantity,Date";
        expectedMessage += `\n25275,orange,1,${date}`;

        assert.deepStrictEqual(getMessageAndPerformCommand(userArgs, requiredProperties), expectedMessage);
    });

    it("should give query Message and if file does not exist", function() {
        const userArgs = ["--query", "--empId", "25275"];
        const requiredProperties = {
            doesExist: filePath => false,
            reader: (filePath, encodingType) => "[]",
            writer: (filePath, transactionsRecord, encodingType) => {},
            date: () => {},
            filePath: "somePath",
            encodingType: "utf-8"
        };

        let expectedMessage = "Employee ID,Beverage,Quantity,Date";
        expectedMessage += "\nTotal: 0 Juices";

        assert.deepStrictEqual(getMessageAndPerformCommand(userArgs, requiredProperties), expectedMessage);
    });

    it("should give query Message and if empId not found", function() {
        const userArgs = ["--query", "--empId", "25276"];
        const requiredProperties = {
            doesExist: filePath => false,
            reader: (filePath, encodingType) =>
                '[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":"2019-11-27T05:56:20.097Z" }]',
            writer: (filePath, transactionsRecord, encodingType) => {},
            date: () => {},
            filePath: "somePath",
            encodingType: "utf-8"
        };

        let expectedMessage = "Employee ID,Beverage,Quantity,Date";
        expectedMessage += "\nTotal: 0 Juices";

        assert.deepStrictEqual(getMessageAndPerformCommand(userArgs, requiredProperties), expectedMessage);
    });

    it("should give query Message and calculate quantity and if empId found", function() {
        const userArgs = ["--query", "--empId", "25275"];
        const requiredProperties = {
            doesExist: filePath => true,
            reader: (filePath, encodingType) =>
                '[{ "empId": 25275, "beverage": "orange", "qty": 1, "date":"2019-11-27T05:56:20.097Z" },{ "empId": 25275, "beverage": "papaya", "qty": 2, "date":"2019-11-27T06:37:33.103Z" },{ "empId": 25276, "beverage": "orange", "qty": 1, "date":"2019-11-27T06:39:01.925Z" }]',
            writer: (filePath, transactionsRecord, encodingType) => {},
            date: () => {},
            filePath: "somePath",
            encodingType: "utf-8"
        };

        let expectedMessage = "Employee ID,Beverage,Quantity,Date";
        expectedMessage += "\n25275,orange,1,2019-11-27T05:56:20.097Z";
        expectedMessage += "\n25275,papaya,2,2019-11-27T06:37:33.103Z";
        expectedMessage += "\nTotal: 3 Juices";

        assert.deepStrictEqual(getMessageAndPerformCommand(userArgs, requiredProperties), expectedMessage);
    });
});
