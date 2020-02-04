const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  var joe;

  // Because a user data 'joe' created is removed from test_helper.js, we have to explicitly create another variable.
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("finds all users with a name of joe", () => {});
});
