process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../test_index");
chai.should();
chai.use(chaiHttp);

const User = require("../components/user/User.model");
const Skills = require("../components/skills/Skills.model");
const Project = require("../components/project/Project.model");

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

const projectsData = [
  {
    name: "Project 1",
    description: "Project 1 description",
  },
  {
    name: "Project 2",
    description: "Project 2 description",
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

const addProject = async (token, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await chai
        .request(server)
        .post("api/v1/projects")
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
      const newProject = new Project();
      newProject.userId = savedUser.uid;
      newProject.projects = projectsData;
      const savedProjectObj = await newProject.save();
      const loginResponse = await loginUser(data);
      return {
        skillsObj: savedSkillsObj,
        projectObj: savedProjectObj,
        accessToken: loginResponse.body.data.accessToken,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const runScriptWithoutProjects = async () => {
  try {
    const user = new User(data2);
    const savedUser = await user.save();
    if (savedUser) {
      const newSkills = new Skills();
      newSkills.userId = savedUser.uid;
      newSkills.skills = skillsData;
      const savedSkillsObj = await newSkills.save();
      const loginResponse = await loginUser(data2);
      return {
        skillsObj: savedSkillsObj,
        accessToken: loginResponse.body.data.accessToken,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
let accessToken, createdSkills, createdProjects;

/** Get Projects */
describe("Projects Service Unit Tests", function () {
  beforeEach(function (done) {
    runScript().then((data) => {
      accessToken = data.accessToken;
      createdSkills = data.skillsObj;
      createdProjects = data.projectObj;
      done();
    });
  });

  afterEach(function (done) {
    Project.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("Project collection may not exists!");
      });
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
  describe("## Get Project functionality success", function () {
    it("## api/v1/projects \n\t\tshould successfully get the projects of user", function (done) {
      if (accessToken && createdSkills && createdProjects) {
        chai
          .request(server)
          .get("/api/v1/projects")
          .set("Authorization", `Bearer ${accessToken}`)
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(true);

            res.body.should.have.property("data");

            done();
          });
      }
    }).timeout(5000);
  });
  describe("## Get Projects functionality error", function () {
    it("## api/v1/projects \n\t\tshould return error when user is not logged in or Authorization header is not provided", function (done) {
      chai
        .request(server)
        .get("/api/v1/projects")
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
    it("## api/v1/projects \n\t\tshould return error when token is not valid", function (done) {
      chai
        .request(server)
        .get("/api/v1/projects")
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

/** Add Project */
describe("Projects Service Unit Tests", function () {
  beforeEach(function (done) {
    runScriptWithoutProjects().then((data) => {
      accessToken = data.accessToken;
      createdSkills = data.skillsObj;
      done();
    });
  });
  afterEach(function (done) {
    Project.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("Project collection may not exists!");
      });
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
  describe("## Add Project functionality success", function () {
    it("## api/v1/projects \n\t\tshould successfully add project ", function (done) {
      if (accessToken && createdSkills) {
        const newProject = {
          project: {
            name: "Project 1",
            description: "Project 1 description",
            skills: ["C"],
          },
        };
        chai
          .request(server)
          .post("/api/v1/projects")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProject)
          .end(function (err, res) {
            res.should.have.status(201);
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
});

/** Update Project */
describe("Projects Service Unit Tests", function () {
  beforeEach(function (done) {
    runScript().then((data) => {
      accessToken = data.accessToken;
      createdSkills = data.skillsObj;
      createdProjects = data.projectObj;
      done();
    });
  });
  afterEach(function (done) {
    Project.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("Project collection may not exists!");
      });
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
  describe("## Add Project functionality success", function () {
    it("## api/v1/projects \n\t\tshould successfully add project ", function (done) {
      if (accessToken && createdSkills && createdProjects) {
        const newProject = {
          project: {
            name: "Project 1",
            description: "This is udated Project 1 description",
            skills: ["C"],
          },
        };
        chai
          .request(server)
          .post("/api/v1/projects")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProject)
          .end(function (err, res) {
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(true);

            res.body.should.have.property("data");
            res.body.data.should.have.property("projects");
            res.body.data.projects.should.be.a("array");
            res.body.data.projects.length.should.equal(2);

            done();
          });
      }
    }).timeout(5000);
  });
});

describe("Projects Service Unit Tests", function () {
  beforeEach(function (done) {
    runScriptWithoutProjects().then((data) => {
      accessToken = data.accessToken;
      createdSkills = data.skillsObj;
      done();
    });
  });
  afterEach(function (done) {
    Project.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("Project collection may not exists!");
      });
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
  describe("## Add Project functionality error", function () {
    it("## api/v1/projects \n\t\tshould return error if skills selected for project does not belong to user", function (done) {
      if (accessToken && createdSkills) {
        const newProject = {
          project: {
            name: "Project 1",
            description: "Project 1 description",
            skills: ["C", "Java", "Python", "C++"],
          },
        };
        chai
          .request(server)
          .post("/api/v1/projects")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProject)
          .end(function (err, res) {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal(
              "You do not have skills you entered. Please select the skills you have"
            );
            done();
          });
      }
    }).timeout(5000);
  });
});

/** Add Projects */
describe("Projects Service Unit Tests", function () {
  beforeEach(function (done) {
    runScript().then((data) => {
      accessToken = data.accessToken;
      createdSkills = data.skillsObj;
      createdProjects = data.projectObj;
      done();
    });
  });

  afterEach(function (done) {
    Project.collection
      .drop()
      .then(function () {
        // success
      })
      .catch(function () {
        // error handling
        console.warn("Skills collection may not exists!");
      });
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
  describe("## Create Project functionality Error", function () {
    /**
     * Project Error Test
     */
    it("## api/v1/projects \n\t\tshould throw error if project is not provided", function (done) {
      if (accessToken && createdSkills && createdProjects) {
        const newProjectData = {};
        chai
          .request(server)
          .post("/api/v1/projects")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProjectData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Project is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/projects \n\t\tshould throw error if project is provided is empty", function (done) {
      if (accessToken && createdSkills && createdProjects) {
        const newProjectData = {
          project: {},
        };
        chai
          .request(server)
          .post("/api/v1/projects")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProjectData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Project name is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/projects \n\t\tshould throw error if project name is  empty", function (done) {
      if (accessToken && createdSkills && createdProjects) {
        const newProjectData = {
          project: {
            name: "",
            description: "hdfb",
          },
        };
        chai
          .request(server)
          .post("/api/v1/projects")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProjectData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Project name is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/projects \n\t\tshould throw error if project name is not provided ", function (done) {
      if (accessToken && createdSkills && createdProjects) {
        const newProjectData = {
          project: {
            description: "hdfb",
          },
        };
        chai
          .request(server)
          .post("/api/v1/projects")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProjectData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Project name is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/projects \n\t\tshould throw error if project description is empty", function (done) {
      if (accessToken && createdSkills && createdProjects) {
        const newProjectData = {
          project: {
            name: "hdfb",
            description: "",
          },
        };
        chai
          .request(server)
          .post("/api/v1/projects")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProjectData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Project description is required");
            done();
          });
      }
    }).timeout(5000);
    it("## api/v1/projects \n\t\tshould throw error if project descrption is not provided", function (done) {
      if (accessToken && createdSkills && createdProjects) {
        const newProjectData = {
          project: {
            name: "hdfb",
          },
        };
        chai
          .request(server)
          .post("/api/v1/projects")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(newProjectData)
          .end(function (err, res) {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("success");
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            res.body.success.should.equal(false);
            res.body.message.should.equal("Project description is required");
            done();
          });
      }
    }).timeout(5000);
  });
});
