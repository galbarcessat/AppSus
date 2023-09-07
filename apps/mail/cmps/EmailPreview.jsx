const { useState, useEffect } = React
const { Link, useNavigate } = ReactRouterDOM

export function EmailPreview({ email, onDeleteEmail,loadEmails }) {
    const navigate = useNavigate()

    // Maybe instead of loading all the Emails reload only this email preview
    useEffect(()=>{
        loadEmails()
    },[email.isRead])

    function getFormatedDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }

    // console.log('email.isRead:', email.isRead)
    let dynClassIsRead = email.isRead ? 'read' : 'unread'
    console.log('dynClassIsRead:', dynClassIsRead)

    return (
        <div className={"email-row " + dynClassIsRead} onClick={() => { navigate(`Details/${email.id}`) }}>
            <div className="email-from-content">
                <div className="email-side-icons-container">
                    <span><i className="fa-regular fa-square"></i></span>
                    <span><i className="fa-solid fa-star"></i></span>
                </div>
                <h3 className="email-from-txt">{email.from}</h3>
            </div>
            <div className="email-body">
                <h4>
                    {email.subject} -
                </h4>
                <span>{email.body}</span>
            </div>

            <div>
                {getFormatedDate(email.sentAt)}
            </div>
            {/* CHANGE TO OPEN ENVELPOE WHEN ISREAD AND CLOSED ENVELOPE WHEN ISREAD FALSE! */}
            <div className={"email-icons-container " + dynClassIsRead}>
                <i title="Save as note" className="fa-regular fa-paper-plane email-row-icon"></i>
                <i title="Mark as read" className="fa-regular fa-envelope email-row-icon"></i>
                {/* <i class="fa-regular fa-envelope-open"></i> OPEN ENVELOPE */}
                <i onClick={(e) => {
                    e.stopPropagation()
                    onDeleteEmail(email.id)
                }} title="Delete email" className="fa-regular fa-trash-can email-row-icon"></i>
            </div>

        </div>
    )
}

