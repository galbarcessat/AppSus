import { noteService } from '../services/note.service.js'
import { NotePreview } from './NotePreview.jsx'
import { ColorPalette } from './ColorPalette.jsx'
import { NoteItem } from './NoteItem.jsx'
const { Link } = ReactRouterDOM
const { useState } = React

export function NoteList({ notes: initialNotes, setNotes, onBlurNote, onChangeBGC, onRemoveNote, onEditNote }) {
  //testing
  const [activeNotePalette, setActiveNotePalette] = useState(null);

  function handlePaletteButtonClick(note, event) {
    if (activeNotePalette) {
      setActiveNotePalette(null);
    } else {
      const noteWidth = event.currentTarget.offsetWidth;
      const paletteWidth = 390; // Assuming palette is 200px wide, adjust this based on your CSS
      const noteHeight = event.currentTarget.offsetHeight;
      // const demoX = event.clientX
      // console.log('demoX:', demoX)
      const x = event.clientX - (paletteWidth - noteWidth) / 2;
      console.log('x:', x)
      const y = event.clientY + noteHeight;
      console.log('y:', y)
      setActiveNotePalette({ note, x, y });
    }
  }
  //testing

  // console.log('initialNotes:', initialNotes)
  const renderNoteList = () => {
    return initialNotes.map(note => <NoteItem onChangeBGC={onChangeBGC} onRemoveNote={onRemoveNote} setNotes={setNotes} onEditNote={onEditNote} onBlurNote={onBlurNote} key={note.id} note={note} handlePaletteButtonClick={handlePaletteButtonClick} />)
  }


  return (
    <div className="note-list">
      {renderNoteList()}
      {activeNotePalette && <ColorPalette position={{ x: activeNotePalette.x, y: activeNotePalette.y }} note={activeNotePalette.note} onChangeBGC={onChangeBGC} handleButtonClick={handlePaletteButtonClick} />}
    </div>
  )
}

// onClick = {() => onChangeBGC(note.id, '#195da6')