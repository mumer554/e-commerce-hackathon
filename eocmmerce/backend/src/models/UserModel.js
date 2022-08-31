const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
UserModel.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY);

    this.tokens = this.tokens.concat({ token: token });
    // console.log("hello this is token",token);
    await this.save();
    // console.log("🚀 ~ file: userSchema.js ~ line 82 ~ token", token)
    // console.log("🚀 ~ file: userSchema.js ~ line 74 ~ token", token)
    return token;
  } catch (error) {
    console.log(error);
  }
};
UserModel.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
const User = mongoose.model('User', UserModel);
module.exports = User;
