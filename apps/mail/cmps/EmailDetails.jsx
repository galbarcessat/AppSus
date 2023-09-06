const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
import { EmailService } from '../../mail/services/email.service.js'

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const {emailId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [emailId])

    function loadEmail() {
        EmailService.get(emailId)
            .then(setEmail)
            .catch((err) => console.log('err:', err))
    }

    console.log('email:', email)
    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details-container">
            <div>{email.id}</div>
            <button onClick={()=>navigate('/email')}>Go back</button>
        </section>
    )
}
