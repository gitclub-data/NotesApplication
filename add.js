const additembutton = document.querySelector("#add-item")
const editor = document.querySelector(".editor-textarea")

// delete notes
let deletebutton = function (index) {
    // console.log(index)
    notes = localStorage.getItem('Notes')
    color = localStorage.getItem('color')
    if (notes == null) {
        notesobj = []
        colorobj = []
    }
    else {
        notesobj = JSON.parse(notes);
        colorobj = JSON.parse(color);
    }
    notesobj.splice(index, 1)
    colorobj.splice(index, 1)
    localStorage.setItem('Notes', JSON.stringify(notesobj));
    localStorage.setItem('color', JSON.stringify(colorobj));
    shownotes();
}

function pinning(element) {
    color = localStorage.getItem('color')
    if (notes == null) {
        colorobj = []
    }
    else {
        colorobj = JSON.parse(color);
    }
    colorobj[element.id] = !colorobj[element.id]
    localStorage.setItem('color', JSON.stringify(colorobj));
    shownotes()
}


// showing notes
const shownotes = function () {
    notes = localStorage.getItem('Notes')
    color = localStorage.getItem('color')
    if (notes == null) {
        notesobj = []
        colorobj = []
    }
    else {
        notesobj = JSON.parse(notes);
        colorobj = JSON.parse(color);
    }
    let note = '';
    notesobj.forEach(function (element, index) {
        let pinned = ''
        if (colorobj[index] == false) {
            pinned = 'not-pining'
            pin = 'not-pin'
        }
        else {
            pinned = 'pining'
            pin = 'pin'
        }
        note += `<div class="Note ${pinned}">
        <div class="Note-heading">
            <div>Note ${index + 1}</div>
            <button class="${pin}" id="${index}" onclick="pinning(this)"></button>
        </div>
        <div class="Note-writer">
          <p>${element}</p>
        </div>
        <div class="Note-Button">
            <input onclick="deletebutton(this.id)" type="button" value="Delete Note" class="item delete-item" id="${index}" />
        </div>
    </div>`;
    });
    let notespack = document.querySelector('.Notes');
    if (notesobj.length == 0) {
        note = `<p class="para">Nothing To Show!Use Add Notes to Add Some Notes</p>`
    }
    notespack.innerHTML = note
    // deletebutton=document.querySelectorAll('.delete-item')
    // console.log(deletebutton)
}
shownotes();
var notenumber = 1
// add notes to local
additembutton.addEventListener("click", function (e) {
    notes = localStorage.getItem('Notes')
    color = localStorage.getItem('color')
    if (notes == null) {
        notesobj = []
        colorobj = []
    }
    else {
        notesobj = JSON.parse(notes);
        colorobj = JSON.parse(color);
    }
    if (editor.value != "") {
        notesobj.push(editor.value);
        colorobj.push(false)
        // notesobj.forEach(
        //     function(){
        //         console.log("hello")
        //     })
        localStorage.setItem('Notes', JSON.stringify(notesobj));
        localStorage.setItem('color', JSON.stringify(colorobj));
        editor.value = ""
        shownotes();
    }
});

// deletebutton.forEach(function(element){
//     element.addEventListener("click",function(e){
//         console.log(this.id)
//         notes=localStorage.getItem('Notes')
//         if(notes==null){
//             notesobj=[]
//         }
//         else{
//             notesobj=JSON.parse(notes);
//         }
//         notesobj.splice(e.target.id,1)
//         // localStorage.setItem('Notes',JSON.stringify(notesobj));
//         shownotes();
//     });
// });

let search = document.querySelector(".searching-text");
search.addEventListener("input", function () {
    // console.log(search.value)
    notes = localStorage.getItem('Notes')
    if (notes == null) {
        notesobj = []
    }
    else {
        notesobj = JSON.parse(notes);
    }
    if (notesobj.length != 0) {
        let Note = document.querySelectorAll('.Note')
        Array.from(Note).forEach(function (element) {
            let cardtext = element.getElementsByTagName('p')[0].innerText
            if (cardtext.includes(search.value.toLowerCase())) {
                element.style.display = "grid"
            }
            else {
                element.style.display = "none"
            }
        })
    }
})
