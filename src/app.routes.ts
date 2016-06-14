import {BasicInventory} from "./basic-inventory/basic-inventory.routes";
export function AppRoutes(app) {
    new BasicInventory(app);
}