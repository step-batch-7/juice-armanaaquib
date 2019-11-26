const evalCommand = require("../src/evalCommand");
const assert = require("assert");

describe("Testing evalSave", function() {
    it("should update empty record", function() {
        const transactionDetail = {
            empId: "25275",
            beverage: "watermelon",
            qty: 2
        };
        const date = "2019-11-25T10:40:40.480Z";
        const actualTransactionRecord = evalCommand.save({}, transactionDetail, date);

        const exptectedTransactionRecords = {
            "25275": {
                empId: "25275",
                transactions: [{ beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }]
            }
        };

        assert.deepStrictEqual(actualTransactionRecord, exptectedTransactionRecords, date);
    });

    it("should update already available empId", function() {
        const transactionRecords = {
            "25275": {
                empId: "25275",
                transactions: [{ beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }]
            }
        };
        const transactionDetail = {
            empId: "25275",
            beverage: "watermelon",
            qty: 2
        };
        const date = "2019-11-25T10:40:40.480Z";
        const actualTransactionRecord = evalCommand.save(transactionRecords, transactionDetail, date);

        const exptectedTransactionRecords = {
            "25275": {
                empId: "25275",
                transactions: [
                    { beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
                    { beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }
                ]
            }
        };

        assert.deepStrictEqual(actualTransactionRecord, exptectedTransactionRecords);
    });

    it("should add new empId", function() {
        const transactionRecords = {
            "25275": {
                empId: "25275",
                transactions: [
                    { beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
                    { beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }
                ]
            }
        };
        const transactionDetail = {
            empId: "25346",
            beverage: "pineapple",
            qty: 1,
            date: "2019-11-25T10:54:17.069Z"
        };
        const date = "2019-11-25T10:54:17.069Z";
        const actualTransactionRecord = evalCommand.save(transactionRecords, transactionDetail, date);

        const exptectedTransactionRecords = {
            "25275": {
                empId: "25275",
                transactions: [
                    { beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
                    { beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }
                ]
            },
            "25346": {
                empId: "25346",
                transactions: [{ beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }]
            }
        };
        assert.deepStrictEqual(actualTransactionRecord, exptectedTransactionRecords);
    });
});

describe("Testing sumQty", function() {
    it("should add passed transaction qty with previous qty", function() {
        const transaction = {
            beverage: "apple",
            qty: 2,
            date: "2019-11-26T05:17:32.843Z"
        };
        assert.deepStrictEqual(evalCommand.sumQty(1, transaction), 3);
    });
});

describe("Testing insertEmpId", function() {
    it("should add empId to transaction", function() {
        const transaction = {
            beverage: "apple",
            qty: 2,
            date: "2019-11-26T05:17:32.843Z"
        };

        const expectedValue = {
            empId: "25275",
            beverage: "apple",
            qty: 2,
            date: "2019-11-26T05:17:32.843Z"
        };
        assert.deepStrictEqual(evalCommand.insertEmpId("25275")(transaction), expectedValue);
    });
});

describe("Testing evalQuery", function() {
    it("should give empty for empty record", function() {
        const expectedValue = {
            total: 0,
            transactions: []
        };
        assert.deepStrictEqual(evalCommand.evalQuery({}, { empId: "25275" }), expectedValue);
    });

    it("should give one transaction for one record", function() {
        const transactionRecords = {
            "25275": {
                empId: "25275",
                transactions: [{ beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }]
            }
        };

        const expectedValue = {
            total: 1,
            transactions: [{ empId: "25275", beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }]
        };
        assert.deepStrictEqual(evalCommand.evalQuery(transactionRecords, { empId: "25275" }), expectedValue);
    });

    it("should give more than one transaction for more than one record", function() {
        const transactionRecords = {
            "25275": {
                empId: "25275",
                transactions: [
                    { beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
                    { beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }
                ]
            },
            "25346": {
                empId: "25346",
                transactions: [{ beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }]
            }
        };

        const expectedValue = {
            total: 3,
            transactions: [
                { empId: "25275", beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
                { empId: "25275", beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }
            ]
        };
        assert.deepStrictEqual(evalCommand.evalQuery(transactionRecords, { empId: "25275" }), expectedValue);
    });
});
