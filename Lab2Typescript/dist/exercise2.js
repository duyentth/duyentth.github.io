"use strict";
let bankAccount = {
    money: 2000,
    deposit: function (value) {
        this.money += value;
    }
};
let myself = {
    name: "John",
    bankAccount: bankAccount,
    hobbies: ["Violin", "Cooking"]
};
myself.bankAccount.deposit(3000);
console.log(myself);
