import chai = require("chai");
import mongoose = require("mongoose");
import ItemDAO = require("./entity/item");
import {CreateItem} from "./control/create-item";
import {GetItemByID} from "./control/get-item-by-id";
import {GetItems} from "./control/get-items";
import {RemoveItemByID} from "./control/remove-item-by-id";
import {AddItemQuantityByID} from "./control/add-item-quantity-by-id";
import {UpdateItemByID} from "./control/update-item-by-id";
const expect = chai.expect;
const DATABASE_TEST_URL = "mongodb://gds-systems:gds-systems@ds015194.mlab.com:15194/gds-system-test";
beforeEach((done) => {
    function clearDB() {
        for (let i in mongoose.connection.collections) {
            if (mongoose.connection.collections[i] && mongoose.connection.collections[i].drop) {
                mongoose.connection.collections[i].drop(function (err) {
                    console.log("collection dropped");
                });
            }
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
    let item: any;
    describe("GIVEN: I have item information", () => {
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
                    done();
                });
            });
            it("THEN: item is persisted", () => {
                expect(!!saveResult._id).to.be.true;
            });
        });
    });
    describe("GIVEN: I have item id", () => {
        let savedresult;
        beforeEach(done => {
            new CreateItem(item).execute((err, result) => {
                savedresult = result;
                done();
            });
        });
        describe("WHEN: retrieving an item with _id", () => {
            let retrievalResult;
            beforeEach((done) => {
                new GetItemByID(savedresult._id).execute((err, result) => {
                    retrievalResult = result;
                    done();
                });
            });
            it("THEN: item is retreived", () => {
                expect(!!retrievalResult._id).to.be.true;
            });
        });
        describe("WHEN: removing an item with _id", () => {
            let retrievalResult;
            beforeEach((done) => {
                new RemoveItemByID(savedresult._id).execute((deleteErr, result) => {
                    if (!deleteErr) { retrievalResult = result; }
                    done();
                });
            });
            it("THEN: item is removed", (done) => {
                expect(!!retrievalResult._id).to.be.true;
                new GetItemByID(retrievalResult._id).execute((err, result) => {
                    expect(result == null).to.be.true;
                    done();
                });
            });
        });
        describe("WHEN: updating", () => {
            let retrievalResults;
            beforeEach((done) => {
                savedresult.name = "gello";
                new UpdateItemByID(savedresult._id, savedresult).execute((updateErr, update) => {
                    new GetItemByID(savedresult._id).execute((err, result) => {
                        retrievalResults = result;
                        done();
                    });
                });
            });
            it("THEN: item is updated", () => {
                expect(!!retrievalResults).to.be.true;
                expect(retrievalResults.name === "gello").to.be.true;
            });
        });
        describe("WHEN: adding quantity", () => {
            let retrievalResults;
            beforeEach((done) => {
                new AddItemQuantityByID(savedresult._id, 2).execute((updateErr, update) => {
                    new GetItemByID(savedresult._id).execute((err, result) => {
                        retrievalResults = result;
                        done();
                    });
                });
            });
            it("THEN: item quantity is added", () => {
                expect(!!retrievalResults).to.be.true;
                expect(retrievalResults.quantity === 12).to.be.true;
            });
        });
    });
    describe("GIVEN: I have items", () => {
        describe("WHEN: retrieving all items", () => {
            let retrievalResults;
            beforeEach((done) => {
                new CreateItem(item).execute((err, savedresult) => {
                    new GetItems().execute((err, result) => {
                        retrievalResults = result;
                        done();
                    });
                });
            });
            it("THEN: items are retreived", () => {
                expect(!!retrievalResults.length).to.be.true;
            });
        });
    });
});

afterEach((done) => {
    mongoose.disconnect();
    return done();
});