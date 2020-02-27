/**
 * Create a new user and save it to our database.
 *
 * So I'm going to call the function describe the described function takes two arguments.
 * The first is a string that describes the test that we're about to write and then the second is a function.
 */

const assert = require("assert");
const User = require("../src/user");

describe("Create records", () => {
	it("saves a user", (done) => {
		// Whenever Mocha's sees it function, it's going to say ah the user or the developer is trying to run some type of test inside of this function right here.
		// 1. Create a new user
		const joe = new User({ name: "Joe" });
		// When we use it in combination with the new keyword and assign the result to Joe becomes an instance of user.
		joe
			.save() // save returns a promise
			.then(() => {
				// Has joe been saved successfully?
				assert(!joe.isNew);
				done();
			});
	});
});
