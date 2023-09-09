import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteFilter } from "../cmps/NoteFilter.jsx"



const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {
  const [isLoadingNotes, setIsLoadingNotes] = useState(true)
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
  const [pinnedNotes, setPinnedNotes] = useState(null)
  const [unPinnedNotes, setUnPinnedNotes] = useState(null)
  console.log('notes', notes)
  useEffect(() => {
    console.log('notes:', notes)
    noteService.query().then((notes) => {
      setNotes(notes)
      // console.log('notes:', notes)
      setIsLoadingNotes(false)
    })
  }, [])



  useEffect(() => {
    noteService.query(filterBy)
      .then(note => setNotes(note))
      .catch(err => console.log('err:', err))
  }, [filterBy])


  //removing note button, passing it forward to the child in the return
  function onRemoveNote(noteId) {
    console.log('noteId:', noteId)
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        // showSuccessMsg(`Note Removed! ${noteId}`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Problem with removing note - try again')
      })
  }

  function onEditNote(note) {
    console.log('note:', note)
    noteService.get(note.id)
      .then(noteFromDB => {
        const notedIdx = notes.findIndex(n => n.id === noteFromDB.id)
        const notesCopy = [...notes]
        notesCopy[notedIdx] = note
        setNotes(notesCopy)
      })
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':

      default:
        break
    }

    const updatedNoteToAdd = { ...noteToAdd, [field]: { txt: value } }
    setNoteToAdd(updatedNoteToAdd)
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  function onChangeBGC(note, newBgc) {
    console.log('note in onChangeBGC:', note)
    noteService.changeNoteBGC(note, newBgc)
      .then(updatedNote => {
        onEditNote(updatedNote)
      })
  }

  function onBlurNote({ target }, noteId) {
    noteService.get(noteId)
      .then(note => {
        note.info.txt = target.innerText
        noteService.save(note)
      })
  }

  function onAddNote(txt) {
    if (!txt) return
    console.log('txt:', txt)
    const note = noteService.getEmptyNote()
    // console.log('noteToAdd:', noteToAdd)
    note.info.txt = txt
    noteService.save(note)
      .then((note) => {
        console.log('note:', note)
        setNotes((prevNotes) => [...prevNotes, note])
        setInputVal('')
      })
      .catch(err => console.log('err:', err))
  }

  function onHandlePin(note) {

  }

  function onAddVideoUrl(url) {
    console.log('hi:', hi)
  }

  function onAddImageUrl(url) {
    console.log('hi:', hi)
  }

  if (isLoadingNotes) return <div>Loading...</div>

  return (
    <div className="search">
      <div className="note-filter">
        <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      </div>
      <section className="note-add">
        <NoteEdit onAddNote={onAddNote} handleChange={handleChange} />
      </section>

      <NoteList setNotes={setNotes} notes={notes} onBlurNote={onBlurNote} onChangeBGC={onChangeBGC} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />
    </div>
  )
}
