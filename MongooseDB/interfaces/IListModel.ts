var Mongoose = require("mongoose");

interface IListModel extends Mongoose.Document {
    name: string;
    listId: number;
    userID: number;
    photoLink: string;
    date: Date;
    budget: number;
}
export {IListModel};