const should = require("should");
const sinon = require("sinon");

const controller = require("../controllers/bookController");

describe("Book controller tests", () => {
  describe("post", () => {
    it("should not allow post without title", () => {
      const Book = function (book) {
        this.save = () => {};
      };
      const req = {
        body: {
          author: "George",
        },
      };
      const res = {
        send: sinon.spy(),
        status: sinon.spy(),
        json: sinon.spy(),
      };

      const bookController = controller(Book);
      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad request ${res.status.args[0][0]}`);
      res.send.calledWith("Title is required").should.equal(true);
    });
  });
});
