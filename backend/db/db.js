const mongoose = require("mongoose");
const { Schema } = require("zod");

const mongoConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://iamgreatalien:vinaykajla@vinaykajla.krvo7fj.mongodb.net/paytm"
    );
    console.log("Mongo connection established");
  } catch (error) {
    console.log("Mongo connection failed " + error);
  }
};

mongoConnection();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const accountsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountsSchema);

module.exports = {
  User,
  Account,
};
