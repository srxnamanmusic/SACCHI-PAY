const payButton = document.getElementById("payButton");
const message = document.getElementById("message");

payButton.addEventListener("click", async () => {
  const amount = Number(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;
  const country = document.getElementById("country").value;
  const method = document.getElementById("method").value;

  if (!country) {
    message.textContent = "Please select your country.";
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    message.textContent = "Please enter a valid amount.";
    return;
  }

  payButton.disabled = true;
  message.textContent = "Creating demo transaction...";

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        currency,
        country,
        method
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Transaction failed.");
    }

    message.textContent =
      "Demo transaction created! ID: " + result.id;
  } catch (error) {
    message.textContent = error.message;
  } finally {
    payButton.disabled = false;
  }
});
