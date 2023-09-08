
const { useState, useEffect } = React
const { Route, Routes, useNavigate } = ReactRouterDOM


import { EmailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx"
import { EmailDetails } from "../cmps/EmailDetails.jsx"
import { EmailCompose } from "../cmps/EmailCompose.jsx"

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [FilterBy, setFilterBy] = useState(EmailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(null)
    const [sideMenuFolder, setSideMenuFolder] = useState('Inbox')
    const [composeSelected, setComposeSelected] = useState(false)
    const [isReadCount, setisReadCount] = useState(0)

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

            console.log('UPDATING COUNTER', count)
            setisReadCount(count)
            //Tried .then
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

            {/*TOP NAV COMPONENET*/} {/* FUNCS : handleChange */}
            <section className="top-navbar">
                <div className="input-and-side-content">
                    <div className="top-navbar-left-content">
                        <i className="fa-solid fa-bars menu-icon"></i>
                        <img className="img-gmail-logo" src="../assets/img/gmailLogo.png" alt="" />
                        <span className="gmail-txt">Gmail</span>
                    </div>
                    <div className="input-container">
                        <input className="search-input" type="text" name='txt' id='txt' placeholder="Search mail" onChange={handleChange} />
                        {/* <input value={txt} onChange={handleChange} type='text' placeholder='By Name' id='txt' name='txt' /> */}

                        <i className="fas fa-search search-icon"></i>
                    </div>
                </div>


                <img className="user-img" src="../assets/img/galImg.png" alt="" />
            </section>

            {/* SIDE NAV BAR COMPOMNENET */} {/* FUNCS : onOpenCompose,navigate,onSetFilterBy,setSideMenuFolder */}
            <section className="side-navbar">
                <div>
                    <button onClick={onOpenCompose} className="btn-compose"><i className="fa-solid fa-pen"></i>Compose</button>

                    <div className="side-bar-icons">
                        <div onClick={() => {
                            navigate('/email')
                            onSetFilterBy('Inbox')
                            setSideMenuFolder('Inbox')
                        }}
                            className={"sidebar-icon count-container " + (sideMenuFolder === 'Inbox' ? 'active' : '')}>
                            <div>
                                <span className="material-symbols-outlined icon">inbox</span>
                                <span>Inbox</span>
                            </div>
                            <span className="isRead-counter">{isReadCount}</span>
                        </div>
                        <div onClick={() => {
                            navigate('/email')
                            onSetFilterBy('Starred')
                            setSideMenuFolder('Starred')
                        }}
                            className={"sidebar-icon " + (sideMenuFolder === 'Starred' ? 'active' : '')}><span className="material-symbols-outlined icon">star</span><span>Starred</span>
                        </div>
                        <div onClick={() => {
                            navigate('/email')
                            onSetFilterBy('Sent')
                            setSideMenuFolder('Sent')
                        }}
                            className={"sidebar-icon " + (sideMenuFolder === 'Sent' ? 'active' : '')}><span className="material-symbols-outlined icon">send</span><span>Sent</span>
                        </div>
                        <div onClick={() => {
                            navigate('/email')
                            onSetFilterBy('Deleted')
                            setSideMenuFolder('Deleted')
                        }}
                            className={"sidebar-icon " + (sideMenuFolder === 'Deleted' ? 'active' : '')}><span className="material-symbols-outlined icon">delete</span><span>Trash</span>
                        </div>
                        <div onClick={() => {
                            navigate('/email')
                            onSetFilterBy('All')
                            setSideMenuFolder('All')
                        }}
                            className={"sidebar-icon " + (sideMenuFolder === 'All' ? 'active' : '')}><span className="material-symbols-outlined icon">stacked_email</span><span>All Mail</span>
                        </div>
                    </div>
                </div>

            </section>

            {/* SORT EMAILS COMPONENET */} {/* FUNCS : onSetSortBy */}
            <section className="sort-emails-container">
                <button onClick={() => onSetSortBy('isRead')}>Read</button>
                <button onClick={() => onSetSortBy('isStarred')}>Starred</button>
                <button onClick={() => onSetSortBy('date')}>Date</button>
                <button onClick={() => onSetSortBy('subject')}>Subject</button>
                <button onClick={() => onSetSortBy('none')}>No Sort</button>
            </section>

            {/* EMAIL LIST */}
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

