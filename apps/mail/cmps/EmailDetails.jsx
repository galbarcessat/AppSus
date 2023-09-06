const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
import { EmailService } from '../../mail/services/email.service.js'

export function EmailDetails({ emailId }) {
    const [email, setEmail] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    function loadEmail() {
        EmailService.get(params.emailId)
            .then(setEmail)
            .catch((err) => console.log('err:', err))
    }
    console.log('email:', email)
    if (!email) return <div>Loading...</div>
    return (
        <div>{email.id}</div>
    )
}
