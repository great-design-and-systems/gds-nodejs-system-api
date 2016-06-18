import { CreateItem } from "./control/create-item";
import { GetItemByID } from "./control/get-item-by-id";
import { GetItems } from "./control/get-items";
export function BasicInventory(app) {
    app.get("/gds/api/basic-inventory/:id", (req, res) => {
        new GetItemByID(req.param.id).execute((err, result) => {
            if (!err) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Item not found");
            }
        });
    });
    app.get("/gds/api/basic-inventory", (req, res) => {
        new GetItems({}).execute((err, result) => {
            if (!err) {
                res.status(200).send(result);
            } else {
                res.status(200).send([]);
            }
        });
    });
    app.post("/gds/api/basic-inventory", (req, res) => {
        new CreateItem(req.body).execute((err, result) => {
            if (!err) {
                res.status(200).send(result);
            } else {
                res.status(500).send("Item not saved");
            }
        });
    });
}