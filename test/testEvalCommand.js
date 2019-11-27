const evalCommand = require("../src/evalCommand");
const assert = require("assert");

describe("Testing evalSave", function() {
    it("should update empty record", function() {
        const transaction = {
            empId: 25275,
            beverage: "watermelon",
            qty: 2,
            date: "2019-11-25T10:40:40.480Z"
        };
        const actualTransactionRecord = evalCommand.save([], transaction);

        const exptectedTransactionRecords = [
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }
        ];

        assert.deepStrictEqual(actualTransactionRecord, exptectedTransactionRecords);
    });

    it("should update already available empId", function() {
        const transactionRecords = [{ empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }];
        const transaction = {
            empId: 25275,
            beverage: "watermelon",
            qty: 2,
            date: "2019-11-25T10:40:40.480Z"
        };
        const actualTransactionRecord = evalCommand.save(transactionRecords, transaction);

        const exptectedTransactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }
        ];

        assert.deepStrictEqual(actualTransactionRecord, exptectedTransactionRecords);
    });

    it("should add new empId", function() {
        const transactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }
        ];
        const transaction = {
            empId: 25346,
            beverage: "pineapple",
            qty: 1,
            date: "2019-11-25T10:54:17.069Z"
        };
        const actualTransactionRecord = evalCommand.save(transactionRecords, transaction);

        const exptectedTransactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];
        assert.deepStrictEqual(actualTransactionRecord, exptectedTransactionRecords);
    });
});

describe("Testing isQueriedEmpId", function() {
    it("should return true if empId is same", function() {
        const transaction = { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" };
        assert.deepStrictEqual(evalCommand.isQueriedEmpId(25275)(transaction), true);
    });

    it("should return false if empId is not same", function() {
        const transaction = { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" };
        assert.deepStrictEqual(evalCommand.isQueriedEmpId(25276)(transaction), false);
    });
});

describe("Testing evalQuery", function() {
    it("should give empty for empty record", function() {
        assert.deepStrictEqual(evalCommand.query([], { empId: 25275 }), []);
    });

    it("should give one transaction for one record", function() {
        const transactionRecords = [{ empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }];

        const expectedValue = [{ empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }];
        assert.deepStrictEqual(evalCommand.query(transactionRecords, { empId: 25275 }), expectedValue);
    });

    it("should give 0 transaction if empId is not available", function() {
        const transactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];
        const expectedValue = [];
        assert.deepStrictEqual(evalCommand.query(transactionRecords, { empId: 25276 }), expectedValue);
    });
});
