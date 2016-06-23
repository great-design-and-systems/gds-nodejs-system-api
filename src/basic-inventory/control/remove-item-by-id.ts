import ItemDAO = require("../entity/item");
export class RemoveItemByID {
    constructor(private itemID?: any) { }
    execute(callback: (err: any, item?: any) => void) {
        if (this.itemID) {
            ItemDAO.findOneAndRemove({ _id: this.itemID }, callback);
        }
    }
}