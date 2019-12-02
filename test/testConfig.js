const chai = require("chai");
const assert = chai.assert;

const { getStorePath } = require("../src/config");

describe("getStorePath", function() {
    it("should return env path if env is not undefined", function() {
        const env = { beverageRecordStorePath: "./data/dummyBeverageRecord.json" };

        assert.deepStrictEqual(getStorePath(env), "./data/dummyBeverageRecord.json");
    });

    it("should return default path env is undefined", function() {
        const env = {};
        assert.deepStrictEqual(getStorePath(env), "./data/beverageRecord.json");
    });
});
