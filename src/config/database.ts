import mongoose = require("mongoose");

export function Database() {
    mongoose.connect(process.env.DATABASE_URL);
}