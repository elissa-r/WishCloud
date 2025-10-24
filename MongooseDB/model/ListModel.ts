import mongoose, { Schema, Model, ConnectOptions } from "mongoose";
import { IListModel } from "../interfaces/IListModel";

class ListModel {
  public schema!: Schema;
  public model!: Model<IListModel>;
  private dbConnectionString: string;

  private constructor(DB_CONNECTION_STRING: string) {
    this.dbConnectionString = DB_CONNECTION_STRING;
    this.createSchema();
  }

  public static async init(DB_CONNECTION_STRING: string) {
    const instance = new ListModel(DB_CONNECTION_STRING);
    await instance.createModel();
    return instance;
  }

  private createSchema() {
    this.schema = new Schema({
      name: String,
      listId: Number,
      userID: Number,
      photoLink: String,
      date: Date,
      budget: Number
    }, { collection: 'lists' });
  }

  private async createModel() {
    try {
      await mongoose.connect(this.dbConnectionString);
      this.model = mongoose.model<IListModel>("Lists", this.schema);
    } catch (e) {
      console.error("Failed to connect/create model:", e);
      throw e;
    }
  }

  public async retrieveAllLists(response: any) {
    const itemArray = await this.model.find({}).exec();
    response.json(itemArray);
  }

  public async retrieveLists(response: any, value: number) {
    const result = await this.model.findOne({ listId: value }).exec();
    response.json(result);
  }

  public async retrieveListCount(response: any) {
    const numberOfLists = await this.model.estimatedDocumentCount().exec();
    response.json(numberOfLists);
  }
}

export { ListModel };
