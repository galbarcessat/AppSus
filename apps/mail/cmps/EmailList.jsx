
import { EmailPreview } from "../cmps/EmailPreview.jsx"

export function EmailList({ emails,onDeleteEmail }) {

  return (
    <section className="email-list-container">
        {emails.map((email) => (
          <EmailPreview key={email.id} email={email} onDeleteEmail={onDeleteEmail} />
        ))}
    </section>
  )
}
