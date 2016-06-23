import ItemDAO = require("../entity/item");
import {GetItemByID} from "./get-item-by-id";
import {IItem} from "../entity/item-model";
export class AddItemQuantityByID {
    constructor(private itemId: any, private qty: number) { };
    execute(callback: (err: any, result?: any) => void) {
        this.getItem(this.itemId, (err, resultItem) => {
            if (err) {
                callback(err);
            } else {
                this.addItemQty(resultItem, callback);
            }
        });
    }
    private getItem(itemId: any, callback: (err: any, result?: any) => void) {
        new GetItemByID(itemId).execute(callback);
    }
    private addItemQty(item: IItem, callback: (err: any, result?: any) => void) {
        item.quantity += this.qty;
        ItemDAO.update({ _id: this.itemId }, item, callback);
    }
}