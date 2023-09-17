document.addEventListener("DOMContentLoaded", function () {
  function retrieveNotes() {
    const notesFromStorage = JSON.parse(localStorage.getItem("notes")) || [];

    const notesDiv = document.getElementById("notes");
    notesDiv.innerHTML = '';

    notesFromStorage.forEach((noteText) => {
        const noteParagraph = document.createElement("p");
        noteParagraph.textContent = noteText;
        notesDiv.appendChild(noteParagraph);
    });

    const timestamp = new Date().toLocaleString();
    document.getElementById("lastRetrieved").textContent = "Last Retrieved: " + timestamp;
}

setInterval(retrieveNotes, 2000);

retrieveNotes();


  setInterval(retrieveNotes, 2000);
});
