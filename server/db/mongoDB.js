const mongoose = require("mongoose");

const ENVVAR = process.env.NODE_ENV;

let mongouri = "";
if (ENVVAR === "test") {
  mongouri = process.env.MONGOURI_TEST;
}
if (ENVVAR === "dev") {
  mongouri = process.env.MONGOURI_DEV;
}

mongoose
  .connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    if (ENVVAR === "dev") {
      console.log("MongoDB connected");
      console.log("Mongouri: ", mongouri);
    }
  })
  .catch((err) => {
    if (ENVVAR === "dev") {
      console.log(err.message);
    }
  });

mongoose.connection.on("connected", () => {
  if (ENVVAR === "dev") {
    console.log("Mongoose connected to database");
  }
});

mongoose.connection.on("error", (err) => {
  if (ENVVAR === "dev") {
    console.log(err.message);
  }
});

mongoose.connection.on("disconnected", () => {
  if (ENVVAR === "dev") {
    console.log("\nMongoose disconnected");
  }
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
