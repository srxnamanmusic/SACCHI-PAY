const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "Sacchi Pay",
    mode: "DEMO ONLY"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sacchi Pay running on port ${PORT}`);
});
