import { NotePreview } from './NotePreview.jsx'
const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onEditNote }) {


  return (
    <ul className="note-list">
      {notes.map(note => (
        <li style={notes.style} className='clean-list' key={note.id}>
          <NotePreview note={note} onEditNote={onEditNote} />
          <div>
            <button onClick={() => onRemoveNote(note.id)}>X</button>
            <button onClick={() => onEditNote(note.id)}>Edit</button>
          </div>
        </li>
      ))}

    </ul>
  )
}
