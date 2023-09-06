export function NotePreview({ note }) {

    const { id, createdAt, info } = note
    console.log('note:', note)


    return (
        <div>
            <p> {info.txt} </p>
        </div>
    )
}