// Declare the notes variable in a broader scope
const notes = [];

document.addEventListener("DOMContentLoaded", function () {
  // Function to save notes to local storage
  function saveNotes() {
    // Select all textareas on the page
    const textareas = document.querySelectorAll("textarea");

    // Update the notes array with the content of textareas
    notes.length = 0; // Clear the array
    textareas.forEach((textarea) => {
      notes.push(textarea.value);
    });

    // Save notes to local storage
    localStorage.setItem("notes", JSON.stringify(notes));

    // Update the timestamp
    const timestamp = new Date().toLocaleString();
    localStorage.setItem("timestamp", timestamp);

    // Display the timestamp
    document.getElementById("lastSaved").textContent = "Last Saved: " + timestamp;
  }

  // Function to load notes from local storage and populate text areas
  function loadNotes() {
    const notesFromStorage = JSON.parse(localStorage.getItem("notes"));

    // Select the "notes" div where notes will be added
    const notesDiv = document.getElementById("notes");

    // Clear the div before adding the notes
    notesDiv.innerHTML = '';

    // Check if there are notes in local storage
    if (Array.isArray(notesFromStorage)) {
      // Iterate over the stored notes and create textareas for them
      notesFromStorage.forEach((noteText) => {
        const textarea = document.createElement("textarea");
        textarea.value = noteText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
          // Remove the textarea and its contents from local storage
          const indexToRemove = notes.indexOf(noteText);
          if (indexToRemove !== -1) {
            notes.splice(indexToRemove, 1);
            saveNotes();
          }
          // Remove the textarea and the remove button from the DOM
          notesDiv.removeChild(textarea);
          notesDiv.removeChild(removeButton);
        });

        notesDiv.appendChild(textarea);
        notesDiv.appendChild(removeButton);
      });
    }
  }


  // Load existing notes from local storage
  loadNotes();

  // Add note button
  document.getElementById("addNote").addEventListener("click", function () {
    const textarea = document.createElement("textarea");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      // Remove the textarea and its contents from local storage
      const indexToRemove = notes.indexOf(textarea.value);
      if (indexToRemove !== -1) {
        notes.splice(indexToRemove, 1);
        saveNotes();
      }
      // Remove the textarea and the remove button from the DOM
      notesDiv.removeChild(textarea);
      notesDiv.removeChild(removeButton);
    });

    const notesDiv = document.getElementById("notes");
    notesDiv.appendChild(textarea);
    notesDiv.appendChild(removeButton);

    saveNotes();
  });

  // Save notes to local storage every 2 seconds
  setInterval(saveNotes, 2000);
});