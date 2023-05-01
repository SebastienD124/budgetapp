const budgetForm = document.getElementById('budget-form');
const categoryForm = document.getElementById('category-form');
const budgetAmountInput = document.getElementById('budget-amount');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const budgetChartCanvas = document.getElementById('budget-chart');
 
let budgetAmount = 0;
let categories = [];
let amounts = [];
 
budgetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  budgetAmount = parseFloat(budgetAmountInput.value);
  budgetForm.classList.add('d-none');
  categoryForm.classList.remove('d-none');
  budgetChartCanvas.classList.remove('d-none');
  createChart();
});
 
categoryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);
  if (amount > budgetAmount) {
    alert("You're going over your budget!");
    return;
  }
  categories.push(category);
  amounts.push(amount);
  budgetAmount -= amount;
  categoryInput.value = '';
  amountInput.value = '';
  updateChart();
});
 
let chart;
function createChart() {
  chart = new Chart(budgetChartCanvas, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0','#5eff33','#ff3333','#fb6c0f']
      }]
    }
  });
}
 
function updateChart() {
  chart.data.labels = categories;
  chart.data.datasets[0].data = amounts;
  chart.update();
}