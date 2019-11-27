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

describe("Testing isQueried", function() {
    it("should return true if empId is same", function() {
        const transaction = { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" };
        assert.deepStrictEqual(evalCommand.isQueried(25275, undefined)(transaction), true);
    });

    it("should return false if empId is not same", function() {
        const transaction = { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" };
        assert.deepStrictEqual(evalCommand.isQueried(25276, undefined)(transaction), false);
    });

    it("should return true if date is same", function() {
        const transaction = { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" };
        assert.deepStrictEqual(evalCommand.isQueried(undefined, "2019-11-25")(transaction), true);
    });

    it("should return false if date is not same", function() {
        const transaction = { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" };
        assert.deepStrictEqual(evalCommand.isQueried(undefined, "2019-11-26")(transaction), false);
    });

    it("should return true if date and empId both are matched", function() {
        const transaction = { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" };
        assert.deepStrictEqual(evalCommand.isQueried(25275, "2019-11-25")(transaction), true);
    });

    it("should return false if date and empId both are not matched", function() {
        const transaction = { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" };
        assert.deepStrictEqual(evalCommand.isQueried(25276, "2019-13-25")(transaction), false);
    });

    it("should return false if only date is not matched", function() {
        const transaction = { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" };
        assert.deepStrictEqual(evalCommand.isQueried(25275, "2019-13-25")(transaction), false);
    });

    it("should return false if only empId is not matched", function() {
        const transaction = { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" };
        assert.deepStrictEqual(evalCommand.isQueried(25276, "2019-11-25")(transaction), false);
    });
});

describe("Testing evalQuery", function() {
    it("should give empty for empty record", function() {
        assert.deepStrictEqual(evalCommand.query([], { empId: 25275 }), []);
    });

    it("should give 0 transaction if empId is not matched", function() {
        const transactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];
        const expectedValue = [];
        assert.deepStrictEqual(evalCommand.query(transactionRecords, { empId: 25276 }), expectedValue);
    });

    it("should give one transaction for one record", function() {
        const transactionRecords = [{ empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }];

        const expectedValue = [{ empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }];
        assert.deepStrictEqual(evalCommand.query(transactionRecords, { empId: 25275 }), expectedValue);
    });

    it("should give morte than one transactions if empId is matched", function() {
        const transactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];

        const expectedValue = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }
        ];
        assert.deepStrictEqual(evalCommand.query(transactionRecords, { empId: 25275 }), expectedValue);
    });

    it("should give empty if date is not matched", function() {
        const transactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];
        const expectedValue = [];
        assert.deepStrictEqual(evalCommand.query(transactionRecords, { date: "2019-11-20" }), expectedValue);
    });

    it("should give one transaction for one record if date is matched", function() {
        const transactionRecords = [{ empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }];

        const expectedValue = [{ empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }];
        assert.deepStrictEqual(evalCommand.query(transactionRecords, { date: "2019-11-25" }), expectedValue);
    });

    it("should give morte than one transactions if date is matched", function() {
        const transactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-26T10:40:40.480Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];

        const expectedValue = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];
        assert.deepStrictEqual(evalCommand.query(transactionRecords, { date: "2019-11-25" }), expectedValue);
    });

    it("should give empty if date and empId both are not matched", function() {
        const transactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];
        const expectedValue = [];
        assert.deepStrictEqual(
            evalCommand.query(transactionRecords, { empId: 25200, date: "2019-11-20" }),
            expectedValue
        );
    });

    it("should give empty if only date is not matched", function() {
        const transactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];
        const expectedValue = [];
        assert.deepStrictEqual(
            evalCommand.query(transactionRecords, { empId: 25275, date: "2019-11-20" }),
            expectedValue
        );
    });

    it("should give empty if only empId is not matched", function() {
        const transactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];
        const expectedValue = [];
        assert.deepStrictEqual(
            evalCommand.query(transactionRecords, { empId: 25311, date: "2019-11-25" }),
            expectedValue
        );
    });

    it("should give one transaction for one record if date and empID both are matched", function() {
        const transactionRecords = [{ empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }];

        const expectedValue = [{ empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" }];
        assert.deepStrictEqual(
            evalCommand.query(transactionRecords, { empId: 25275, date: "2019-11-25" }),
            expectedValue
        );
    });

    it("should give morte than one transactions if date and empId both are matched", function() {
        const transactionRecords = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" },
            { empId: 25346, beverage: "pineapple", qty: 1, date: "2019-11-25T10:54:17.069Z" }
        ];

        const expectedValue = [
            { empId: 25275, beverage: "papaya", qty: 1, date: "2019-11-25T10:35:45.860Z" },
            { empId: 25275, beverage: "watermelon", qty: 2, date: "2019-11-25T10:40:40.480Z" }
        ];
        assert.deepStrictEqual(
            evalCommand.query(transactionRecords, { empId: 25275, date: "2019-11-25" }),
            expectedValue
        );
    });
});
