import chai = require("chai");
import mongoose = require("mongoose");
import { IItem } from "./entity/item-model";
import ItemDAO = require("./entity/item");
import { CreateItem } from "./control/create-item";
import { GetItemByID } from "./control/get-item-by-id";
import { GetItems } from "./control/get-items";
const expect = chai.expect;
const DATABASE_TEST_URL = "mongodb://gds-systems:gds-systems@ds015194.mlab.com:15194/gds-system-test";
beforeEach((done) => {
    function clearDB() {
        for (let i in mongoose.connection.collections) {
            mongoose.connection.db.dropCollection(mongoose.connection.collections[i], () => { });
        }
        return done();
    }
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(DATABASE_TEST_URL, function (err) {
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
    let savedId;
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
                    saveResult = result;
                    errResult = err;
                    savedId = result._id;
                    done();
                });
            });
            it("THEN: item is persisted", () => {
                expect(!!saveResult._id).to.be.true;
            });
        });
    });
    describe("GIVEN: I have item id", () => {
        describe("WHEN: retrieving an item with _id", () => {
            let retrievalResult;
            let errResult;
            beforeEach((done) => {
                new GetItemByID(savedId).execute((err, result) => {
                    errResult = err;
                    retrievalResult = result;
                    done();
                });
            });
            it("THEN: item is retreived", () => {
                expect(!!retrievalResult._id).to.be.true;
            });
        });
    });
    describe("GIVEN: I have items", () => {
        describe("WHEN: retrieving all items", () => {
            let retrievalResults;
            let errResult;
            beforeEach((done) => {
                new GetItemByID({}).execute((err, result) => {
                    errResult = err;
                    retrievalResults = result;
                    done();
                });
            });
            it("THEN: items are retreived", () => {
                expect(retrievalResults.length).to.be.defined;
            });
        });
    });
});

afterEach((done) => {
    mongoose.disconnect();
    return done();
});