const express = require("express");
const connectDb = require("./Database/Db");
const cors = require("cors");
const app = express();
const router = require("./Router/UserRouter");
const cookieparser = require("cookie-parser");

app.use(cors()); // Ensure CORS is enabled before routes
app.use(cookieparser()); // Use cookie-parser before any route
app.use(express.json()); // Use express.json() for JSON parsing

app.get('/', (req, res) => {
  res.send("hello");
});

app.use('/hirednest/v1', router);

connectDb().then(() => {
  const port = process.env.PORT || 3002;
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
})
.catch((err) => {
  console.error("Error connecting to database:", err);
});
