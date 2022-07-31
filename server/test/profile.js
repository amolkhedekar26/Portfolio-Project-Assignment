process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../test_index");
chai.should();
chai.use(chaiHttp);

const User = require("../components/user/User.model");
const Profiie = require("../components/profile/Profile.model");

const data = {
  email: "hey123456@gmail.com",
  password: "Asdf@1234",
};

const data2 = {
  email: "hey9876@gmail.com",
  password: "Asdf@1234",
};

const profileData = {
  firstName: "John",
  lastName: "Doe",
  location: "Bangalore",
  contactNo: "1234567890",
  aboutMe: "I am a software developer",
};

const createUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await chai
        .request(server)
        .post("/api/v1/users/register")
        .send(data);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const createProfile = async (token, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await chai
        .request(server)
        .post("api/v1/profiles")
        .set("Authorization", `Bearer ${token}`)
        .send(data);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const loginUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await chai
        .request(server)
        .post("/api/v1/users/login")
        .send(data);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

const runScript = async () => {
  try {
    const user = new User(data);
    const savedUser = await user.save();
    if (savedUser) {
      //   console.log(savedUser);
      const profile = new Profiie(profileData);
      profile.userId = savedUser.uid;
      const savedProfile = await profile.save();
      const loginResponse = await loginUser(data);
      return {
        profileObj: savedProfile,
        accessToken: loginResponse.body.data.accessToken,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const runScriptWithoutProfile = async () => {
  try {
    const user = new User(data2);
    const savedUser = await user.save();
    if (savedUser) {
      const loginResponse = await loginUser(data2);
      return {
        accessToken: loginResponse.body.data.accessToken,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
let accessToken, createdProfile;

describe("Profile Service Unit Tests", function () {
  beforeEach(function (done) {
    // var newUser = new User({
    //   email: "hey12345@gmail.com",
    //   password: "Asdf@1234",
    // });
    // newUser.save(function (err) {
    //   done();
    // });
    runScript().then((data) => {
      accessToken = data.accessToken;
      createdProfile = data.profileObj;
      done();
    });
  });

  afterEach(function (done) {
    Profiie.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("User collection may not exists!");
      });
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
  describe("## Get Profile functionality success", function () {
    it("## api/v1/profiles \n\t\tshould successfully get the profile of user", function (done) {
      if (accessToken && createdProfile) {
        chai
          .request(server)
          .get("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(true);
            res.body.data.should.have.property("firstName");
            res.body.data.should.have.property("lastName");
            res.body.data.should.have.property("location");
            res.body.data.should.have.property("contactNo");
            res.body.data.should.have.property("aboutMe");
            res.body.data.should.have.property("initials");
            res.body.data.firstName.should.equal(profileData.firstName);
            res.body.data.lastName.should.equal(profileData.lastName);
            res.body.data.location.should.equal(profileData.location);
            res.body.data.contactNo.should.equal(profileData.contactNo);
            res.body.data.aboutMe.should.equal(profileData.aboutMe);

            done();
          });
      }
    }).timeout(5000);
  });
  describe("Get Profile Error GET /api/v1/profiles", function () {
    it("## api/v1/profiles \n\t\tshould return error when user is not logged in or Authorization header is not provided", function (done) {
      chai
        .request(server)
        .get("/api/v1/profiles")
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal(
            "Unauthorized! Please login to continue"
          );
          done();
        });
    }).timeout(5000);
    it("## api/v1/profiles \n\t\tshould return error when token is not valid", function (done) {
      chai
        .request(server)
        .get("/api/v1/profiles")
        .set("Authorization", "Bearer 12345")
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.success.should.equal(false);
          res.body.message.should.equal("Unauthorized");
          done();
        });
    }).timeout(5000);
  });
});

describe("Profile Service Unit Tests", function () {
  beforeEach(function (done) {
    runScriptWithoutProfile().then((data) => {
      accessToken = data.accessToken;
      done();
    });
  });

  afterEach(function (done) {
    Profiie.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("User collection may not exists!");
      });
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
  describe("## Create Profile functionality success", function () {
    it("## api/v1/profiles \n\t\tshould successfully create the profile of user", function (done) {
      if (accessToken) {
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(profileData)
          .end(function (err, res) {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.should.have.property("data");
            res.body.success.should.equal(true);
            res.body.data.should.have.property("firstName");
            res.body.data.should.have.property("lastName");
            res.body.data.should.have.property("location");
            res.body.data.should.have.property("contactNo");
            res.body.data.should.have.property("aboutMe");
            res.body.data.should.have.property("initials");
            res.body.data.firstName.should.equal(profileData.firstName);
            res.body.data.lastName.should.equal(profileData.lastName);
            res.body.data.location.should.equal(profileData.location);
            res.body.data.contactNo.should.equal(profileData.contactNo);
            res.body.data.aboutMe.should.equal(profileData.aboutMe);

            done();
          });
      }
    }).timeout(5000);
  });
});

describe("Profile Service Unit Tests", function () {
  beforeEach(function (done) {
    runScript().then((data) => {
      accessToken = data.accessToken;
      createdProfile = data.profileObj;
      done();
    });
  });

  afterEach(function (done) {
    Profiie.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("User collection may not exists!");
      });
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
  describe("## Create Profile functionality success", function () {
    it("## api/v1/profiles \n\t\tshould successfully update the profile if it is already present", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "Smith",
          lastName: "Raj",
          location: "Sydney",
          contactNo: "8989898989",
          aboutMe: "This is updated profile",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.should.have.property("data");
            res.body.success.should.equal(true);
            res.body.data.should.have.property("firstName");
            res.body.data.should.have.property("lastName");
            res.body.data.should.have.property("location");
            res.body.data.should.have.property("contactNo");
            res.body.data.should.have.property("aboutMe");
            res.body.data.should.have.property("initials");
            res.body.data.firstName.should.equal(newProfileData.firstName);
            res.body.data.lastName.should.equal(newProfileData.lastName);
            res.body.data.location.should.equal(newProfileData.location);
            res.body.data.contactNo.should.equal(newProfileData.contactNo);
            res.body.data.aboutMe.should.equal(newProfileData.aboutMe);

            done();
          });
      }
    }).timeout(5000);
  });
});

describe("Profile Service Unit Tests", function () {
  beforeEach(function (done) {
    runScript().then((data) => {
      accessToken = data.accessToken;
      createdProfile = data.profileObj;
      done();
    });
  });

  afterEach(function (done) {
    Profiie.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("User collection may not exists!");
      });
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
  describe("## Create Profile functionality Error", function () {
    /**
     * First Name Error Tests
     */
    it("## api/v1/profiles \n\t\tshould throw error if firstName is not provided", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          lastName: "Raj",
          location: "Sydney",
          contactNo: "8989898989",
          aboutMe: "This is updated profile",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("First name is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/profiles \n\t\tshould throw error if firstName is empty", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "",
          lastName: "Raj",
          location: "Sydney",
          contactNo: "8989898989",
          aboutMe: "This is updated profile",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("First name cannot be empty");
            done();
          });
      }
    }).timeout(5000);

    /**
     * Last Name Error Tests
     * */
    it("## api/v1/profiles \n\t\tshould throw error if lastName is not provided", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "Smith",
          location: "Sydney",
          contactNo: "8989898989",
          aboutMe: "This is updated profile",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Last name is required");
            done();
          });
      }
    }).timeout(5000);

    it("## api/v1/profiles \n\t\tshould throw error if lastName is empty", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "Smith",
          lastName: "",
          location: "Sydney",
          contactNo: "8989898989",
          aboutMe: "This is updated profile",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Last name cannot be empty");
            done();
          });
      }
    }).timeout(5000);

    /**
     * Location Error Tests
     * */
    it("## api/v1/profiles \n\t\tshould throw error if location is not provided", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "Smith",
          lastName: "Raj",
          contactNo: "8989898989",
          aboutMe: "This is updated profile",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Location is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/profiles \n\t\tshould throw error if location is empty", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "Smith",
          lastName: "Raj",
          location: "",
          contactNo: "8989898989",
          aboutMe: "This is updated profile",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Location cannot be empty");
            done();
          });
      }
    }).timeout(5000);

    /**
     * Contact No Error Tests
     * */
    it("## api/v1/profiles \n\t\tshould throw error if contactNo is not provided", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "Smith",
          lastName: "Raj",
          location: "Sydney",
          aboutMe: "This is updated profile",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Contact number is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/profiles \n\t\tshould throw error if contactNo is empty", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "Smith",
          lastName: "Raj",
          location: "Sydney",
          contactNo: "",
          aboutMe: "This is updated profile",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Contact number cannot be empty");
            done();
          });
      }
    }).timeout(5000);

    it("## api/v1/profiles \n\t\tshould throw error if contactNo provided is not valid phone number", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "Smith",
          lastName: "Raj",
          location: "Sydney",
          contactNo: "asdfasdf12",
          aboutMe: "This is updated profile",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Contact number must have 10 digits");
            done();
          });
      }
    }).timeout(5000);

    /**
     * About Me Error Tests
     * */
    it("## api/v1/profiles \n\t\tshould throw error if aboutMe is not provided", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "Smith",
          lastName: "Raj",
          location: "Sydney",
          contactNo: "8989898989",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("About me is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/profiles \n\t\tshould throw error if aboutMe is empty", function (done) {
      if (accessToken && createdProfile) {
        const newProfileData = {
          firstName: "Smith",
          lastName: "Raj",
          location: "Sydney",
          contactNo: "8989898989",
          aboutMe: "",
        };
        chai
          .request(server)
          .post("/api/v1/profiles")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProfileData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("About me cannot be empty");
            done();
          });
      }
    }).timeout(5000);
  });
});

describe("Profile Service Unit Tests", function () {
  it("## api/v1/profiles \n\t\tshould throw error if we try to create profile with accessToken is not valid", function (done) {
    const newProfileData = {
      firstName: "Smith",
      lastName: "Raj",
      location: "Sydney",
      contactNo: "8989898989",
      aboutMe: "This is updated profile",
    };
    chai
      .request(server)
      .post("/api/v1/profiles")
      .set("Authorization", `Bearer 12345`)
      .send(newProfileData)
      .end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        res.body.success.should.equal(false);
        res.body.message.should.equal("Unauthorized");
        done();
      });
  }).timeout(5000);

  it("## api/v1/profiles \n\t\tshould throw error if we try to get profile with accessToken is not valid", function (done) {
    chai
      .request(server)
      .get("/api/v1/profiles")
      .set("Authorization", `Bearer 12345`)
      .end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        res.body.success.should.equal(false);
        res.body.message.should.equal("Unauthorized");
        done();
      });
  }).timeout(5000);
});
