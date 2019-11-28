const utils = require("../src/utils");
const chai = require("chai");
const assert = chai.assert;

describe("Testing readRecord", function() {
    it("should right file path passed to isExist", function() {
        const doesExist = function(path) {
            assert.strictEqual(path, "./correctFile");
            return false;
        };
        assert.deepStrictEqual(
            utils.readRecord(doesExist, "./correctFile", () => "reader", "utf-8"),
            "[]"
        );
    });

    it("should return empty object if file not availabe", function() {
        const doesExist = function(path) {
            return false;
        };
        assert.deepStrictEqual(
            utils.readRecord(doesExist, "./correctFile", () => "reader", "utf-8"),
            "[]"
        );
    });

    it("should actual reader called once with right path and encoding if file available", function() {
        let calledTimes = 0;
        const reader = function(path, encoding) {
            assert.strictEqual(path, "./correctFile");
            assert.strictEqual(encoding, "utf-8");
            calledTimes += 1;
            return "reader return string";
        };
        const doesExist = function(path) {
            return true;
        };
        const expectedString = "reader return string";
        assert.deepStrictEqual(utils.readRecord(doesExist, "./correctFile", reader, "utf-8"), expectedString);
        assert.strictEqual(calledTimes, 1);
    });
});

describe("Testing writeRecord", function() {
    it("should actual writer called once with right path, record and encoding", function() {
        let calledTimes = 0;
        const writer = function(path, record, encoding) {
            assert.strictEqual(path, "./correctFile");
            assert.strictEqual(record, "records");
            assert.strictEqual(encoding, "utf-8");
            calledTimes += 1;
        };
        assert.deepStrictEqual(utils.writeRecord(writer, "./correctFile", "records", "utf-8"), undefined);
        assert.strictEqual(calledTimes, 1);
    });
});

describe("Testing parseToDataObj", function() {
    it("should convert date to obj", function() {
        const date = "2019-11-28T05:59:10.881Z";
        const transaction = {
            empId: 25275,
            beverage: "orange",
            qty: 1,
            date
        };

        const expectedDate = new Date(date);
        const expectedTransaction = {
            empId: 25275,
            beverage: "orange",
            qty: 1,
            date: expectedDate
        };

        assert.deepStrictEqual(utils.parseToDateObj(transaction), expectedTransaction);
    });
});
