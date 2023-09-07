const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { EmailPreview } from "../cmps/EmailPreview.jsx"
import { EmailService } from "../services/email.service.js"
import { EmailDetails } from "../cmps/EmailDetails.jsx"


export function EmailList({ emails, onDeleteEmail ,loadEmails}) {
  // const [emails, setEmails] = useState(null)

  // useEffect(() => {
  //   EmailService.query().then((emails) => setEmails(emails))
  // }, [])


  // function onDeleteEmail(emailId) {
  //   EmailService.remove(emailId)
  //     .then(() => {
  //       setEmails((prevEmails) => prevEmails.filter((email) => email.id !== emailId))
  //       //   showSuccessMsg(`Book Removed! ${bookId}`)
  //     })
  //     .catch((err) => {
  //       console.log('err:', err)
  //       //   showErrorMsg('Problem Removing ' + bookId)
  //     })
  // }
  
console.log('emails:', emails)
  if (!emails) return <div>Loading...</div>
  return (
    <section className="email-list-container">
      {emails.map((email) => (
        <EmailPreview key={email.id} email={email} onDeleteEmail={onDeleteEmail} loadEmails={loadEmails}/>
      ))}
    </section>
  )
}



