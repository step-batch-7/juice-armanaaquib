const chai = require("chai");
const assert = chai.assert;

const getMessage = require("../src/getMessage");
const { getTransactionMessage } = require("../src/getMessage");

describe("getTransactionMessage", function() {
    it("should give transaction message", function() {
        const transaction = {
            empId: 25275,
            beverage: "papaya",
            qty: 1,
            date: new Date("2019-11-23T11:45:42.498Z")
        };

        const expectedMessage = "25275,papaya,1,2019-11-23T11:45:42.498Z";

        assert.deepStrictEqual(getTransactionMessage(transaction), expectedMessage);
    });
});

describe("Testing saveMessage", function() {
    it("should give save whole message", function() {
        const transaction = {
            empId: 25275,
            beverage: "papaya",
            qty: 2,
            date: new Date("2019-11-23T11:45:42.498Z")
        };
        let expectedMessage = "Transaction Recorded:";
        expectedMessage += "\nEmployee ID,Beverage,Quantity,Date";
        expectedMessage += "\n25275,papaya,2,2019-11-23T11:45:42.498Z";
        assert.deepStrictEqual(getMessage["save"](transaction), expectedMessage);
    });
});

describe("Testing addQty", function() {
    it("should add passed transaction qty with previous qty", function() {
        const transaction = {
            beverage: "apple",
            qty: 2,
            date: new Date("2019-11-26T05:17:32.843Z")
        };
        assert.deepStrictEqual(getMessage.addQty(1, transaction), 3);
    });
});

describe("Testing queryMessage", function() {
    it("should give message for zero transactions", function() {
        const transactions = [];
        let expectedMessage = "Employee ID,Beverage,Quantity,Date";
        expectedMessage += "\nTotal: 0 Juice";

        assert.deepStrictEqual(getMessage["query"](transactions), expectedMessage);
    });

    it("should give message for one transactions", function() {
        const transactions = [{ empId: 25275, beverage: "papaya", qty: 1, date: new Date("2019-11-23T11:45:42.498Z") }];

        let expectedMessage = "Employee ID,Beverage,Quantity,Date";
        expectedMessage += "\n25275,papaya,1,2019-11-23T11:45:42.498Z";
        expectedMessage += "\nTotal: 1 Juice";

        assert.deepStrictEqual(getMessage["query"](transactions), expectedMessage);
    });

    it("should give message for more than one transactions", function() {
        const transactions = [
            { empId: 25275, beverage: "Papaya", qty: 2, date: new Date("2019-11-23T11:45:42.498Z") },
            { empId: 25275, beverage: "Watermelon", qty: 1, date: new Date("2019-11-24T16:08:58.736Z") }
        ];

        let expectedMessage = "Employee ID,Beverage,Quantity,Date";
        expectedMessage += "\n25275,Papaya,2,2019-11-23T11:45:42.498Z";
        expectedMessage += "\n25275,Watermelon,1,2019-11-24T16:08:58.736Z";
        expectedMessage += "\nTotal: 3 Juices";

        assert.deepStrictEqual(getMessage["query"](transactions), expectedMessage);
    });
});
