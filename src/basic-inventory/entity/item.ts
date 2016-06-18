import mongoose = require("mongoose");
import {IItemModel} from "./item-model";

let ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    description: {
        type: String
    },
    amount: {
        type: Number,
        required: [true, "Amount is required."]
    },
    quantity: {
        type: Number
    },
    lastShipment: {
        type: Date, default: Date.now
    },
    nextShipment: {
        type: Date
    }
});

export = mongoose.model<IItemModel>("item", ItemSchema);