const mongoose = require("mongoose");

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(`opps error occured ${err}`);
  });
