import ItemDAO = require("../entity/item");
import {IItem, IItemModel} from "../entity/item-model";
export class GetItemByID {
    private itemDao: any;
    constructor(private _id: any) { }
    execute(callback: (err: any, item?: IItemModel) => void) {
        ItemDAO.findOne(this._id, callback);
    }
}