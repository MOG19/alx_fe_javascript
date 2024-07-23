const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Don't watch the clock; do what it does. Keep going.", category: "Time" },
    { text: "You miss 100% of the shots you don't take.", category: "Opportunity" },
    { text: "The best way to predict the future is to create it.", category: "Inspiration" }
  ];
  
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
        document.getElementById('formContainer').remove();
      }
    //   Inserted new codes
      ["createElement", "appendChild"]
    });
  }
  
  // Event listener for the Show New Quote button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Add the form creation function to be triggered by a button
  const addQuoteButtonHTML = `<button id="addQuote">Add New Quote</button>`;
  document.body.insertAdjacentHTML('beforeend', addQuoteButtonHTML);
  document.getElementById('addQuote').addEventListener('click', createAddQuoteForm);
  
  // Display a random quote initially
  showRandomQuote();
  
  
  