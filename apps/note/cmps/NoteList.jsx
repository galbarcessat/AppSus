import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'
const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteList({ notes: initialNotes, onBlurNote, onChangeBGC, onRemoveNote, onEditNote }) {
  const [isHover, setIsHover] = useState(false)
  // const [notes, setNotes] = useState(initialNotes)  // Create a local state for notes

  // function onChangeBackgroundColor(noteId) {
  //   const updatedNotes = notes.map(note => {
  //     if (note.id === noteId) {
  //       return note.id === noteId
  //         ? { ...note, style: { ...note.style, backgroundColor: 'yellow' } }
  //         : note;
  //     }
  //     return note;
  //   });

  //   // Set the updated notes in the local state
  //   setNotes(updatedNotes);
  // }

  const renderNodeList = () => {
    return initialNotes.map(note => (
      <div style={{ backgroundColor: note.style.backgroundColor }} className='note clean-list' key={note.id} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <NotePreview note={note} onBlurNote={onBlurNote} onEditNote={onEditNote} />

        <div className='note-footer'>
          <button className="logo" onClick={() => onRemoveNote(note.id)}>
            <span class="material-symbols-outlined">
              delete
            </span>
          </button>

          <button className="logo" onClick={() => onEditNote(note.id)}>Edit</button>

          <button className="logo">
            <span className="material-symbols-outlined ">
              push_pin
            </span>
          </button>

          <button className="logo" onClick={() => onChangeBGC(note.id, '#195da6')}>
            <span className="material-symbols-outlined">
              palette
            </span>
          </button>
        </div>
      </div>

    ))
  }


  return (
    <div className="note-list">
      {renderNodeList()}
    </div>
  )
}
