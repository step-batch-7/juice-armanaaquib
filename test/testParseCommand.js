const assert = require("assert");
const parseCommand = require("../src/parseCommand").parseCommand;

describe("Testing parseCommand", function() {
    it("should give parse command for save", function() {
        const userArgs = ["--save", "--beverage", "orange", "--empId", "25275", "--qty", "1"];
        const date = new Date().toJSON();

        const expectedValue = {
            command: "save",
            isValid: true,
            value: { empId: 25275, beverage: "orange", qty: 1, date }
        };
        assert.deepStrictEqual(parseCommand(userArgs, date), expectedValue);
    });

    it("should give parse command for empId query", function() {
        const userArgs = ["--query", "--empId", "25275"];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: { empId: 25275, date: undefined }
        };
        assert.deepStrictEqual(parseCommand(userArgs), expectedValue);
    });

    it("should give parse command for date query", function() {
        const userArgs = ["--query", "--date", "2019-11-20"];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: { empId: undefined, date: "2019-11-20" }
        };
        assert.deepStrictEqual(parseCommand(userArgs), expectedValue);
    });

    it("should give parse command for date and empId query", function() {
        const userArgs = ["--query", "--empId", 25275, "--date", "2019-11-20"];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: { empId: 25275, date: "2019-11-20" }
        };
        assert.deepStrictEqual(parseCommand(userArgs), expectedValue);
    });
});
