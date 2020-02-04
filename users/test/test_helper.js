const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

/**
 * Difference between before and beforeEach is that
 * before only is executed one time for all of your tests.
 * in this case, we only need to tell mongoose to connect to Mongo exactly one time.
 *
 * So again we want to say to Mocha
 * "Hey just hold up for a second pause execution and wait until we have successfully connected to Mongo."
 */
before(() => {
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection
    .once("open", () => {
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
   * it just says, i'm going to run all my tests as fast as i can.
   * we need to make sure that Mocha understands it needs to do a little bit of a pause before it runs the next test.
   */

  // Take all the records inside of users collection and delete it.
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
