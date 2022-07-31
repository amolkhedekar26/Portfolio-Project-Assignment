const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors");

const corsHeader = require("./middlewares/corsHeader");
const isAuthenticated = require("./middlewares/isAuthenticated");
const { handleErrorResponse } = require("./utils/response");

class App {
  constructor() {
    this.app = express();

    this.configureEnv();
    this.setUpLogger();
    this.setupDB();
    this.setUpMiddlewares();
    this.setupRoutes();
    this.addErrorHandler();
    this.startServer();
  }

  configureEnv() {
    dotenv.config();
  }

  setUpLogger() {
    this.app.use(morgan("dev"));
  }

  setupDB() {
    require("./db/mongoDB");
  }

  setUpMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    // this.app.use(corsHeader);
    // We can use this middleware if we want to enable CORS
    this.app.use(cors());
  }

  setupRoutes() {
    // Register the User (Authentication) routes
    this.app.use("/api/v1/users", require("./components/user/User.router"));
    // Register the Skills routes
    this.app.use(
      "/api/v1/skills",
      isAuthenticated,
      require("./components/skills/Skills.router")
    );
    // Register the Project routes
    this.app.use(
      "/api/v1/projects",
      isAuthenticated,
      require("./components/project/Project.router")
    );
    // Register the Profile routes
    this.app.use(
      "/api/v1/profiles",
      isAuthenticated,
      require("./components/profile/Profile.router")
    );
    // this.app.use("/api/v1/auth", require("./routes/auth"));
  }

  addErrorHandler() {
    this.app.use(async (req, res, next) => {
      next(new createError.NotFound("This endpoint does not exist"));
    });

    this.app.use((err, req, res, next) => {
      res.status(err.status || 500);
      //   res.send({
      //     result: {
      //       type: "Error",
      //       status: err.status || 500,
      //       message: err.message,
      //     },
      //   });
      // console.log(err);
      handleErrorResponse(res, err);
    });
  }

  startServer() {
    this.PORT = process.env.PORT || 3000;
    if (process.env.NODE_ENV === "test") {
      this.PORT = process.env.TEST_PORT || 3001;
    }
    this.app.listen(this.PORT || 3000, () => {
      console.log(`Server started at http://localhost:${this.PORT}`);
    });
  }
}

module.exports = App;
