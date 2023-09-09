const { useState, useEffect } = React


export function NotePreview({ note, onBlurNote, onEditNote }) {
    const { id, type, createdAt, info } = note

    function renderNotePreview() {

        switch (type) {
            case "NoteTxt": {
                return (
                    <div>
                        <p contentEditable suppressContentEditableWarning onBlur={() => onBlurNote(event, id)}> {info.txt} </p>
                        <p className="edit-note-text">Click on Text to edit</p>
                    </div>
                )
            }

            case "NoteImg": {
                return (
                    <img src={info.url} />
                )
            }

            case "NoteVideo": {
                return (


                    <iframe allow='fullscreen' className="note-video" src="https://www.youtube.com/embed/uXWycyeTeCs" width={1000} height={500} title=''></iframe>

                )

            }

            case "NoteTodos": {
                const todos = info.txt.split(",")
                const title = todos.splice(0, 1)
                console.log('title:', title)
                console.log('todos:', todos)
                return (
                    <div>
                        <h1>{title[0]}</h1>
                        <p className="todos-list-time">{new Date(Date.now()).toLocaleDateString()} </p>
                        <p className="todos-list-time"> {new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <ul>

                            {todos.map((todo, index) =>
                                <li key={index}> {todo.trim()} </li>)}
                        </ul>
                    </div>
                )
            }

            default: {
                return (
                    <div>
                        <p> {id} </p>
                        <p contentEditable suppressContentEditableWarning onBlur={() => onBlurNote(event, id)}> {info.txt} </p>
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



