import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    noteService.query().then((notes) => {
      setNotes(notes)
      setIsLoadingNotes(false);
    })
  }, [])

  //removing note button, passing it forward to the child in the return
  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        showSuccessMsg(`Note Removed! ${noteId}`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Problem with removing note - try again')
      })
  }

  //todo - render a modal (that hides the main screen, and shows current value to edit and save)
  function onEditNote(noteId) {
    console.log('hi')
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


  function onAddNote(txt) {

    const note = noteService.getEmptyNote()
    // console.log('noteToAdd:', noteToAdd)
    note.info.txt = txt
    noteService.save(note)
      .then((newNote) => {
        const updatedNotes = [...notes, newNote];
        setNotes(prevNotes => [...prevNotes, newNote])
      })
      .catch(err => console.log('err:', err))
  }


  if (isLoadingNotes) return <div>Loading...</div>;

  return (
    <div className="search">
      <section className="note-add">
        <NoteEdit onAddNote={onAddNote} />
      </section>
      <NoteList notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />
    </div>
  );
}
