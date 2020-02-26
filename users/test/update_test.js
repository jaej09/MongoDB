const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
	var joe;

	beforeEach((done) => {
		joe = new User({ name: "Joe" });
		joe.save().then(() => done());
	});

	/**
   * Helper function
   * @param {*} operation 
   */
	function assertName(operation, done) {
		operation
			.then(() => {
				// collect the entire list of all the users in our collection.
				// which means we use .find method.
				// {} passing an empty object means I have no criteria for this find operation.
				// just give me everything that's in here.
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
   * 변경할 것이 여러가지가 있다면 
   * such as email, username, phone 여러가지 데이터를 set 을 통해 변경한 다음, 
   * 한번에 디비에 저장할 때는 set and save 가 보다 적합한 function 이라 판단된다.
   */
	it("a model instance can update", (done) => {
		assertName(joe.update({ name: "Alex" }), done);
	});
});
