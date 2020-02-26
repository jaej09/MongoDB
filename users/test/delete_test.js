const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
	var joe;

	beforeEach((done) => {
		joe = new User({ name: "Joe" }); // has _id property even though the data has not been saved yet.\
		joe.save().then(() => done());
	});

	it("model instance remove", (done) => {
		// Remove joe first.
		joe
			.remove()
			.then(() => {
				// This .then only be executed once the remove operation is completed.
				User.findOne({ name: "Joe" });
			})
			.then((user) => {
				assert(user === undefined);
				done();
			});
	});

	it("class method remove", (done) => {
		User.remove({ name: "Joe" }).then(() => User.findOne({ name: "Joe" })).then((user) => {
			assert(user === undefined);
			done();
		});
	});

	it("class method findOneAndRemove", () => {});
});
