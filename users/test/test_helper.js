const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_test");
mongoose.connection.once("open", () => console.log("Good to go!")).on("error", error => console.warn("Warning", error));

beforeEach(() => {
  // Take all the records inside of users collection and delete it.
  mongoose.connection.collections.users.drop();
});
