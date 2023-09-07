const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
import { EmailService } from '../../mail/services/email.service.js'

export function EmailDetails({ onDeleteEmail, onReadMail }) {
    const [email, setEmail] = useState(null)
    const { emailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [emailId])

    function loadEmail() {
        EmailService.get(emailId)
            .then((email => {
                email.isRead = true
                EmailService.save(email)
                .then(setEmail)
                .then(()=>onReadMail(email))
            }))
            .catch((err) => console.log('err:', err))
    }

    function getFormatedDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }


    console.log('email:', email)
    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details-container">
            <div className="icons-container">
                <i title="Go back to inbox" className="fa-solid fa-arrow-left email-details-icon" onClick={() => navigate('/email')}></i>
                <i title="Delete email" className="fa-regular fa-trash-can  email-details-icon" onClick={() => {
                    onDeleteEmail(email.id)
                    navigate('/email')
                }} ></i>
                <span title="Add labels" className="material-symbols-outlined email-details-icon label">
                    label
                </span>
            </div>

            <h2 className="email-subject">{email.subject}</h2>
            <div className="date-and-from-container">
                <h3>{email.from}</h3>
                <span>{getFormatedDate(email.sentAt)}</span>
            </div>
            <span className="to-txt"><span>to </span>{email.to}</span>
            <hr />
            <p>{email.body}</p>
        </section>
    )
}
