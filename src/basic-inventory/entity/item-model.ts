import mongoose = require("mongoose");

export interface IItem {
    name: String;
    description: String;
    amount: number;
    quantity: number;
    lastShipment: Date;
    nextShipment: Date;
}
export interface IItemModel extends IItem,  mongoose.Document { }
