import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);
  const [notes, setNotes] = useState(null)
  // const [pinnedNotes, setPinnedNotes] = useState(null)
  // const [unPinnedNotes, setUnPinnedNotes] = useState(null)

  useEffect(() => {
    noteService.query().then((notes) => {
      setNotes(notes)
      // console.log('notes:', notes)
      setIsLoadingNotes(false);
    })
  }, [])

  useEffect(() => {
    console.log('notes:', notes)
  }, [notes])

  //removing note button, passing it forward to the child in the return
  function onRemoveNote(noteId) {
    console.log('noteId:', noteId)
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        // showSuccessMsg(`Note Removed! ${noteId}`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Problem with removing note - try again')
      })
  }


  function onEditNote(note) {
    // const notedIdx = notes.findIndex(noteFromDB => noteFromDB.id === note.id)
    // const notesCopy = [...notes]
    // notesCopy[notedIdx] = note
    // setNotes(notesCopy)
  }

  //Todo: will be used both for adding/editing later on
  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break;

      case 'checkbox':

      default:
        break;
    }

    const updatedNoteToAdd = { ...noteToAdd, [field]: { txt: value } };
    setNoteToAdd(updatedNoteToAdd)
  }

  function onChangeBGC(noteId, newBgc) {
    // noteService.changeNoteBGC
    // then => onEditNote(newNote)


    console.log(noteId, newBgc)
  }

  function onBlurNote({ target }, noteId) {
    noteService.get(noteId)
      .then(note => {
        note.info.txt = target.innerText
        noteService.save(note)
      })
  }


  function onAddNote(txt) {
    console.log('txt:', txt)
    const note = noteService.getEmptyNote()
    // console.log('noteToAdd:', noteToAdd)
    note.info.txt = txt
    noteService.save(note)
      .then((note) => {
        console.log('note:', note)
        setNotes((prevNotes) => [...prevNotes, note])
      })
      .catch(err => console.log('err:', err))
  }


  if (isLoadingNotes) return <div>Loading...</div>;

  return (
    <div className="search">
      <section className="note-add">
        <NoteEdit onAddNote={onAddNote} />
      </section>
      <NoteList notes={notes} onBlurNote={onBlurNote} onChangeBGC={onChangeBGC} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />
    </div>
  );
}
