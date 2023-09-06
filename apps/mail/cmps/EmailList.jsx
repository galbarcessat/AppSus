
import { EmailPreview } from "../cmps/EmailPreview.jsx"

export function EmailList({ emails }) {

  return (
    <section className="email-list-container">
        {emails.map((email) => (
          <EmailPreview key={email.id} email={email} />
        ))}
    </section>
  )
}
