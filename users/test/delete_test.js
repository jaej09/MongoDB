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
				return User.findOne({ name: "Joe" });
			})
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it("class method remove", (done) => {
		User.deleteOne({ name: "Joe" })
			.then(() => {
				// This .then only be executed once the remove operation is completed.
				return User.findOne({ name: "Joe" });
			})
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it("class method findOneAndRemove", (done) => {
		User.findOneAndRemove({ name: "Joe" })
			.then(() => {
				// This .then only be executed once the remove operation is completed.
				return User.findOne({ name: "Joe" });
			})
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it("class method findByIdAndRemove", (done) => {
		User.findByIdAndRemove(joe._id)
			.then(() => {
				// This .then only be executed once the remove operation is completed.
				return User.findOne({ name: "Joe" });
			})
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it("class method findOneAndDelete instead of findOneAndRemove (Deprecated)", (done) => {
		User.findOneAndDelete({ name: "Joe" })
			.then(() => {
				// This .then only be executed once the remove operation is completed.
				return User.findOne({ name: "Joe" });
			})
			.then((user) => {
				assert(user === null);
				done();
			});
	});
});
