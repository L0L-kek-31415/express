import { logger } from "@typegoose/typegoose/lib/logSettings";
import { ProjectModule } from "../models/project.model";

export class ProjectService {
  static async create (id: number, name: string) {
      const user = {
        _id: id,
        name: name
      }
      const newUser = await ProjectModule.create(user);
  }

  static async update(id: number, name: string, value: number): Promise<void> {
    await ProjectModule.findByIdAndUpdate(id, { $inc: {[name]: value}})
  }

  static async delTicket(id: number, time: number): Promise<void> {
    const project = await ProjectModule.findById(id)
    
    // @ts-ignore
    if (project.delta > 0) {
      console.log("recreate project delate")
          // @ts-ignore
      const newDelta = (project.delta + time)/2
      await ProjectModule.findByIdAndUpdate(id, {"delta": newDelta})
    }
        // @ts-ignore
    if (project.delta == 0){
      console.log("set new project delta")
      const newDelta = Math.round(time)
      await ProjectModule.findByIdAndUpdate(id, {"delta": newDelta})
    }
    await ProjectModule.findByIdAndUpdate(id, { $inc: {'tickets': -1}})
  }

  static async delete (id: number): Promise<void> {
      await ProjectModule.findByIdAndDelete(id);
  }
};