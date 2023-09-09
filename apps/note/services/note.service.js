import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
// import { storageService } from '../../../services/storage.service.js'



const demoNotes = [
    {
        id: 'n101',
        createdAt: Date.now(),
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
        createdAt: Date.now(),
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
        createdAt: Date.now(),
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
        id: 'n102',
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRWWl0PO7qFWCsi9Wvf57JmYbfLEWqWWx1mBqinse1nEvEnyomeU-Uuq_3snC1fh_nr50svczyRaZbOvBk",
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: _makeRandBackgroundColor()
        }
    },
    {
        id: 'n111',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: _makeRandBackgroundColor()
        }
    },
    {
        id: 'n109',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRWWl0PO7qFWCsi9Wvf57JmYbfLEWqWWx1mBqinse1nEvEnyomeU-Uuq_3snC1fh_nr50svczyRaZbOvBk",
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: _makeRandBackgroundColor()
        }
    },
    // {
    //     id: 'n110',
    //     type: 'NoteImg',
    //     isPinned: false,
    //     info: {
    //         url: "https://www.youtube.com/watch?v=ymg9_4YHKVQ",
    //         title: 'Bobi and Me'
    //     },
    //     style: {
    //         backgroundColor: _makeRandBackgroundColor()
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

const STORAGE_KEY = 'notesDB'
_createNotes()



function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt))
            }
            return notes
        })
}

function getDefaultFilter() {
    console.log('hi')
    return { txt: '' }
}


function changeNoteBGC(note, bgc) {
    console.log('bgc:', bgc)
    note.style.backgroundColor = bgc
    return save(note)
        .then(() => {
            return note // resolving with the updated note
        })
}
// function changeNoteBGC(note, bgc) {
//     console.log('bgc:', bgc)
//     note.style.backgroundColor = bgc
//     save(note).then
//     return new Promise((resolve, reject) => {
//         resolve(note)
//         console.log('notefromservice:', note)
//     })
// }

function save(note) {
    if (note.id) {
        return storageService.put(STORAGE_KEY, note)
    } else {
        return storageService.post(STORAGE_KEY, note)
    }
}

function get(noteId) {
    return storageService.get(STORAGE_KEY, noteId).then((note) => {
        return note
    })
}

function remove(noteId) {
    return storageService.remove(STORAGE_KEY, noteId)
}

function getEmptyNote() {
    return {
        id: '',
        createdAt: Date.now(),
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
    let notes = utilService.loadFromStorage(STORAGE_KEY)
    if (!notes || !notes.length) {
        notes = _getNotes()
        utilService.saveToStorage(STORAGE_KEY, notes)
    }
}

function _getNotes() {
    return demoNotes
}


function _makeRandBackgroundColor() {
    const colors = ['#D3BFDB', '#D4E3ED', '#F39F76', '#FAAFA7', '#EFEFF1', '#F6E2DD', '#E2F5D3', '#D3BFDB']
    return colors[Math.floor(Math.random() * colors.length)]
}

function getNoteInfoDataByNoteType(noteType, noteValue) {
    switch (noteType) {
        case "NoteTxt": {
            return { txt: noteValue }
        }

        case "NoteImg": {
            return { url: noteValue }
        }

        default: {
            return { txt: noteValue }
        }
    }
}


export const noteService = {
    query,
    remove,
    save,
    get,
    getEmptyNote,
    changeNoteBGC,
    getDefaultFilter,
    getNoteInfoDataByNoteType
}


