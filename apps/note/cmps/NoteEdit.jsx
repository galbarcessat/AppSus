const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

export function NoteEdit({ onAddNote, noteId = null }) {
    const [inputVal, setInputVal] = useState('')
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

    function handleToggle() {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="form-container">
            <div onClick={handleToggle} >
                <input className="note-text" type="text" placeholder="What's on your mind..." value={inputVal} onChange={(ev) => onInputText(ev)} />
                <button onClick={() => onAddNote(inputVal)}>Add</button>
                {isExpanded && <div>
                    <p>Hi there</p>
                </div>}
            </div>
        </div>
    )

}