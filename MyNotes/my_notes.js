function dragStart(){
  var items = document.querySelectorAll('.note');
  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    var draggie = new Draggabilly( item, {
      containment: 'html'
    });
  }
};
setTimeout(dragStart,1000);


function addNote(){
    const template = document.querySelector('#noteTemplate');
    var clone = document.importNode(template.content, true);
    clone.className = "note";
    document.querySelector('#content').appendChild(clone);
    dragStart();
}


function deleteNote(element){
    element.remove();
}


function saveNotes(){
    var titles = document.getElementsByClassName('noteTitle');
    var content = document.getElementsByClassName('noteBody');
    var allElements = document.getElementsByClassName('note');

    var positions =[];
    [...document.querySelectorAll('.note')].forEach(function(note) {
        positions.push(note.getBoundingClientRect());
    });

    var notes = [];
    for(var index = 0; index < titles.length; index++){
        notes[index] = {
        title: titles[index].value,
        content: content[index].value,
        position_top: positions[index].top,
        position_left: positions[index].left
        };
    }

    localStorage.setItem('allNotes', JSON.stringify(notes));
}
setInterval(saveNotes, 1000);


function restoreNotes(){

    var notes = JSON.parse(localStorage.getItem('allNotes'));

    notes.forEach(function(note){
        const template = document.querySelector('#noteTemplate');
        var clone = document.importNode(template.content, true);

        clone.querySelector('.noteTitle').value = note.title;
        clone.querySelector('.noteBody').textContent = note.content;

        clone.querySelector('.note').style.top = note.position_top+'px';
        clone.querySelector('.note').style.left = note.position_left+'px';

        document.querySelector('#content').appendChild(clone);
    });
    dragStart();
}window.onload = restoreNotes;