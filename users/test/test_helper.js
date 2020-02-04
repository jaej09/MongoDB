const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_test");
mongoose.connection.once("open", () => console.log("Good to go!")).on("error", error => console.warn("Warning", error));

// before testing... execute it first.
beforeEach(done => {
  /**
   * Mocha doesn't have any default idea of asynchronous operations.
   * it just says, i'm going to run all my tests as fast as i can.
   * we need to make sure that Mocha understands it needs to do a little bit of a pause before it runs the next test.
   */

  // Take all the records inside of users collection and delete it.
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
