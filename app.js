// obatining the values from queryselectors
const billAmount = document.querySelector('.bill');
const tipValueButtons = document.querySelectorAll('.cal-btn');
const tipInputValue = document.querySelector('.btn-input');
const numberOfPeopleInput = document.querySelector('.number-of-people');
const tipAmountHeading = document.querySelector('.tip-heading');
const totalHeading = document.querySelector('.total-heading');
const resetButton = document.querySelector('.reset-btn');

// selected tip value variable
let selectedTipValue = 0; 

// Function to calculate tip and total
const calculateTip = () => {
  // Get the bill amount, tip value, and number of people from the inputs
  const bill = parseFloat(billAmount.value);
  const tipValue = tipInputValue.value !== '' ? parseFloat(tipInputValue.value) : selectedTipValue;
  const numberOfPeople = parseInt(numberOfPeopleInput.value) || 1; //defualt set to 1

  // Checking if tip value is a valid number
  if (!isNaN(tipValue)) {
    // Update the selected tip value if a button is clicked
    if (selectedTipValue === 0) {
      selectedTipValue = tipValue;
    }

    // Check if bill amount is a valid number
    if (!isNaN(bill) && bill >= 0) {
      // Calculate tip and total per person
      const tipAmount = (bill * selectedTipValue) / 100;
      const totalAmount = bill + tipAmount;
      const tipPerPerson = tipAmount / numberOfPeople;
      const totalPerPerson = totalAmount / numberOfPeople;

      // Displaying the results
      tipAmountHeading.textContent = `$${selectedTipValue.toFixed(2)}`;
      totalHeading.textContent = `$${totalPerPerson.toFixed(2)} per person`;
      return;
    }
  }

  // Display an error or handle invalid input
  tipAmountHeading.textContent = 'Tip';
  totalHeading.textContent = 'Total per person';
};

// Event listener for tip buttons
tipValueButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Set the custom input value to an empty string when a tip button is clicked
    tipInputValue.value = '';
    
    // Update the selected tip value
    selectedTipValue = parseFloat(button.textContent);
    
    // Calculate tip and total
    calculateTip();
  });
});

tipInputValue.addEventListener('input', () => {
  // Reset the selected tip value
  selectedTipValue = 0;
  
  // Calculate tip and total
  calculateTip();
});

// Event listener for number of people input
numberOfPeopleInput.addEventListener('input', () => {
  // Calculate tip and total
  calculateTip();
});

// Event listener for reset button
resetButton.addEventListener('click', () => {
  // Reset input values and results to default
  billAmount.value = '';
  tipInputValue.value = '';
  numberOfPeopleInput.value = '';
  selectedTipValue = 0;
  tipAmountHeading.textContent = '$0.00';
  totalHeading.textContent = '$0.00';
});
