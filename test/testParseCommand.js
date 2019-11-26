const assert = require("assert");
const parseCommand = require("../src/parseCommand").parseCommand;

describe("Testing parseCommand", function() {
    it("should give parse command for save", function() {
        const userArgs = ["--save", "--beverge", "orange", "--empId", "25275", "--qty", "1"];
        const date = new Date().toJSON();

        const expectedValue = {
            command: "save",
            isValid: true,
            value: {
                empId: "25275",
                beverage: "orange",
                qty: 1,
                date
            }
        };
        assert.deepStrictEqual(parseCommand(userArgs, date), expectedValue);
    });

    it("should give parse command for query", function() {
        const userArgs = ["--query", "--empId", "25275"];
        const expectedValue = {
            command: "query",
            isValid: true,
            value: {
                empId: "25275"
            }
        };
        assert.deepStrictEqual(parseCommand(userArgs), expectedValue);
    });
});
