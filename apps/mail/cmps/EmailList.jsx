
import { EmailPreview } from "../cmps/EmailPreview.jsx"

export function EmailList({ emails, onDeleteEmail, toggleView }) {

  return (
    <section className="email-list-container">
      {emails.map((email) => (
        <EmailPreview key={email.id} email={email} onDeleteEmail={onDeleteEmail} toggleView={toggleView} />
      ))}
    </section>
  )
}
