const getPrintableString = require("./src/beverage").getPrintableString;
const beverage = function() {
    console.log("Anna Juice Ltd");
    console.log(getPrintableString(process.argv.slice(2)));
};

beverage();
