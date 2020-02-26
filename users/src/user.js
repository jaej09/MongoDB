const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

/**
 * first argument (user) - what the collection is called inside of MongoDB.
 * second argument (User Schema) - what we expect this collection of users to follow.
 *                                 Anytime working with the user, we expect them to have a name and that name should be a string.
 *
 * variable name (User) - User refer to as user class along with user model.
 *                        We can use that term interchangeably user class and user model.
 *                        It does not represent any particular user insight or application.
 *                        It represents the entire collection of data that's sitting inside of our database.
 */
const User = mongoose.model("user", UserSchema);
module.exports = User;
