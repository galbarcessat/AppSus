

const { useState, useEffect } = React

// import ReactPlayer from 'react-player'
// import { Player } from 'video-react';

export function NotePreview({ note, onBlurNote, onEditNote }) {
    const { id, type, createdAt, info } = note

    function renderNotePreview() {
        // TODO render Note type component by node type

        switch (type) {
            case "NoteTxt": {
                return (
                    <div>
                        {/* <p> {id} </p> */}
                        <p contentEditable suppressContentEditableWarning onBlur={() => onBlurNote(event, id)}> {info.txt} </p>
                        <p className="edit-note-text">Click on Text to edit</p>
                        {/* <p> {new Date(createdAt).toLocaleDateString()} </p> */}
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

                    // <video src={info.url} controls width="240" height="240" onError={(e) => console.error('Video error:', e)}>
                    // </video>
                    <iframe src="https://www.youtube.com/channel/UC0v-tlzsn0QZwJnkiaUSJVQ" width={1000} height={500} title=''></iframe>

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



