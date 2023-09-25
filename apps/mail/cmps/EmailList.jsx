
import { EmailPreview } from "../cmps/EmailPreview.jsx"

export function EmailList({ emails, onDeleteEmail, onToggleElement }) {

  // console.log('emails:', emails)

  if (!emails) return <div>Loading...</div>
  if (emails.length === 0) return <h1 className="no-emails-txt">No emails to display.</h1>
  return (
    <section className="email-list-container">
      {emails.map((email) => (
        <EmailPreview key={email.id} email={email} onDeleteEmail={onDeleteEmail} onToggleElement={onToggleElement} />
      ))}
    </section>
  )
}



