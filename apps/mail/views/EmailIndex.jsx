const { useState, useEffect } = React
const { Route, Routes, useNavigate } = ReactRouterDOM

import { EmailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx"
import { EmailDetails } from "../cmps/EmailDetails.jsx"
import { EmailCompose } from "../cmps/EmailCompose.jsx"
import { TopNavBar } from "../cmps/TopNavBar.jsx"
import { EmailFolderList } from "../cmps/EmailFolderList.jsx"
import { EmailSort } from "../cmps/EmailSort.jsx"

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [FilterBy, setFilterBy] = useState(EmailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(null)
    const [sideMenuFolder, setSideMenuFolder] = useState('Inbox')
    const [composeSelected, setComposeSelected] = useState(false)
    const [isReadCount, setisReadCount] = useState(0)
    const [sideMenuOpen, setSideMenuOpen] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        console.log('FilterBy:', FilterBy)
        loadEmails(FilterBy, sortBy)
        countRead()
    }, [FilterBy, sortBy])

    function loadEmails(filter, sort) {
        EmailService.query(filter, sort).then((emails) => setEmails(emails))
    }

    function countRead() {
        EmailService.query(EmailService.getDefaultFilter()).then(emails => {
            const count = emails.reduce((count, email) => {
                if (!email.isRead) {
                    return count + 1;
                }
                return count;
            }, 0);
            setisReadCount(count)
        })
    }

    function onToggleElement(email, element) {
        if (!emails) return
        if (element === 'star') {
            email.isStarred = !email.isStarred
        }
        else if (element === 'envelope') {
            email.isRead = !email.isRead
        }
        EmailService.save(email).then(email => {
            const idx = emails.findIndex(mail => mail.id === email.id)
            emails[idx] = email
            setEmails([...emails])
            if (element === 'envelope') countRead()
        })

    }

    function onOpenCompose() {
        setComposeSelected(true)
    }
    function onCloseCompose() {
        setComposeSelected(false)

    }

    function onFinalDeleteEmail(emailId) {
        EmailService.remove(emailId)
            .then(() => {
                loadEmails(FilterBy)
                //   showSuccessMsg(`Book Removed! ${bookId}`)
            })
            .catch((err) => {
                console.log('err:', err)
                //   showErrorMsg('Problem Removing ' + bookId)
            })
    }

    function onDeleteEmail(emailId) {
        EmailService.get(emailId)
            .then(email => {
                if (!email.removedAt) {
                    email.removedAt = Date.now()
                    EmailService.save(email).then(email => {
                        const idx = emails.findIndex(mail => mail.id === email.id)
                        let emailsCopy = [...emails]
                        emailsCopy[idx] = email
                        loadEmails(FilterBy)
                    })
                } else if (email.removedAt) {
                    if (confirm('This email will be deleted for ever')) {
                        onFinalDeleteEmail(email.id)
                    }
                }
            })
            .catch(err => console.log('err:', err))
    }

    function onReadMail(email) {
        if (!emails) return
        const idx = emails.findIndex(mail => mail.id === email.id)
        emails[idx] = email
        setEmails([...emails])
    }

    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        switch (filterBy) {
            case 'Deleted':
                setFilterBy((prevFilter) => ({ ...prevFilter, Deleted: true, Sent: false, Starred: false, Inbox: false, All: false }));
                break;
            case 'Sent':
                setFilterBy((prevFilter) => ({ ...prevFilter, Deleted: false, Sent: true, Starred: false, Inbox: false, All: false }));
                break;
            case 'Inbox':
                setFilterBy((EmailService.getDefaultFilter()));
                break;
            case 'Starred':
                setFilterBy((prevFilter) => ({ ...prevFilter, Deleted: false, Sent: false, Starred: true, Inbox: false, All: false }));
                break;
            case 'All':
                setFilterBy((prevFilter) => ({ ...prevFilter, Deleted: false, Sent: false, Starred: false, Inbox: false, All: true }));
                break;

        }
    }
    function filterByTxt(value) {
        setFilterBy((prevFilter) => ({ ...prevFilter, txt: value }))
    }

    function handleChange({ target }) {
        let value = target.value
        filterByTxt(value)
    }

    function onSetSortBy(sortBy) {
        if (sortBy === 'none') {
            setSortBy(null)
        } else setSortBy(sortBy)
    }

    return (
        <section className="email-app-container">

            <TopNavBar handleChange={handleChange} />

            <EmailFolderList onOpenCompose={onOpenCompose} onSetFilterBy={onSetFilterBy} setSideMenuFolder={setSideMenuFolder} sideMenuFolder={sideMenuFolder} isReadCount={isReadCount} />

            <EmailSort onSetSortBy={onSetSortBy} />

            <section className="emails-display-container">
                <Routes>
                    <Route path="/" element={<EmailList emails={emails} onDeleteEmail={onDeleteEmail} onToggleElement={onToggleElement} />} />
                    <Route path="/Details/:emailId" element={<EmailDetails onDeleteEmail={onDeleteEmail} onReadMail={onReadMail} countRead={countRead} />} />
                </Routes>
            </section>

            {composeSelected && <EmailCompose onCloseCompose={onCloseCompose} />}

        </section>
    )
}

