const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
	var joe;

	beforeEach((done) => {
		joe = new User({ name: "Joe" });
		joe.save().then(() => done());
	});

	it("instance type using set and save", () => {
		// .set -> update name property of joe to Alex.
		joe.set("name", "Alex");
		console.log(joe);

		// just setting a property however does not reflect that to the database.
		// this is solely done in memory.

		// .save can use after we have called .set on some property.
		joe
			.save()
			.then(() => {
				// collect the entire list of all the users in our collection.
				// which means we use .find method.
				// {} passing an empty object means I have no criteria for this find operation.
				// just give me everything that's in here.
				User.find({});
			})
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === "Alex");
				done();
			});
	});
});
