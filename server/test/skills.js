process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../test_index");
chai.should();
chai.use(chaiHttp);

const User = require("../components/user/User.model");
const Skills = require("../components/skills/Skills.model");

const data = {
  email: "hey123456@gmail.com",
  password: "Asdf@1234",
};

const data2 = {
  email: "hey9876@gmail.com",
  password: "Asdf@1234",
};

const skillsData = [
  {
    name: "C",
    level: 5,
  },
  {
    name: "Java",
    level: 5,
  },
];

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

const addSkill = async (token, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await chai
        .request(server)
        .post("api/v1/skills")
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
      const newSkills = new Skills();
      newSkills.userId = savedUser.uid;
      newSkills.skills = skillsData;
      const savedSkillsObj = await newSkills.save();
      const loginResponse = await loginUser(data);
      return {
        skillsObj: savedSkillsObj,
        accessToken: loginResponse.body.data.accessToken,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const runScriptWithoutSkills = async () => {
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
let accessToken, createdSkills;

/** Get Skills */
describe("Skills Service Unit Tests", function () {
  beforeEach(function (done) {
    runScript().then((data) => {
      accessToken = data.accessToken;
      createdSkills = data.skillsObj;
      done();
    });
  });

  afterEach(function (done) {
    Skills.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("Skills collection may not exists!");
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
  describe("## Get Skills functionality success", function () {
    it("## api/v1/skills \n\t\tshould successfully get the skills of user", function (done) {
      if (accessToken && createdSkills) {
        chai
          .request(server)
          .get("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(true);

            done();
          });
      }
    }).timeout(5000);
  });
  describe("## Get Skills functionality error", function () {
    it("## api/v1/skills \n\t\tshould return error when user is not logged in or Authorization header is not provided", function (done) {
      chai
        .request(server)
        .get("/api/v1/skills")
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
    it("## api/v1/skills \n\t\tshould return error when token is not valid", function (done) {
      chai
        .request(server)
        .get("/api/v1/skills")
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

/** Add Skills */
describe("Skills Service Unit Tests", function () {
  beforeEach(function (done) {
    runScriptWithoutSkills().then((data) => {
      accessToken = data.accessToken;
      done();
    });
  });

  afterEach(function (done) {
    Skills.collection
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
  describe("## Create Skill functionality success", function () {
    it("## api/v1/skills \n\t\tshould successfully add the skill", function (done) {
      const data = {
        skill: {
          name: "JavaScript",
          level: 5,
        },
      };
      if (accessToken) {
        chai
          .request(server)
          .post("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(data)
          .end(function (err, res) {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.should.have.property("data");
            res.body.success.should.equal(true);

            res.body.data.skills.should.be.a("array");
            res.body.data.skills.length.should.equal(1);
            res.body.data.skills[0].should.have.property("name");
            res.body.data.skills[0].should.have.property("level");
            res.body.data.skills[0].name.should.equal(data.skill.name);
            res.body.data.skills[0].level.should.equal(data.skill.level);

            done();
          });
      }
    }).timeout(5000);
  });
});

describe("Skills Service Unit Tests", function () {
  beforeEach(function (done) {
    runScript().then((data) => {
      accessToken = data.accessToken;
      createdSkills = data.skillsObj;
      done();
    });
  });

  afterEach(function (done) {
    Skills.collection
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
  describe("## Create Skill functionality success", function () {
    it("## api/v1/skills \n\t\tshould successfully add the skill", function (done) {
      const data = {
        skill: {
          name: "JavaScript",
          level: 5,
        },
      };
      if (accessToken && createdSkills) {
        chai
          .request(server)
          .post("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(data)
          .end(function (err, res) {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.should.have.property("data");
            res.body.success.should.equal(true);

            res.body.data.skills.should.be.a("array");

            done();
          });
      }
    }).timeout(5000);
  });
});

/** Add Skills */
describe("Skills Service Unit Tests", function () {
  beforeEach(function (done) {
    runScript().then((data) => {
      accessToken = data.accessToken;
      createdSkills = data.skillsObj;
      done();
    });
  });

  afterEach(function (done) {
    Skills.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("Skills collection may not exists!");
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
  describe("## Create Skills functionality Error", function () {
    /**
     * Skill Error Test
     */
    it("## api/v1/skills \n\t\tshould throw error if skill is not provided", function (done) {
      if (accessToken && createdSkills) {
        const newSkillData = {};
        chai
          .request(server)
          .post("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newSkillData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Skill is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/skills \n\t\tshould throw error if skill is provided is empty", function (done) {
      if (accessToken && createdSkills) {
        const newSkillData = {
          skill: {},
        };
        chai
          .request(server)
          .post("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newSkillData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Skill name is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/skills \n\t\tshould throw error if skill name is  empty", function (done) {
      if (accessToken && createdSkills) {
        const newSkillData = {
          skill: {
            name: "",
            level: 3,
          },
        };
        chai
          .request(server)
          .post("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newSkillData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Skill name is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/skills \n\t\tshould throw error if skill name is not provided ", function (done) {
      if (accessToken && createdSkills) {
        const newSkillData = {
          skill: {
            level: 3,
          },
        };
        chai
          .request(server)
          .post("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newSkillData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Skill name is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/skills \n\t\tshould throw error if skill level is empty", function (done) {
      if (accessToken && createdSkills) {
        const newSkillData = {
          skill: {
            name: "JavaScript",
            level: "",
          },
        };
        chai
          .request(server)
          .post("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newSkillData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Skill level is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/skills \n\t\tshould throw error if skill level is not provided", function (done) {
      if (accessToken && createdSkills) {
        const newSkillData = {
          skill: {
            name: "JavaScript",
          },
        };
        chai
          .request(server)
          .post("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newSkillData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Skill level is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/skills \n\t\tshould throw error if skill level exceeds 5", function (done) {
      if (accessToken && createdSkills) {
        const newSkillData = {
          skill: {
            name: "JavaScript",
            level: 8,
          },
        };
        chai
          .request(server)
          .post("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newSkillData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal(
              "Skill level must be between 1 and 5"
            );
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/skills \n\t\tshould throw error if skill level less than 0", function (done) {
      if (accessToken && createdSkills) {
        const newSkillData = {
          skill: {
            name: "JavaScript",
            level: -1,
          },
        };
        chai
          .request(server)
          .post("/api/v1/skills")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newSkillData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal(
              "Skill level must be between 1 and 5"
            );
            done();
          });
      }
    }).timeout(5000);
  });
});
