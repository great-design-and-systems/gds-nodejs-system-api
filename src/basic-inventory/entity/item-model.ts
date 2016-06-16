import mongoose = require("mongoose");

export interface IItem {
    name: String;
    description: String;
    amount: Number;
    quantity: Number;
    lastShipment: Date;
    nextShipment: Date;
}
export interface IItemModel extends IItem,  mongoose.Document { }
