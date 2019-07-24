import mongoose, { Schema } from 'mongoose';
import { schemaOptions } from "./schemaOptions";





const user = {

  username: {
    type: String
  },

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },

  role: {
    type: String,
    enum: ['user', 'admin']
  },
  profession: {
    type: String,
  },

  skills: {
    type: Array,
    default: []
  },
  verificationToken: {
    type: String,
    default: null
  },

  resetPasswordToken: {
    type: String,
    default: null
  },

  resetPasswordExpires: {
    type: Date,
    default: null
  }

}

const userSchema = new Schema(user, schemaOptions)

module.exports = mongoose.model('user', userSchema);