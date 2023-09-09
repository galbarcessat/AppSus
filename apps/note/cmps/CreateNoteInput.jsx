const { useState, useEffect } = React
import { noteService } from "../services/note.service.js"

import NoteTypeButton from "./NoteTypeButton.jsx";

// Move to note service
const TEXT = "NoteTxt";
const IMAGE_URL = "NoteImg";
const NOTE_TYPE_TO_PLACEHOLDER_MAPPING = {
    [TEXT]: "What's on your mind",
    [IMAGE_URL]: "Enter Image Url..."
}

export default function CreateNoteInput(props) {
    const { onAddNote, handleChange, noteId } = props;

    const [noteType, setNoteType] = useState(props.noteType);
    const [inputVal, setInputVal] = useState('')
    const [placeHolderTxt, setPlaceholderTxt] = useState(NOTE_TYPE_TO_PLACEHOLDER_MAPPING[props.noteType])

    useEffect(() => {
        if (noteId) {
            console.log('noteId:', noteId)
            loadNote(noteId)
        }
    }, [])

    function loadNote(noteId) {
        noteService.get(noteId)
            .then((note) => {
                setInputVal(note.info.txt)
            })
    }


    function onInputText({ target: { value } }) {
        setInputVal(value)
    }

    function onInputKeyDown(e) {
        if (e.key == "Enter") {
            debugger
            onAddNote(noteType, inputVal);
            setInputVal('')
        }
    }

    function onNoteTypeButtonClick(updatedNoteType) {
        setNoteType(updatedNoteType);
        setPlaceholderTxt(NOTE_TYPE_TO_PLACEHOLDER_MAPPING[updatedNoteType]);
    }

    function handlePlaceHolderChange(prop) {
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
                <input className="note-text" type="text" placeholder={placeHolderTxt} value={inputVal} onChange={onInputText} onKeyDown={onInputKeyDown} />

                <NoteTypeButton iconName="add_comment" isSelected={noteType === TEXT} onClick={() => onNoteTypeButtonClick(TEXT)} />
                <NoteTypeButton iconName="add_photo_alternate" isSelected={noteType === IMAGE_URL} onClick={() => onNoteTypeButtonClick(IMAGE_URL)} />
            </div>
        </div>
    )

}

CreateNoteInput.defaultProps = {
    noteType: TEXT
}
