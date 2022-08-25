import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "models/user.model";
import { NotFoundError } from "utils/AppError";

export const validatePassword = async (
  input: DocumentDefinition<Omit<UserDocument, "name" | "passwordConfirm">>
) => {
  try {
    const user = await User.findOne({ email: input.email }).select("+password");
    if (!user || !(await user.comparePassword(input.password)))
      throw new NotFoundError(`User or password incorrect!`);
    return user;
  } catch (error) {
    throw error;
  }
};
