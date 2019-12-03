const chai = require("chai");
const assert = chai.assert;

const { getStorePath, getDate } = require("../src/config");

describe("getStorePath", function() {
    it("should return env path if env.beverageRecordStorePath is not undefined", function() {
        const env = { beverageRecordStorePath: "./data/dummyBeverageRecord.json" };

        assert.deepStrictEqual(getStorePath(env), "./data/dummyBeverageRecord.json");
    });

    it("should return default path env.beverageRecordStorePath is undefined", function() {
        const env = {};
        assert.deepStrictEqual(getStorePath(env), "./data/beverageRecord.json");
    });
});

describe("getDate", function() {
    it("should return env now if env.now is not undefined", function() {
        const env = { now: "1998-11-01" };
        assert.strictEqual(getDate(env)(), "1998-11-01T00:00:00.000Z");
    });

    it("should return current Date if env.now is undefined", function() {
        const env = {};
        const date = new Date();
        assert.deepStrictEqual(getDate(env)(), date);
    });
});
