import { NotePreview } from './NotePreview.jsx'
const { useState, useEffect, useRef } = React

export function NoteItem({ note, onRemoveNote, onEditNote, onBlurNote, onChangeBGC }) {
    const [isHover, setIsHover] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)


    const colorInputRef = useRef(null);
    // const [notes, setNotes] = useState(initialNotes)  // Create a local state for notes


    const handleButtonClick = () => {
        // Programmatically click the hidden color input to show the palette
        setIsExpanded(!isExpanded)
    }

    return (
        <div style={{ backgroundColor: note.style.backgroundColor }} className='note clean-list' key={note.id} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <NotePreview note={note} onBlurNote={onBlurNote} onEditNote={onEditNote} />

            <div className='note-footer'>
                <button className="logo" onClick={() => onRemoveNote(note.id)}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </button>

                <button className="logo" onClick={() => onEditNote(note)}>Edit</button>

                <button className="logo">
                    <span className="material-symbols-outlined ">
                        push_pin
                    </span>
                </button>

                <button className="logo" onClick={handleButtonClick}>
                    <span className="material-symbols-outlined">
                        palette
                    </span>
                    <div className=''>
                        <input type="color"
                            style={{ display: 'none' }}
                            ref={colorInputRef}
                        />
                    </div>
                </button>
            </div>
            {isExpanded && <div>
                <div className="color-palette" >
                    <div onClick={() => onChangeBGC(note, '#d3bfdb')} className="color color1"></div>
                    <div onClick={() => onChangeBGC(note, '#d4e3ed')} className="color color2"></div>
                    <div onClick={() => onChangeBGC(note, '#f39f76')} className="color color3"></div>
                    <div onClick={() => onChangeBGC(note, '#faafa7')} className="color color4"></div>
                    <div onClick={() => onChangeBGC(note, '#efeff1')} className="color color5"></div>
                    <div onClick={() => onChangeBGC(note, '#e2f5d3')} className="color color6"></div>
                </div>
            </div>}

        </div>
    )
}



