const assert = require("assert");
const parseCommand = require("../src/parseCommand").parseCommand;

describe("Testing parseCommand", function() {
    it("should give parse command for save with current date if env.now is undefined", function() {
        const userArgs = ["--save", "--beverage", "orange", "--empId", "25275", "--qty", "1"];
        const date = new Date();

        const expectedValue = {
            command: "save",
            isValid: true,
            value: { empId: 25275, beverage: "orange", qty: 1, date }
        };

        const env = {};
        assert.deepStrictEqual(parseCommand(userArgs, env, date), expectedValue);
    });

    it("should give parse command for save with now date if env.now is not undefined", function() {
        const userArgs = ["--save", "--beverage", "orange", "--empId", "25275", "--qty", "1"];
        const env = { now: "2019-12-02T00:00:00.000Z" };
        const date = new Date();

        const expectedValue = {
            command: "save",
            isValid: true,
            value: { empId: 25275, beverage: "orange", qty: 1, date: "2019-12-02T00:00:00.000Z" }
        };

        assert.deepStrictEqual(parseCommand(userArgs, env, date), expectedValue);
    });

    it("should give parse command for empId query", function() {
        const userArgs = ["--query", "--empId", "25275"];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: { empId: 25275, date: undefined, beverage: undefined }
        };
        const env = {};
        assert.deepStrictEqual(parseCommand(userArgs, env), expectedValue);
    });

    it("should give parse command for date query", function() {
        const userArgs = ["--query", "--date", "2019-11-20"];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: { empId: undefined, date: "2019-11-20", beverage: undefined }
        };

        const env = {};
        assert.deepStrictEqual(parseCommand(userArgs, env), expectedValue);
    });

    it("should give parse command for date and empId query", function() {
        const userArgs = ["--query", "--empId", 25275, "--date", "2019-11-20"];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: { empId: 25275, date: "2019-11-20", beverage: undefined }
        };
        const env = {};
        assert.deepStrictEqual(parseCommand(userArgs, env), expectedValue);
    });

    it("should give parse command for beverage query", function() {
        const userArgs = ["--query", "--beverage", "orange"];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: { empId: undefined, date: undefined, beverage: "orange" }
        };
        const env = {};
        assert.deepStrictEqual(parseCommand(userArgs, env), expectedValue);
    });

    it("should give parse command for beverage and empId query", function() {
        const userArgs = ["--query", "--empId", 25275, "--beverage", "orange"];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: { empId: 25275, date: undefined, beverage: "orange" }
        };
        const env = {};
        assert.deepStrictEqual(parseCommand(userArgs, env), expectedValue);
    });

    it("should give parse command for beverage and date query", function() {
        const userArgs = ["--query", "--date", "2019-11-20", "--beverage", "orange"];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: { empId: undefined, date: "2019-11-20", beverage: "orange" }
        };
        const env = {};
        assert.deepStrictEqual(parseCommand(userArgs, env), expectedValue);
    });

    it("should give parse command for beverage, empId and date query", function() {
        const userArgs = ["--query", "--date", "2019-11-20", "--beverage", "orange", "--empId", 25275];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: { empId: 25275, date: "2019-11-20", beverage: "orange" }
        };
        const env = {};
        assert.deepStrictEqual(parseCommand(userArgs, env), expectedValue);
    });
});
