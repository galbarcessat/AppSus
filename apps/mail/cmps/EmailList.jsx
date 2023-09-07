const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { EmailPreview } from "../cmps/EmailPreview.jsx"
import { EmailService } from "../services/email.service.js"
import { EmailDetails } from "../cmps/EmailDetails.jsx"


export function EmailList({ emails, onDeleteEmail }) {
  
  console.log('emails:', emails)
  
  if (!emails) return <div>Loading...</div>
  return (
    <section className="email-list-container">
      {emails.map((email) => (
        <EmailPreview key={email.id} email={email} onDeleteEmail={onDeleteEmail} />
      ))}
    </section>
  )
}



