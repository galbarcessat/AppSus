
const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM
const { Route, Routes } = ReactRouterDOM


import { EmailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx"
import { EmailDetails } from "../cmps/EmailDetails.jsx"

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [FilterBy, setFilterBy] = useState(EmailService.getDefaultFilter())

    useEffect(() => {
        console.log('FilterBy:', FilterBy)
        loadEmails(FilterBy)
    }, [])
    // [filterBy] ^^^^^

    function loadEmails(filter) {
        EmailService.query(filter).then((emails) => setEmails(emails))
        // query(FilterBy) ^^^
    }

    function onDeleteEmail(emailId) {
        EmailService.remove(emailId)
            .then(() => {
                // SET EMAIL REMOVED AT TO DATE NOW
                setEmails((prevEmails) => prevEmails.filter((email) => email.id !== emailId))
                //   showSuccessMsg(`Book Removed! ${bookId}`)
            })
            .catch((err) => {
                console.log('err:', err)
                //   showErrorMsg('Problem Removing ' + bookId)
            })
    }

    function onReadMail(email) {
        if (!emails) return
        const idx = emails.findIndex(mail => mail.id === email.id)
        emails[idx] = email
        setEmails([...emails])
    }

    return (
        <section className="email-app-container">
            {/*TOP NAV COMPONENET*/}
            <section className="top-navbar">
                <div className="input-and-side-content">
                    <div className="top-navbar-left-content">
                        <i className="fa-solid fa-bars menu-icon"></i>
                        <img className="img-gmail-logo" src="../assets/img/gmailLogo.png" alt="" />
                        <span className="gmail-txt">Gmail</span>
                    </div>
                    <div className="input-container">
                        <input className="search-input" type="text" placeholder="Search mail" />
                        <i className="fas fa-search search-icon"></i>
                    </div>
                </div>


                <img className="user-img" src="../assets/img/userImg.png" alt="" />
            </section>
            {/* SIDE NAV BAR COMPOMNENET */}
            <section className="side-navbar">
                <div>
                    <button className="btn-compose"><i className="fa-solid fa-pen"></i>Compose</button>
                    <div className="side-bar-icons">
                        <div className="sidebar-icon"><span className="material-symbols-outlined icon">inbox</span><span>Inbox</span></div>
                        <div className="sidebar-icon"><span className="material-symbols-outlined icon">star</span><span>Starred</span></div>
                        <div className="sidebar-icon"><span className="material-symbols-outlined icon">send</span><span>Sent</span></div>
                        <div className="sidebar-icon"><span className="material-symbols-outlined icon">delete</span><span>Deleted</span></div>
                    </div>
                </div>

            </section>
            {/* SORT EMAILS COMPONENET */}
            <section className="sort-emails-container">
                <button>Read</button>
                <button>Starred</button>
                <button>Date</button>
                <button>Subject</button>
            </section>

            {/* EMAIL LIST */}
            <section className="emails-display-container">
                <Routes>
                    <Route path="/" element={<EmailList emails={emails} onDeleteEmail={onDeleteEmail} />} />
                    <Route path="/Details/:emailId" element={<EmailDetails onDeleteEmail={onDeleteEmail} onReadMail={onReadMail} />} />
                </Routes>

                {/* COMPOSE MODAL HERE WITH &&ComposeIsSelected poistion fixed */}
            </section>
        </section>
    )
}

