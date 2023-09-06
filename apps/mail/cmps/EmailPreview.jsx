
export function EmailPreview({ email }) {

    function getFormatedDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }

    return (
        <div className="email-row">
            <div className="email-from-content">
                <div className="email-icons-container">
                    <span><i className="fa-regular fa-square"></i></span>
                    <span><i class="fa-solid fa-star"></i></span>
                </div>
                <h3 className="email-from-txt">{email.from}</h3>
            </div>
            <div>
                <h4>{email.subject}
                    <span>{email.body}</span>
                </h4>
            </div>

            <div>
                {getFormatedDate(email.sentAt)}
            </div>
        </div>
    )
}
