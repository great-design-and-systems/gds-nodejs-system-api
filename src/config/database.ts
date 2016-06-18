import mongoose = require("mongoose");

export function Database() {
    mongoose.connect("mongodb://gds-systems:gds-systems@ds025973.mlab.com:25973/gds-system");
}