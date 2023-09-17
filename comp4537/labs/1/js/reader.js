document.addEventListener("DOMContentLoaded", function () {
  // Function to retrieve and display notes
  function retrieveNotes() {
    // Retrieve notes from local storage
    const notesFromStorage = JSON.parse(localStorage.getItem("notes")) || [];

    // Select the "notes" div where notes will be displayed
    const notesDiv = document.getElementById("notes");
    notesDiv.innerHTML = '';

    // Iterate over the retrieved notes and display them as paragraphs
    notesFromStorage.forEach((noteText) => {
        const noteParagraph = document.createElement("p");
        noteParagraph.textContent = noteText;
        notesDiv.appendChild(noteParagraph);
    });

    // Update the last retrieved timestamp
    const timestamp = new Date().toLocaleString();
    document.getElementById("lastRetrieved").textContent = "Last Retrieved: " + timestamp;
}

// Retrieve and display notes every 2 seconds
setInterval(retrieveNotes, 2000);

// Initial retrieval and display of notes when the page loads
retrieveNotes();


  // Retrieve and display notes every 2 seconds
  setInterval(retrieveNotes, 2000);
});
