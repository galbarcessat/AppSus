const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
import { EmailService } from '../../mail/services/email.service.js'
import { EmailLabels } from './EmailLabels.jsx'

export function EmailDetails({ onDeleteEmail, onReadMail, countRead }) {
    const [email, setEmail] = useState(null)
    const [labelsOn, setLablesOn] = useState(false)
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
                    .then(() => {
                        onReadMail(email)
                        countRead()
                    })
            }))
            .catch((err) => console.log('err:', err))
    }

    function getFormatedDate(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleDateString()
    }
    function toggleLablesModal() {
        setLablesOn((prevLables) => !prevLables)
        console.log('labelsOn:', labelsOn)
    }

    function onAddLabel(category) {
        console.log('category:', category)
        // console.log('email:', email)
        if (email.labels.includes(category)) return
        email.labels.push(category)
        // setEmail(email)
        console.log('email:', email)
        EmailService.save(email).then(newEmail => setEmail(newEmail))
    }
    function getLabelColor(category) {
        console.log('category:', category)
        if (!category) return
        return `label-${category}`
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
                <span onClick={toggleLablesModal} title="Add labels" className="material-symbols-outlined email-details-icon label">
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
            {/* <p className="labels-title">Labels</p> */}
            {/* FIX THAT WHEN I ADD A LABEL IT RE RENDERS THE PAGE SO WE CAN SEE THE ADDED LABEL
            ADD X NEAR EACH LABEL SO WE CAN DELETE IT */}
            <div className="email-labels">
                {email.labels.map(label => <div key={label} className={'label-tag '+ getLabelColor(label)} >{label}</div>)}
            </div>



            {labelsOn && <EmailLabels onAddLabel={onAddLabel} />}
        </section>
    )
}
