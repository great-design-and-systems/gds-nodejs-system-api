import ItemDAO = require("../entity/item");
import {GetItemByID} from "./get-item-by-id";
import {IItem} from "../entity/item-model";
export class UpdateItemByID {
    constructor(private id: any, private item: any) { };
    execute(callback: (err: any, result?: any) => void) {
        ItemDAO.update({ _id: this.id }, this.item, callback);
    }
}