import ItemDAO = require("../entity/item");
import {IItem, IItemModel} from "../entity/item-model";
export class GetItems {
    private itemDao: any;
    constructor(private item?: any) { }
    execute(callback: (err: any, item?: IItemModel) => void) {
        ItemDAO.find(this.item, callback);
    }
}