// - - - - - - - - - - - - - - - - - - - - - -//
//  (1)          V A R I A B A L E            //
// - - - - - - - - - - - - - - - - - - - - - -//
//get note list DIV
const noteList = document.querySelector("#note-list")






// - - - - - - - - - - - - - - - - - - - - - -//
//   (2)      E V E N T  L I S T E N E R      //
// - - - - - - - - - - - - - - - - - - - - - -//
eventListeners()
// form submission
function eventListeners() {
    document.querySelector('#form').addEventListener('submit', newNote)
// event listener in order to remove li
    document.querySelector('#note-list').addEventListener('click', removeNote)
// get data frin kicakstorage onloaded
    document.addEventListener("DOMContentLoaded", localStorageOnload)
}







// - - - - - - - - - - - - - - - - - - - - - -//
//   (3)           F U N C T I O N            //
// - - - - - - - - - - - - - - - - - - - - - -//
//add new note to the list
function newNote(e) {
    //prevent to # action of form
        e.preventDefault()
        //get textarea note value
        const note = document.querySelector('#note').value
        //create <Li></Li> Tag List
        const li = document.createElement('li')
        //add note to Li Tag list
        li.appendChild(document.createTextNode(note))

    // - - - - - - - - - - - - - - - - - - - - - - -
        //add remove btn to li +++++++++++++
    // - - - - - - - - - - - - - - - - - - - - - - -

        //add li to the note list
        const finalNote = noteList.appendChild(li)
        //add CSS style to Li list
        finalNote.classList = 'li-style'
        //create remove element By X word
        const removeBtn = document.createElement('a')
        removeBtn.textContent = 'X'
        li.appendChild(removeBtn)
        removeBtn.classList = 'remove-note'

        //remove note afterr submit
        this.reset()

        //
        addNoteToLocalStorage(note)

 
}

//Create new function for REMOVE ACTION
function removeNote(e) {
    //remove notes (get X part of li) by Deligation
    if(e.target.classList.contains('remove-note')){
            e.target.parentElement.remove()
    }
    //remove note from the local storage
    removeNoteLocalStorage(e.target.parentElement.textContent)
}

// - - - - - - - - - - - - - - - - - - - - - -//
//   (4)      L O C A L   S T O R A G E       //
// - - - - - - - - - - - - - - - - - - - - - -//

//add note to the Local Storage
function addNoteToLocalStorage(note){
    // get the notes from localStorage 
    const notes = getNotesFromLocalStorage()
    // add new note to the notes array
    notes.push(note)
    // add new notes Array to the localStorage
    localStorage.setItem('notes', JSON.stringify(notes))
}

//get notes from local storage
function getNotesFromLocalStorage(){
    let notes;
    // get previous notes from localStorage
    let getFromLS = localStorage.getItem('notes');
    if (getFromLS === null) {
        // if not exist create empty array
        notes = []
    } else {
        // if exist convert to the array 
        notes = JSON.parse(getFromLS)
    }
    
    return notes
}

//get data from local sorage Onload
function localStorageOnload() {
    const notes = getNotesFromLocalStorage();
    //Print each Item of array
    notes.forEach(function(note) {
                //create <Li></Li> Tag List
                const li = document.createElement('li')
                //add note to Li Tag list
                li.appendChild(document.createTextNode(note))
        
                // - - - - - - - - - - - - - - - - - - - - - - -
                    //add remove btn to li +++++++++++++
                // - - - - - - - - - - - - - - - - - - - - - - -
            
                //add li to the note list
                const finalNote = noteList.appendChild(li)
                //add CSS style to Li list
                finalNote.classList = 'li-style'
                //create remove element By X word
                const removeBtn = document.createElement('a')
                removeBtn.textContent = 'X'
                li.appendChild(removeBtn)
                removeBtn.classList = 'remove-note'
    });
}

//remove noe from local storage
function removeNoteLocalStorage(noteContent){
    //remove X from Last of Each Item
    const noteDelete = noteContent.substring(0 , noteContent.length - 1)
    
    // get notes from local storage
    const notesFromLs =  getNotesFromLocalStorage()

    notesFromLs.forEach(function (note, index) {
        if (note === noteDelete) {
            notesFromLs.splice(index, 1)
        }
    });
    //set new array of notes to the local storage
    localStorage.setItem('notes', JSON.stringify(notesFromLs))

}

