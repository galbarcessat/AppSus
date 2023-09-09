

const { createPortal, useState, useEffect } = React


export function NotePreview({ note, onBlurNote, onEditNote }) {
    const { id, type, createdAt, info } = note

    function renderNotePreview() {
        // TODO render Note type component by node type
        debugger
        switch (type) {
            case "NoteTxt": {
                return (
                    <div>
                        <p> {id} </p>
                        <p contentEditable suppressContentEditableWarning onBlur={() => onBlurNote(event, id)}> {info.txt} </p>
                        <p> {new Date(createdAt).toLocaleDateString()} </p>
                    </div>
                )
            }

            case "NoteImg": {
                return (
                    <img src={info.url} />
                )
            }

            default: {
                return (
                    <div>
                        <p> {id} </p>
                        <p contentEditable suppressContentEditableWarning onBlur={() => onBlurNote(event, id)}> {info.txt} </p>
                        <p> {new Date(createdAt).toLocaleDateString()} </p>
                    </div>
                )
            }
        }
    }

    return (
        <div>
            {renderNotePreview()}
        </div>
    )
}



