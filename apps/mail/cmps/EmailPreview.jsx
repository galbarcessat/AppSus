const { Link, useNavigate } = ReactRouterDOM
export function EmailPreview({ email, onDeleteEmail, toggleView }) {
    const navigate = useNavigate();

    function getFormatedDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }

    function onEmailDetails(emailId) {
        // <Link to={`/email/${emailId}`}>Details</Link>
        toggleView(email)
        console.log('emailId ON EMAIL:', emailId)

    }

    return (
        <div className="email-row" onClick={() => { onEmailDetails(email.id) }}>
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
                    <span>{email.body}</span>
                </h4>
            </div>

            <div>
                {getFormatedDate(email.sentAt)}
            </div>
            <div className="email-icons-container">
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

