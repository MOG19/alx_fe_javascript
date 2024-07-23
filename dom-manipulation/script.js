// script.js

// Load quotes from local storage or use default quotes if none exist
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Don't watch the clock; do what it does. Keep going.", category: "Time" },
    { text: "You miss 100% of the shots you don't take.", category: "Opportunity" },
    { text: "The best way to predict the future is to create it.", category: "Inspiration" }
  ];
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
  }
  
  // Function to create and display a form to add a new quote
  function createAddQuoteForm() {
    const formContainer = document.getElementById('formContainer');
    if (formContainer) return; // Form already exists
  
    const formHTML = `
      <div id="formContainer">
        <h2>Add a New Quote</h2>
        <form id="addQuoteForm">
          <label for="quoteText">Quote:</label><br>
          <input type="text" id="quoteText" name="quoteText" required><br>
          <label for="quoteCategory">Category:</label><br>
          <input type="text" id="quoteCategory" name="quoteCategory" required><br><br>
          <button type="submit">Add Quote</button>
        </form>
      </div>
    `;
  
    document.body.insertAdjacentHTML('beforeend', formHTML);
  
    // Add event listener to handle form submission
    document.getElementById('addQuoteForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const quoteText = document.getElementById('quoteText').value;
      const quoteCategory = document.getElementById('quoteCategory').value;
      if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes(); // Save to local storage
        document.getElementById('formContainer').remove();
        alert('New quote added successfully!');
      }
    });
  }
  
  // Function to export quotes to a JSON file
  function exportQuotesToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes(); // Save to local storage
          alert('Quotes imported successfully!');
          showRandomQuote(); // Update displayed quote
        } else {
          alert('Invalid file format. Please upload a valid JSON file.');
        }
      } catch (error) {
        alert('Error reading file. Please upload a valid JSON file.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener for the Show New Quote button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Add the form creation function to be triggered by a button
  const addQuoteButtonHTML = `<button id="addQuote">Add New Quote</button>`;
  document.body.insertAdjacentHTML('beforeend', addQuoteButtonHTML);
  document.getElementById('addQuote').addEventListener('click', createAddQuoteForm);
  
  // Add export quotes button
  const exportButtonHTML = `<button id="exportQuotes">Export Quotes</button>`;
  document.body.insertAdjacentHTML('beforeend', exportButtonHTML);
  document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJson);
  
  // Add import quotes file input
  const importFileHTML = `<input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />`;
  document.body.insertAdjacentHTML('beforeend', importFileHTML);
  
  // Display a random quote initially
  showRandomQuote();
  