const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

export function NoteEdit({ onAddNote, handleChange, noteId = null }) {
    const [inputVal, setInputVal] = useState('')
    const [placeHolderTxt, setPlaceholderTxt] = useState(`What's on your mind`)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        if (noteId) loadNote(noteId)
    }, [])

    function loadNote(noteId) {
        noteService.get(noteId)
            .then((note) => setInputVal(note.info.txt))
    }

    function onInputText({ target: { value } }) {
        setInputVal(value)
    }

    function handleChange(prop) {

        switch (prop) {
            case 'imageUrl':
                setPlaceholderTxt('Enter Image Url...')
                break
            case 'videoUrl':
                setPlaceholderTxt('Enter Video Url...')
                break
            case 'txt':
                setPlaceholderTxt(`What's on your mind`)

            default:
                setPlaceholderTxt(`What's on your mind`)
                break
        }
    }

    return (
        <div className="add-note-container">
            <div className="text-input-container">
                <input className="note-text" type="text" placeholder={placeHolderTxt} value={inputVal} onChange={(ev) => onInputText(ev)} />
                <button className="material-symbols-outlined logo" onClick={() => {
                    onAddNote(inputVal)
                    setInputVal('')
                }}><span>
                        add
                    </span></button>
                <button className="material-symbols-outlined logo" onClick={() => handleChange('imageUrl')}>
                    <span>
                        add_photo_alternate
                    </span>
                </button>
                <button className="material-symbols-outlined logo" onClick={() => {
                    onAddVideo
                    handleChange('videoUrl')
                }}>
                    <span>
                        smart_display
                    </span>
                </button>
            </div>
        </div>
    )

}

