import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {


  return (
    <ul className="note-list">
      {notes.map(note => (
        <li className='clean-list' key={note.id}>
          <NotePreview note={note} />
          <div><button onClick={() => onRemoveNote(note.id)}>X</button></div>
        </li>
      ))}
    </ul>









    // <section className="notes-container">
    //   {notes.map((note) => (
    //     <NotePreview note={note} />
    //   ))}
    // </section>
  )
}
