import mongoose = require("mongoose");

export interface Item extends mongoose.Document {
    name: String;
    description: String;
    amount: Number;
    quantity: Number;
    lastShipment: Date;
    nextShipment: Date;
}