import type { Document } from "mongoose";
const mongoose = require("mongoose");

interface IListModel extends Document {
    name: string;
    listId: number;
    userID: number;
    photoLink: string;
    date: Date;
    budget: number;
}

export { IListModel };
