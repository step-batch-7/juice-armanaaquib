const utils = require("../src/utils");
const assert = require("assert");

describe("Testing readRecord", function() {
    it("should reader return valid string", function() {
        const reader = function() {
            return "reader return string";
        };
        const isExist = function(path) {
            return true;
        };
        const expectedString = "reader return string";
        assert.deepStrictEqual(utils.readRecord("path", reader, isExist), expectedString);
    });

    it("should return reader return value if file is availabe", function() {
        const isExist = function(path) {
            return path === "path";
        };
        const reader = function(path) {
            return "file exists.";
        };
        assert.deepStrictEqual(utils.readRecord("path", reader, isExist), "file exists.");
    });

    it("should return empty object if file not availabe", function() {
        const isExist = function(path) {
            return path === "otherPath";
        };
        assert.deepStrictEqual(utils.readRecord("path", "reader", isExist), {});
    });

    it("should return true if path is not changed", function() {
        const reader = function(path) {
            return path == "correctPath";
        };
        const isExist = function(path) {
            return true;
        };
        assert.deepStrictEqual(utils.readRecord("correctPath", reader, isExist), true);
    });
});
