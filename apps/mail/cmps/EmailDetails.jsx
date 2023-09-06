const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
import { EmailService } from '../../mail/services/email.service.js'

export function EmailDetails({ toggleView, emailSelected }) {
    const [email, setEmail] = useState(null)
    const params = useParams()
    console.log('params:', params)
    console.log('emailSelected:', emailSelected)

    useEffect(() => {
        setEmail(emailSelected)
    }, [params.emailId])

    // function loadEmail() {
    //     EmailService.get(params.emailId)
    //         .then(setEmail)
    //         .catch((err) => console.log('err:', err))
    // }
    
    console.log('email:', email)
    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details-container">
            <div>{email.id}</div>
            <button onClick={toggleView}>Go back</button>
        </section>
    )
}
