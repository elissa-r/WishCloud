var Mongoose = require("mongoose");

interface IItemModel extends Mongoose.Document {
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