import mongoose, { HydratedDocument } from "mongoose";
import requiredField from "utils/requiredField";
import validator from "validator";
import bcrypt from "bcryptjs";
export interface UserDocument {
  id: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  passwordChangeAt?: Date;
  role: string;
  isPasswordChangeAfterIssued: (issueAt: number) => boolean;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}
export interface UserDocumentMongoose extends mongoose.Document, UserDocument {}
const userSchema = new mongoose.Schema({
  name: {
    ...requiredField(String, "User must have name"),
  },
  email: {
    ...requiredField(String, "User must have email"),
    unique: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  password: {
    ...requiredField(String, "User must have password"),
    minLength: [6, "Password must at least 6 characters"],
    select: false,
  },
  passwordConfirm: {
    ...requiredField(String, "User must have passwordConfirm"),
    minLength: [6, "Password must at least 6 characters"],

    validate: {
      validator: function (value: string) {
        const user = this as UserDocumentMongoose;
        return user.password === value;
      },
      message: `password vs password confirm does'not match.`,
    },
  },
  passwordChangeAt: Date,
  role: {
    type: String,
    default: "user",
    enums: ["user", "admin"],
  },
});
// pre-save hooks
userSchema.pre("save", async function (next) {
  const user = this as HydratedDocument<UserDocument>;
  if (!user.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  user.passwordConfirm = undefined;
  next();
});
// methods
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;
  return await bcrypt.compare(candidatePassword, user.password);
};
userSchema.methods.isPasswordChangeAfterIssued = function (
  issueAt: number
): boolean {
  const user = this as UserDocument;

  if (user.passwordChangeAt) {
    // times 1000 to millisecond
    // issueAt <change ===true

    return issueAt * 1000 < new Date(user.passwordChangeAt).getTime();
  }
  return false;
};
const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
