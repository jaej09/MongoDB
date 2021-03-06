const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
	it("require a user name", () => {
		const user = new User({ name: undefined });

		/**
     * user.validateSync() is a synchronous validation process.
     * So we can call validateSync() and in the exact same line, we will get a result back about validation.
     * 
     * user.validate() does not return a validation result.
     * instead we can pass a callback function and inside of callback function,
     * we can do something with that validation result.
     * user.validate((validationResult) => { ... })
     * 
     * The reason we would have validate with a callback function here is to run any type of asynchronous validation that we might want to have.
     * Whenever a user runs validation to reach out to our database or web server,
     * say "hey, is there already a user with like a name that has the same last name"
     * we can handle stuff like uniqueness at the database level we would use.
     * 
     * 여기서는 유저가 두글자 이상 입력했는지 확인하는 간단한 validation 을 실행할 것이기 때문에, sync 를 사용한다.
     */
		const validationResult = user.validateSync(); // 모든 stack trace 가 validationResult 에 담긴다.

		// const message = validationResult.errors.name.message; 을 ES6 문법으로 변경
		// 모든 stack trace 중에 name 에 관련된 간단한 메세지만 가져온다
		const { message } = validationResult.errors.name;

		assert(message === "Name is required.");
	});

	it("requires a user name longer than 2 characters", () => {
		const user = new User({ name: "Al" });
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;

		assert(message === "Name must be longer than 2 characters.");
	});

	it("disallow invalid records from being saved", (done) => {
		const user = new User({ name: "Al" });
		user
			.save()
			.then(() => {
				console.log("Successfully updated.");
				done();
			})
			.catch((validationResult) => {
				const { message } = validationResult.errors.name;
				assert(message === "Name must be longer than 2 characters.");
				done();
			});
	});
});
