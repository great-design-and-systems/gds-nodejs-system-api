import ItemDAO = require("../entity/item");
import {IItem, IItemModel} from "../entity/item-model";
export class GetItems {
    private itemDao: any;
    constructor(private item?: any) { }
    execute(callback: (err: any, item?: any) => void) {
        if (this.item) {
            ItemDAO.find(this.item, callback);
        } else {
            ItemDAO.find(callback);
        }
    }
}