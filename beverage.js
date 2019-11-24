const beverage = function() {
    console.log("Anna Juice Ltd");
    console.log(getPrintableString(process.arg.slice(2)));
};

beverage();
