

const { createPortal, useState, useEffect } = React


export function NotePreview({ note, onBlurNote, onEditNote }) {
    const { id, createdAt, info } = note


    return (
        <div>
            <div>
                <p> {id} </p>
                <p contentEditable suppressContentEditableWarning onBlur={() => onBlurNote(event, id)}> {info.txt} </p>
                <p> {new Date(createdAt).toLocaleDateString()} </p>
            </div>

        </div>
    )
}



