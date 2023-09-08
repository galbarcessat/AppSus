const { useState, useEffect } = React
const { Link, useNavigate } = ReactRouterDOM
import { LongTxt } from '../cmps/LongTxt.jsx'

export function EmailPreview({ email, onDeleteEmail, onToggleElement }) {
    const navigate = useNavigate()

    function getFormatedDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString()
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
                    <span><i className="fa-regular fa-square"></i></span>
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
                </span>
                <span className="makaf">-</span>
                <span className="email-body-txt"><LongTxt txt={email.body} length={100} /></span>
            </div>

            <span className={dynClassIsRead}>
                {getFormatedDate(email.sentAt)}
            </span>

            <div className={"email-icons-container " + dynClassIsRead}>
                <i title="Save as note" className="fa-regular fa-paper-plane email-row-icon"></i>
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

