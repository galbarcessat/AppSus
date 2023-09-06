import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);
  const [notes, setNotes] = useState(null)
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())

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
        showSuccessMsg(`Book Removed! ${bookId}`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Problem with removing book - try again')
      })
  }

  function onEditNote(noteId) {
    console.log('hi')
  }


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


  function onSaveNote(ev) {
    ev.preventDefault()
    noteService.save(noteToAdd)
      .then(() => {
        const updatedNotes = [...notes, noteToAdd];
        setNotes(updatedNotes)
      })
      .catch(err => console.log('err:', err))
  }


  if (isLoadingNotes) return <div>Loading...</div>;

  return (
    <div className="search">
      <section className="note-add">
        <form onSubmit={onSaveNote}>
          <label htmlFor="info"></label>
          <input
            placeholder="What's on your mind"
            type="text"
            name="info"
            id="info"
            onChange={handleChange} // Bind the input value to the noteToAdd.info property
            value={noteToAdd.info.text}
          />
          <button>Add</button>
        </form>
      </section>
      <NoteList notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />
    </div>
  );
}
