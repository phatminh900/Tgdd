import { Schema, Types } from "mongoose";

type TypeSchema =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | ArrayConstructor
  | ObjectConstructor
  | Types.ObjectId;

const requiredField = (
  type: TypeSchema,
  msg: string
): {
  type: TypeSchema;
  required: [true, string];
} => ({
  type,
  required: [true, msg],
});
export default requiredField;
