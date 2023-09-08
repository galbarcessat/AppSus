import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'
import { colorPalette } from './ColorPalette.jsx'
import { NoteItem } from './NoteItem.jsx'
const { Link } = ReactRouterDOM

export function NoteList({ notes: initialNotes, setNotes, onBlurNote, onChangeBGC, onRemoveNote, onEditNote }) {

  console.log('initialNotes:', initialNotes)
  const renderNoteList = () => {
    return initialNotes.map(note => <NoteItem onChangeBGC={onChangeBGC} onRemoveNote={onRemoveNote} setNotes={setNotes} onEditNote={onEditNote} onBlurNote={onBlurNote} key={note.id} note={note} />)
  }


  return (
    <div className="note-list">
      {renderNoteList()}
    </div>
  )
}

// onClick = {() => onChangeBGC(note.id, '#195da6')