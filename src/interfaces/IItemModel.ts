import type { Document } from "mongoose";
const mongoose = require("mongoose");

interface IItemModel extends Document {
    listId: number;
    item: [ {
        name: string;
        itemId: number;
        photoLink: string;
        price: number;
        description: string;
        itemLink: string;
        isReserved: Boolean;
    }];
}
export {IItemModel};