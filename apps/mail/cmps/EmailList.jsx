
import { EmailPreview } from "../cmps/EmailPreview.jsx"

export function EmailList({ emails, onDeleteEmail, onToggleElement }) {

  // console.log('emails:', emails)

  if (!emails) return <div>Loading...</div>
  return (
    <section className="email-list-container">
      {emails.map((email) => (
        <EmailPreview key={email.id} email={email} onDeleteEmail={onDeleteEmail} onToggleElement={onToggleElement} />
      ))}
    </section>
  )
}



