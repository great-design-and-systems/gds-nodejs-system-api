import ItemDAO = require("../entity/item");
import { IItem } from "../entity/item-model";
export class CreateItem {
    constructor(private item: IItem) {}
    execute(callback: (err: any, item?: any) => void) {
        new ItemDAO(this.item).save((err, result) => {
            if (err) {
                callback(err);
            }
            else {
                callback(err, result);
            }
        });
    }
}