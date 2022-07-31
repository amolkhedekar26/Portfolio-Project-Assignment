process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../test_index");
chai.should();
chai.use(chaiHttp);

const User = require("../components/user/User.model");

// Login Successful Test
describe("User Service Unit Tests - Login Success", function () {
  beforeEach(function (done) {
    var newUser = new User({
      email: "hey12345@gmail.com",
      password: "Asdf@1234",
    });
    newUser.save(function (err) {
      done();
    });
  });

  afterEach(function (done) {
    User.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("User collection may not exists!");
      });
    done();
  });

  describe("## Login functionality successfull", function () {
    it("## /api/v1/users/login \n\t\tshould successfully login and return tokens ", async function () {
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send({
          email: "hey12345@gmail.com",
          password: "Asdf@1234",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.should.have.property("data");
          res.body.data.should.have.property("accessToken");
          res.body.data.should.have.property("refreshToken");
          res.body.data.should.have.property("email");
          res.body.data.email.should.equal("hey12345@gmail.com");
        });
    });
  });
});

// Login Error Test
describe("User Service Unit Tests - Login Error", function () {
  describe("## Login functionality error", function () {
    /**
     * Email Validation Test
     */
    it("## /api/v1/users/login \n\t\tshould throw an error if the email is not provided", async function () {
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send({
          password: "Asdf@1234",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Email is required");
        });
    });
    it("## /api/v1/users/login \n\t\tshould throw an error if the email is empty", async function () {
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send({
          email: "",
          password: "Asdf@1234",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Email cannot be empty");
        });
    });
    it("## /api/v1/users/login \n\t\tshould throw an error if the email is not valid", async function () {
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send({
          email: "hey12345.com",
          password: "Asdf@1234",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Email is invalid");
        });
    });

    /**
     * Password Validation Test
     */
    it("## /api/v1/users/login \n\t\tshould throw an error if the password is not provided", async function () {
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send({
          email: "hey12345@gmail.com",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Password is required");
        });
    });
    it("## /api/v1/users/login \n\t\tshould throw an error if the password is empty", async function () {
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send({
          email: "hey12345@gmail.com",
          password: "",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Password cannot be empty");
        });
    });
    it("## /api/v1/users/login \n\t\tshould throw an error if the password length is less than 8", async function () {
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send({
          email: "hey12345@gmail.com",
          password: "Asdf",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal(
            "Password must be at least 8 characters long"
          );
        });
    });
    it("## /api/v1/users/login \n\t\tshould throw an error if the password length is more than 30", async function () {
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send({
          email: "hey12345@gmail.com",
          password:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal(
            "Password must be at most 30 characters long"
          );
        });
    });

    /** Email is not registered */
    it("## /api/v1/users/login \n\t\tshould throw an error if the email is not registered yet", async function () {
      const data = {
        email: "hey12345@gmail.com",
        password: "Asdf@34567",
      };
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal(`${data.email} is not registered`);
        });
    });
  });

  // Wrong password test
  describe("## Login functionality error", function () {
    beforeEach(function (done) {
      var newUser = new User({
        email: "hey12345@gmail.com",
        password: "Asdf@1234",
      });
      newUser.save(function (err) {
        done();
      });
    });

    afterEach(function (done) {
      User.collection
        .drop()
        .then(function () {
          // success
        })
        .catch(function () {
          // error handling
          console.warn("User collection may not exists!");
        });
      done();
    });
    it("## /api/v1/users/login \n\t\tshould throw an error if the password is incorrect", async function () {
      chai
        .request(server)
        .post("/api/v1/users/login")
        .send({
          email: "hey12345@gmail.com",
          password: "Asdf@34567",
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Incorrect password entered");
        });
    });
  });
});

// Register Successful Test
describe("User Service Unit Tests - Register Success", function () {
  describe("## Register functionality successfull", function () {
    it("## /api/v1/users/register \n\t\tshould successfully register the user", async function () {
      const data = {
        email: "heydude1234@gmail.com",
        password: "Asdf@1234",
      };
      chai
        .request(server)
        .post("/api/v1/users/register")
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.should.have.property("data");
        });
    });
  });
});

// Register Error Test
describe("User Service Unit Tests - Register Error", function () {
  describe("## Register functionality error", function () {
    const ENDPOINT = "/api/v1/users/register";
    /**
     * Email Validation Test
     */
    it("## /api/v1/users/register \n\t\tshould throw an error if the email is not provided", async function () {
      chai
        .request(server)
        .post(ENDPOINT)
        .send({
          password: "Asdf@1234",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Email is required");
        });
    });
    it("## /api/v1/users/register \n\t\tshould throw an error if the email is empty", async function () {
      chai
        .request(server)
        .post(ENDPOINT)
        .send({
          email: "",
          password: "Asdf@1234",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Email cannot be empty");
        });
    });
    it("## /api/v1/users/register \n\t\tshould throw an error if the email is not valid", async function () {
      chai
        .request(server)
        .post(ENDPOINT)
        .send({
          email: "hey12345.com",
          password: "Asdf@1234",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Email is invalid");
        });
    });

    /**
     * Password Validation Test
     */
    it("## /api/v1/users/register \n\t\tshould throw an error if the password is not provided", async function () {
      chai
        .request(server)
        .post(ENDPOINT)
        .send({
          email: "hey12345@gmail.com",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Password is required");
        });
    });
    it("## /api/v1/users/register \n\t\tshould throw an error if the password is empty", async function () {
      chai
        .request(server)
        .post(ENDPOINT)
        .send({
          email: "hey12345@gmail.com",
          password: "",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Password cannot be empty");
        });
    });
    it("## /api/v1/users/register \n\t\tshould throw an error if the password length is less than 8", async function () {
      chai
        .request(server)
        .post(ENDPOINT)
        .send({
          email: "hey12345@gmail.com",
          password: "Asdf",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal(
            "Password must be at least 8 characters long"
          );
        });
    });
    it("## /api/v1/users/register \n\t\tshould throw an error if the password length is more than 30", async function () {
      chai
        .request(server)
        .post(ENDPOINT)
        .send({
          email: "hey12345@gmail.com",
          password:
            "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal(
            "Password must be at most 30 characters long"
          );
        });
    });
    it("## /api/v1/users/register \n\t\tshould throw an error if the password not matching defined policies", async function () {
      chai
        .request(server)
        .post(ENDPOINT)
        .send({
          email: "hey12345@gmail.com",
          password: "Asdf123456",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal(
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
          );
        });
    });

    /** Email is already registered */
    describe("## Register functionality error", function () {
      const data = {
        email: "hey12345@gmail.com",
        password: "Asdf@1234",
      };
      beforeEach(function (done) {
        var newUser = new User(data);
        newUser.save(function (err) {
          done();
        });
      });

      afterEach(function (done) {
        User.collection
          .drop()
          .then(function () {
            // success
          })
          .catch(function () {
            // error handling
            console.warn("User collection may not exists!");
          });
        done();
      });
      it("## /api/v1/users/register \n\t\tshould throw an error if the email is already registered", async function () {
        chai
          .request(server)
          .post(ENDPOINT)
          .send(data)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal(
              `${data.email} is already been registered`
            );
          });
      });
    });
  });
});
