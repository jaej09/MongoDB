const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

/**
 * Difference between before and beforeEach is that
 * before only is executed one time for all of your tests.
 * in this case, we only need to tell mongoose to connect to Mongo exactly one time.
 *
 * So again we want to say to Mocha
 * "Hey just hold up for a second pause execution and wait until we have successfully connected to Mongo."
 *
 * By using before,
 * now we're guaranteed that in the case if mongoose takes some long time to connect
 * we're going to NOT run any of our tests until our connection has been successfully made.
 */
before(done => {
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection
    .once("open", () => {
      console.log("✅ Good to go!");
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

// before testing... execute it first.
beforeEach(done => {
  /**
   * Mocha doesn't have any default idea of asynchronous operations.
   * It just says, i'm going to run all my tests as fast as i can.
   * We need to make sure Mocha understands that
   * it needs to do a little bit of a pause before it runs the next test.
   */

  /**
   * Take all the records inside of users collection and delete it.
   * .drop accepts a callback function
   * which will be executed once it is done dropping our collection of users.
   * The function will only be executed once all the users are done with our collection.
   */
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
