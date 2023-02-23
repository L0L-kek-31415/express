import { getModelForClass, prop } from "@typegoose/typegoose"


class UserClass {
  @prop({ type: Number, required: true})
  _id?: number;

  @prop({ type: Number, required: true, default: 0})
  projects?: number;

  @prop({ type: Number, required: true, default: 0})
  boards?: number;

  @prop({ type: Number, required: true, default: 0})
  tickets?: number;

  @prop({ type: String, required: true})
  name?: string;

}

export const UserModel = getModelForClass(UserClass);


