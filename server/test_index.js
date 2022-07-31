const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors");

const corsHeader = require("./middlewares/corsHeader");
const isAuthenticated = require("./middlewares/isAuthenticated");
const { handleErrorResponse } = require("./utils/response");

dotenv.config();

const app = express();

require("./db/mongoDB");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(corsHeader);
// We can use this middleware if we want to enable CORS
app.use(cors());

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// Register the User (Authentication) routes
app.use("/api/v1/users", require("./components/user/User.router"));
// Register the Skills routes
app.use(
  "/api/v1/skills",
  isAuthenticated,
  require("./components/skills/Skills.router")
);
// Register the Project routes
app.use(
  "/api/v1/projects",
  isAuthenticated,
  require("./components/project/Project.router")
);
// Register the Profile routes
app.use(
  "/api/v1/profiles",
  isAuthenticated,
  require("./components/profile/Profile.router")
);

app.use(async (req, res, next) => {
  next(new createError.NotFound("This endpoint does not exist"));
});

app.use((err, req, res, next) => {
  // res.status(err.status || 500);
  //   res.send({
  //     result: {
  //       type: "Error",
  //       status: err.status || 500,
  //       message: err.message,
  //     },
  //   });

  err.status = err.status || 500;
  if (err.name === "MongooseError") {
    err.status = 500;
    err.message = "Oops! Something went wrong. Please try again later";
  }

  handleErrorResponse(res, err);
});

let PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === "test") {
  PORT = process.env.TEST_PORT || 3001;
}
app.listen(PORT || 3000, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

module.exports = app;
