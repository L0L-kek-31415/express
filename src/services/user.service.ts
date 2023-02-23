import { logger } from "@typegoose/typegoose/lib/logSettings";
import { UserModel } from "../models/user.model";

export class UserService {
  static async create (id: number, name: string): Promise<void> {
    console.log(id, name)
    const user = {
      _id: id,
      name: name,
    }
    await UserModel.create(user);
  }
  static async update(id: number, name: string, value: number): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { $inc: {[name]: value}})
  }

  static async delete (id: number): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
};