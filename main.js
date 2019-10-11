// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  //Hide results
    document.getElementById('results').style.display = 'none';
    //show results
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  console.log("Calculating...");
  // UI Vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    //show results
    document.getElementById('results').style.display = 'block';
    
    //hide loader
    document.getElementById('loading').style.display = 'none';
    
  } else {
    showError("Please check your numbers");
  }

  function showError(error) {
      //hide results
    document.getElementById('results').style.display = 'none';
    
    //hide loader
    document.getElementById('loading').style.display = 'none';

    //1. create a div
    const errorDiv = document.createElement("div");

    //4.get elements for display position
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    //2.Add class to the div
    errorDiv.className = "alert alert-danger";

    //3.Add text (create text and append to div)
    errorDiv.appendChild(document.createTextNode(error));

    //5. Insert error above heading
    card.insertBefore(errorDiv, heading);

    //6. desaparecer el error 3 seconds
    setTimeout(clearError, 3000);

    //clear error
    function clearError() {
      document.querySelector(".alert").remove();
    }
  }
}
