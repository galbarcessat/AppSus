const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

export function NoteEdit({ onAddNote, noteId = null }) {
    const [inputVal, setInputVal] = useState('')

    useEffect(() => {
        if (noteId) loadNote(noteId)
    })

    function loadNote(noteId) {
        noteService.get(noteId)
            .then((note) => setInputVal(note.info.txt))
    }

    function onInputText({ target: { value } }) {
        setInputVal(value)
    }

    return (
        <section>
            <input type="text" placeholder="What's on your mind..." value={inputVal} onChange={(ev) => onInputText(ev)} />
            <button onClick={() => onAddNote(inputVal)}>Add</button>
        </section>
    )

}