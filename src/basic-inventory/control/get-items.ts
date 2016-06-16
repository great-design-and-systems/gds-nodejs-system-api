import ItemDAO = require("../entity/item");
import {IItem, IItemModel} from "../entity/item-model";
export class GetItems {
    private itemDao: any;
    constructor(private cond?: any) {
        this.itemDao = new ItemDAO();
    }
    execute(callback: (err: any, item?: IItemModel) => void) {
        this.itemDao.find(this.cond, callback);
    }
}