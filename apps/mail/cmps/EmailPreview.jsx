const { useState, useEffect } = React
const { Link, useNavigate } = ReactRouterDOM
import { LongTxt } from '../cmps/LongTxt.jsx'
import { EmailService } from '../services/email.service.js'
import { noteService } from '../../note/services/note.service.js'

export function EmailPreview({ email, onDeleteEmail, onToggleElement }) {
    const navigate = useNavigate()

    function getFormatedDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }

    function onConvertEmailToNote(email) {
        let note = EmailService.convertEmailToNote(email)
        noteService.save(note)
        navigate('/note')
        // console.log('note:', note)
    }

    let dynClassIsRead = email.isRead ? 'read' : 'unread'
    let dynClassIsStarred = email.isStarred ? 'starred' : 'unstarred'
    let dynEnvelpoeElement = email.isRead ?
        <i title="Mark as unread" className="fa-regular fa-envelope email-row-icon"></i> :
        <i title="Mark as read " className="fa-regular fa-envelope-open email-row-icon"></i>

    return (
        <div className={"email-row " + dynClassIsRead} onClick={() => { navigate(`Details/${email.id}`) }}>
            <div className="email-from-content">
                <div className="email-side-icons-container">
                    <input onClick={(e) => e.stopPropagation()} className='checkbox-input' type="checkbox" />
                    {/* <span><i className="fa-regular fa-square"></i></span>  */}
                    {/* <i class="fa-regular fa-square-check"></i> */}
                    <span onClick={(e) => {
                        e.stopPropagation()
                        onToggleElement(email, 'star')
                    }}><i className={"fa-solid fa-star " + dynClassIsStarred}></i></span>
                </div>
                <span className={"email-from-txt " + dynClassIsRead}>{email.from}</span>
            </div>
            <div className="email-body">
                <span className={dynClassIsRead}>
                    {email.subject}
                    <span className="makaf">-</span>
                </span>

                <span className="email-body-txt"><LongTxt txt={email.body} length={80} /></span>
            </div>

            <span className={"email-row-date " + dynClassIsRead}>
                {getFormatedDate(email.sentAt)}
            </span>

            <div className={"email-icons-container " + dynClassIsRead}>
                <i onClick={(e) => {
                    e.stopPropagation()
                    onConvertEmailToNote(email)
                }} title="Save as note" className="fa-regular fa-paper-plane email-row-icon"></i>
                <span onClick={(e) => {
                    e.stopPropagation()
                    onToggleElement(email, 'envelope')
                }}>{dynEnvelpoeElement}</span>
                <i onClick={(e) => {
                    e.stopPropagation()
                    onDeleteEmail(email.id)
                }} title="Delete email" className="fa-regular fa-trash-can email-row-icon"></i>
            </div>
        </div>
    )
}

