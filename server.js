const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const transactions = [];

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "Sacchi Pay",
    mode: "DEMO ONLY"
  });
});

app.post("/api/orders", (req, res) => {
  const { amount, currency, country, method } = req.body;

  if (
    typeof amount !== "number" ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    !currency ||
    !country ||
    !method
  ) {
    return res.status(400).json({
      error: "Please provide valid payment details."
    });
  }

  const transaction = {
    id: "SACCHI-" + Date.now(),
    amount,
    currency,
    country,
    method,
    status: "DEMO_PENDING",
    createdAt: new Date().toISOString()
  };

  transactions.push(transaction);

  res.status(201).json(transaction);
});

app.get("/api/transactions", (req, res) => {
  res.json(transactions);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sacchi Pay running on port ${PORT}`);
});
