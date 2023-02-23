import { getModelForClass, prop } from "@typegoose/typegoose"


class ProjectClass {
  @prop({ type: Number, required: true})
  _id?: number;

  @prop({ type: Number, required: true, default: 0})
  boards?: number;

  @prop({ type: Number, required: true, default: 0})
  tickets?: number;

  @prop({ type: String, required: true})
  name?: string;

  @prop({ type: Number, required: true, default: 0})
  members?: number

  @prop({ type: Number, required: true, default: 0})
  delta?: number
}

export const ProjectModule = getModelForClass(ProjectClass);



