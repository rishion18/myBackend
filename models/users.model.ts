import { model, Schema } from "mongoose";

const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   phone: String,
   address: String,
   userName: String,
   role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
   },
   isVerified:{
      type: Boolean,
      default: false
   },
   isSuspended:{
      type: Boolean,
      default: false
   },
   loginCount:{
      type: Number,
      default: 0
   },
   fcmTokens: {
      type: [String],
      default: []
   },
   deviceIds:{
      type: [String],
      default: []
   }
},{
      timestamps: true
})

const User = model("User", userSchema)

export default User