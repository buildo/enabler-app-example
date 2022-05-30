const express = require("express");
const app = express();
const port = process.env.PORT;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.post("/hello", (req, res) => {
  res.json({ say: `Hi ${req.body.username}, this is the server speaking :) ` });
});

app.listen(port, () =>
  console.log("Example app listening on http://localhost:" + port)
);
