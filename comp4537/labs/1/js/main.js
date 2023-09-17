// Note constructor
function Note() {
  this.textArea = document.createElement('textarea');
  this.removeButton = document.createElement('button');
  this.removeButton.textContent = 'Remove';
  this.removeButton.onclick = this.remove.bind(this);
}

// Remove note from DOM and localStorage
Note.prototype.remove = function () {
  const notesContainer = document.getElementById('notes-container');
  notesContainer.removeChild(this.textArea);
  notesContainer.removeChild(this.removeButton);

  const notes = this.getNotesFromStorage();
  const updatedNotes = notes.filter(note => note !== this.textArea.value);
  this.saveNotesToStorage(updatedNotes);
};

// Save note content to localStorage
Note.prototype.saveToStorage = function () {
  const notes = this.getNotesFromStorage();
  notes.push(this.textArea.value);
  this.saveNotesToStorage(notes);
};

// Retrieve notes from localStorage
Note.prototype.getNotesFromStorage = function () {
  const savedNotes = localStorage.getItem('notes');
  return savedNotes ? JSON.parse(savedNotes) : [];
};

// Save notes to localStorage
Note.prototype.saveNotesToStorage = function (notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
};

// Initialize the Writer page
function initializeWriter() {
  const notesContainer = document.getElementById('notes-container');
  const addNoteButton = document.getElementById('add-note');
  const lastSaved = document.getElementById('last-saved');

  // Retrieve existing notes from localStorage and populate text areas
  const existingNotes = new Note().getNotesFromStorage();
  existingNotes.forEach(noteText => {
      const note = new Note();
      note.textArea.value = noteText;
      notesContainer.appendChild(note.textArea);
      notesContainer.appendChild(note.removeButton);
  });

  // Add note button click handler
  addNoteButton.addEventListener('click', () => {
      const note = new Note();
      notesContainer.appendChild(note.textArea);
      notesContainer.appendChild(note.removeButton);
  });

  // Save notes to localStorage every 2 seconds
  setInterval(() => {
      const note = new Note();
      note.saveToStorage();
      lastSaved.textContent = `Last saved: ${new Date().toLocaleTimeString()}`;
  }, 2000);
}

// Initialize the Reader page
function initializeReader() {
  const notesContainer = document.getElementById('notes-container');
  const lastRetrieved = document.getElementById('last-retrieved');

  // Retrieve and display notes from localStorage every 2 seconds
  setInterval(() => {
      const notes = new Note().getNotesFromStorage();
      notesContainer.innerHTML = ''; // Clear previous notes
      notes.forEach(noteText => {
          const noteDiv = document.createElement('div');
          noteDiv.textContent = noteText;
          notesContainer.appendChild(noteDiv);
      });
      lastRetrieved.textContent = `Last retrieved: ${new Date().toLocaleTimeString()}`;
  }, 2000);
}

// Determine which page is being loaded and initialize accordingly
if (document.title === 'Writer') {
  initializeWriter();
} else if (document.title === 'Reader') {
  initializeReader();
}
