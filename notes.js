console.log('starting notes');
const fs = require('fs');

var fetchNote = () => {
    try {
        var prevnotes = fs.readFileSync('notes-data.json');
        var notes = JSON.parse(prevnotes);
        return notes;
    }
    catch (e) {
        return [];
    }
}
var write = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}
var addNote = (title, body) => {

    var notes = [];
    var note = {
        title,
        body
    }
    notes = fetchNote();
    var duplicateNotes = notes.filter((note) => {
        return note.title == title;
    });
    if (duplicateNotes.length == 0) {
        console.log('adding note ' + title);
        notes.push(note);
        write(notes);
    }
    else {
        console.log('Cannot add note ' + title + ' note with same title already exist');
    }

}

var removeNote = (title) => {
    
    var notes = fetchNote();
    var filteredNotes = notes.filter((note) => {
        return note.title != title;
    });
    write(filteredNotes);
    if(filteredNotes.length==notes.length){
        console.log('Note ' + title+' not found!');
    }
    else{
        console.log('Note removed ' + title);
    }
}

var listNote = () => {
    console.log('Listing all notes');
    var notes = fetchNote();
    console.log('printing '+notes.length+' notes');
    console.log('--');
    notes.forEach(note => {
        console.log(note.title)
        console.log(note.body);
        console.log('--');
        
    });
    // console.log(notes);
}

var readNote = (title) => {
    var notes = fetchNote();
    var Askednote=notes.filter((note) => {
        return note.title == title;
    });
    if(Askednote.length==0){
        console.log('note not found');
    }
    else console.log(Askednote);
}

module.exports = {
    addNote,
    removeNote,
    listNote,
    readNote
};