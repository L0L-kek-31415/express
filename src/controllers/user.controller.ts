import { logger } from "@typegoose/typegoose/lib/logSettings";
import { UserModel } from "../models/user.model";

export class UserController {
  static async create (request: any, reply: any){
    try {
      const user = request.body;
      const newUser = await UserModel.create(user);
      reply.send(newUser);
    } catch (e) {
      reply.send(e);
    }
  }
  
  static async fetch (request: any, reply: any){
    try {
      const users = await UserModel.find({});
      reply.send(users);
    } catch (e) {
      reply.send(e);
    }
  }

 static async get (request: any, reply: any){
  try {
    const userId = request.params.id;
    const user = await UserModel.findById(userId);
    reply.send(user);
  } catch (e) {
    reply.send(e);
  }
}
  
  static async update (request: any, reply: any){
    try {
      logger.debug("update controller")
      const userId = request.params.id;
      const updates = request.body;
      await UserModel.findOneAndUpdate({_id: userId}, updates);
      const userToUpdate = await UserModel.findById(userId);
      reply.send({ data: userToUpdate });
    } catch (e) {
      reply.send(e);
    }
  }
  
  static async delete (request: any, reply: any){
    try {
      const userId = request.params.id;
      const userToDelete = await UserModel.findById(userId);
      await UserModel.findByIdAndDelete(userId);
      reply.send({ data: userToDelete });
    } catch (e) {
      reply.send(e);
    }
  }
};