import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  //   const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

  //setting initial notes from local storage or creating new ones
  useEffect(() => {
    noteService.query().then((notes) => {
      setNotes(notes)

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

  if (!notes) return <div>Loading...</div>
  return (
    <div className="search">
      <input type="text" placeholder="What's on your mind..." />
      <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    </div>
  )
}
