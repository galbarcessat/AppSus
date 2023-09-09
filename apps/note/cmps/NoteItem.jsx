import { NotePreview } from './NotePreview.jsx'
import { ColorPalette } from './ColorPalette.jsx'
const { useState, useEffect, useRef } = React


export function NoteItem({ note, onRemoveNote, onEditNote, onBlurNote, onChangeBGC, handlePaletteButtonClick }) {
    const [isHover, setIsHover] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)


    const colorInputRef = useRef(null);
    // const [notes, setNotes] = useState(initialNotes)  // Create a local state for notes


    // function handleButtonClick() {
    //     setIsExpanded(!isExpanded)
    // }

    return (
        <div style={{ backgroundColor: note.style.backgroundColor }} className='note clean-list' key={note.id} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <NotePreview note={note} onBlurNote={onBlurNote} onEditNote={onEditNote} />


            <div className='note-footer'>
                <button className="logo" onClick={() => onRemoveNote(note.id)}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </button>

                {/* <button className="logo" onClick={() => onEditNote(note)}>Edit</button> */}

                <button className="logo">
                    <span className="material-symbols-outlined ">
                        push_pin
                    </span>
                </button>

                <button className="logo" onClick={(event) => handlePaletteButtonClick(note, event)}>
                    <span className="material-symbols-outlined">
                        palette
                    </span>
                </button>
            </div>
            {/* {isExpanded && <ColorPalette handleButtonClick={handleButtonClick} onChangeBGC={onChangeBGC} note={note} />} */}
        </div>

    )
}

// {isExpanded && <ColorPalette handleButtonClick = {handleButtonClick} onChangeBGC={onChangeBGC} note={note} /> }


