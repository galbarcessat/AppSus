import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
// import { storageService } from '../../../services/storage.service.js'


const demoNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: _makeRandBackgroundColor()
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n105',
        createdAt: 1342222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: _makeRandBackgroundColor()
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n104',
        createdAt: 1112244,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: _makeRandBackgroundColor()
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    // {
    //     id: 'n102',
    //     type: 'NoteImg',
    //     isPinned: false,
    //     info: {
    //         url: 'http://some-img/me',
    //         title: 'Bobi and Me'
    //     },
    //     style: {
    //         backgroundColor: '#00d'
    //     }
    // },
    // {
    //     id: 'n103',
    //     type: 'NoteTodos',
    //     isPinned: false,
    //     info: {
    //         title: 'Get my stuff together',
    //         todos: [
    //             { txt: 'Driving license', doneAt: null },
    //             { txt: 'Coding power', doneAt: 187111111 }
    //         ]
    //     }
    // }
]

const NOTES_KEY = 'notesDB'
_createNotes()

export const noteService = {
    query,
    remove,
    save,
    get,
    getEmptyNote
}

function query() {
    return storageService.query(NOTES_KEY).then(notes => {
        return notes
    })
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function get(noteId) {
    return storageService.get(STORAGE_KEY, noteId).then((note) => {
        return note
    })
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

// function get(noteId) {
//     return storageService.get(NOTES_KEY, noteId)
//         .then(note => {
//             note = _setNextPrevNoteId(note)
//             return note
//         })
// }

function getEmptyNote() {
    return {
        id: '',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: _makeRandBackgroundColor()
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = _getNotes()
        utilService.saveToStorage(NOTES_KEY, notes)
    }
}

function _getNotes() {
    return demoNotes
}


function _makeNoteId(length = 4) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    text += possible.charAt(Math.floor(Math.random() * possible.length))
    for (var i = 1; i < length; i++) {
        text += Math.floor(Math.random() * 10)
    }
    return text
}

function _makeRandBackgroundColor() {
    const colors = ['#D3BFDB', '#D4E3ED', '#F39F76', '#FAAFA7', '#EFEFF1', '#F6E2DD', '#E2F5D3', '#D3BFDB']
    return colors[Math.floor(Math.random() * colors.length)]
}






