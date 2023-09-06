import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"

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
  // function onRemoteNote(noteId) {
  //   noteService.remove(noteId).then(() => {
  //     setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
  //   })
  // }

  if (!notes) return <div>Loading...</div>
  return (
    <div>
      <input type="text" placeholder="What's on your mind..." />
      <NoteList notes={notes}  />
    </div>
  )
}
