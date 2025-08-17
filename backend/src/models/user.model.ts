import { model } from "mongoose";
import type { IUser } from "../schemas/user.schema.ts";
import { userSchema } from "../schemas/user.schema.ts";

const User = model<IUser>("User", userSchema);
export default User;
