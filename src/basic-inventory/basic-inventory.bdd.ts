import chai = require("chai");
import mongoose = require("mongoose");
import { IItem } from "./entity/item-model";
import ItemDAO = require("./entity/item");
import { CreateItem } from "./control/create-item";
const expect = chai.expect;

beforeEach((done) => {
    function clearDB() {
        for (let i in mongoose.connection.collections) {
            mongoose.connection.db.dropCollection(mongoose.connection.collections[i], () => {});
        }
        return done();
    }
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(process.env.DATABASE_TEST_URL, function(err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    }
    else {
        return clearDB();
    }
});

describe("Basic Invenotry BDD", () => {

    describe("GIVEN: I have item information", () => {
        let item: any;
        beforeEach(() => {
            item = {};
            item.name = "item#1";
            item.description = "item#1 - the best item";
            item.amount = 123.22;
            item.quantity = 10;
            item.lastShipment = new Date();
            item.nextShipment = new Date();
        });
        describe("WHEN: saving item", () => {
           let saveResult;
           let errResult;
           beforeEach((done) => {
               new CreateItem(item).execute((err, result) => {
                   console.log("resultresult", result);
                   saveResult = result;
                   errResult = err;
                   done();
               });
           });
           it("THEN: item is persisted", () => { });
        });
    });
});

afterEach((done) => {
    mongoose.disconnect();
    return done();
});