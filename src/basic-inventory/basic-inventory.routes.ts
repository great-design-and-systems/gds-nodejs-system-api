import { CreateItem } from "./control/create-item";
import { GetItemByID } from "./control/get-item-by-id";
import { GetItems } from "./control/get-items";
import {RemoveItemByID} from "./control/remove-item-by-id";
import {AddItemQuantityByID} from "./control/add-item-quantity-by-id";
import {UpdateItemByID} from "./control/update-item-by-id";
export function BasicInventory(app) {
    app.get("/gds/api/basic-inventory/:id", (req, res) => {
        new GetItemByID(req.params.id).execute((err, result) => {
            if (!err) {
                res.status(200).send(result);
            } else {
                res.status(500).send({ "err": err, "message": "Item not found" });
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
                res.status(500).send({ "err": err, "message": "Item not saved" });
            }
        });
    });
    app.delete("/gds/api/basic-inventory/:id", (req, res) => {
        new RemoveItemByID(req.params.id).execute((err, result) => {
            if (!err) {
                res.status(200).send("item " + result.name + " has been deleted");
            } else {
                res.status(500).send({ "err": err, "message": "Item is not deleted" });
            }
        });
    });
    app.put("/gds/api/basic-inventory/:id/add-quantity", (req, res) => {
        new AddItemQuantityByID(req.params.id, req.body.value)
            .execute((err, result) => {
                if (!err) {
                    res.status(200).send("Quantity has been added");
                } else {
                    res.status(500).send({ "err": err, "message": "Quantity is not added" });
                }
            });
    });
    app.put("/gds/api/basic-inventory/:id", (req, res) => {
        new UpdateItemByID(req.params.id, req.body)
            .execute((err, result) => {
                if (!err) {
                    res.status(200).send("Item has been updated");
                } else {
                    res.status(500).send({ "err": err, "message": "Item update has failed" });
                }
            });
    });
}