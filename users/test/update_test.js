const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
	var joe;

	beforeEach((done) => {
		joe = new User({ name: "Joe", postCount: 0 });
		joe.save().then(() => done());
	});

	/**
   * Helper function
   * @param {*} operation 
   */
	function assertName(operation, done) {
		operation
			.then(() => {
				/**
         * Make sure that we are not only testing that
         * there is NOT a record called Joe
         * but also be testing that there is a record with the name of Alex.
         * So, Collect the entire list of all the users in our collection.
         * which means we use .find method.
         * 
         * {} passing an empty object means I have no criteria for this find operation.
         * just give me everything that's in here.
         */
				return User.find({});
			})
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === "Alex");
				done();
			});
	}

	it("instance type using set and save", (done) => {
		// .set -> update name property of joe to Alex.
		joe.set("name", "Alex");
		console.log(joe);

		// just setting a property however does not reflect that to the database.
		// this is solely done in memory.

		// .save can use after we have called .set on some property.
		assertName(joe.save(), done);
	});

	/**
   * set and save 는 두 단계를 거치는 반면 update 는 한번에 변경 및 저장까지 한다.
   * 
   * 변경할 것이 여러가지가 있다면,
   * such as email, username, phone 여러가지 데이터를 set 을 통해 변경한 다음, 
   * 한번에 디비에 저장할 때는 set and save 가 보다 적합한 function 이라 판단된다.
   */
	it("a model instance can update", (done) => {
		assertName(joe.update({ name: "Alex" }), done);
	});

	it("a model class can update", (done) => {
		// Find all of the records inside of this User collection with the name of Joe replaced with Alex.
		assertName(User.update({ name: "Joe" }, { name: "Alex" }), done);
	});

	it("a model class can update one record", (done) => {
		// Update a single record by passing in a unique attribute such as particular e-mail address.
		assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
	});

	it("a model class can find a record with an ID and update", (done) => {
		assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
	});

	// #7 Mongo Operators
	// we’re going to entirely rely upon Mongo to make increments postCount by 1
	it("a user can have their postcount incremented by 1", () => {
		User.update({ name: "Joe" }, { $inc: { postCount: 1 } })
			.then(() => User.findOne({ name: "Joe" }))
			.then((user) => {
				assert(user.postCount === 1);
			});
	});
});
