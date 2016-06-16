import ItemDAO = require("../entity/item");
import {IItem, IItemModel} from "../entity/item-model";
export class GetItem {
    private itemDao: any;
    constructor(private _id?: any) {
        this.itemDao = new ItemDAO();
    }
    execute(callback: (err: any, item?: IItemModel) => void) {
        this.itemDao.findOne(this._id, callback);
    }
}