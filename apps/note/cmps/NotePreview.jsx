

const { createPortal, useState, useEffect } = React


export function NotePreview({ note, onEditNote }) {
    const { id, createdAt, info } = note

    return (
        <div>
            <div>
                <p> {info.txt} </p>
                <p> {id} </p>
                <p> {new Date(createdAt).toLocaleDateString()} </p>
            </div>

        </div>
    )
}



