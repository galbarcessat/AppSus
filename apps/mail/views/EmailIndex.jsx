
const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM
const { Route, Routes } = ReactRouterDOM


import { EmailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx"
import { EmailDetails } from "../cmps/EmailDetails.jsx"

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [FilterBy, setFilterBy] = useState(EmailService.getDefaultFilter())
    const [composeSelected, setComposeSelected] = useState(null)

    useEffect(() => {
        console.log('FilterBy:', FilterBy)
        loadEmails(FilterBy)
    }, [FilterBy])

    function loadEmails(filter) {
        EmailService.query(filter).then((emails) => setEmails(emails))
    }

    // FINAL DELETE FROM LOCAL STORAGE FUNCTION!!!! check if email has removedAt and if it does activate this to finally delete
    // function onDeleteEmail(emailId) {
    //     EmailService.remove(emailId)
    //         .then(() => {
    //             // SET EMAIL REMOVED AT TO DATE NOW
    //             setEmails((prevEmails) => prevEmails.filter((email) => email.id !== emailId))
    //             //   showSuccessMsg(`Book Removed! ${bookId}`)
    //         })
    //         .catch((err) => {
    //             console.log('err:', err)
    //             //   showErrorMsg('Problem Removing ' + bookId)
    //         })
    // }

    function onDeleteEmail(emailId) {
        EmailService.get(emailId).then(email => {
            email.removedAt = Date.now()
            return email
        })
            .then(email => {
                EmailService.save(email).then(email => {
                    const idx = emails.findIndex(mail => mail.id === email.id)
                    let emailsCopy = [...emails]
                    emailsCopy[idx] = email
                    loadEmails(FilterBy)
                })

            })
            .catch(err => console.log('err:', err))
    }

    function onReadMail(email) {
        if (!emails) return
        const idx = emails.findIndex(mail => mail.id === email.id)
        emails[idx] = email
        setEmails([...emails])
    }


    // case txt : {...prevFilter, txt : value}
    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        if (filterBy.txt) {
            //  txt : {...prevFilter, txt : value}
            // ואז ממשיך לפילטורים הבאים לבאים
        }
        switch (filterBy) {
            case 'Deleted':
                setFilterBy((prevFilter) => ({ ...prevFilter, Deleted: true, Sent: false, Starred: false, Inbox: false }));
                break;
            case 'Sent':
                setFilterBy((prevFilter) => ({ ...prevFilter, Deleted: false, Sent: true, Starred: false, Inbox: false }));
                break;

            case 'Inbox':
                setFilterBy((prevFilter) => (EmailService.getDefaultFilter()));
                break;

            case 'Starred':
                setFilterBy((prevFilter) => ({ ...prevFilter, Deleted: false, Sent: false, Starred: true, Inbox: false }));
                break;

        }
    }
    function filterByTxt(value) {
        // console.log('value:', value)
        setFilterBy((prevFilter) => ({ ...prevFilter, txt: value }))
    }

    function handleChange({ target }) {
        let value = target.value
        filterByTxt(value)
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
                        <input className="search-input" type="text" name='txt' id='txt' placeholder="Search mail" onChange={handleChange} />
                        {/* <input value={txt} onChange={handleChange} type='text' placeholder='By Name' id='txt' name='txt' /> */}

                        <i className="fas fa-search search-icon"></i>
                    </div>
                </div>


                <img className="user-img" src="../assets/img/galImg.png" alt="" />
            </section>
            {/* SIDE NAV BAR COMPOMNENET */}
            <section className="side-navbar">
                <div>
                    <button className="btn-compose"><i className="fa-solid fa-pen"></i>Compose</button>
                    <div className="side-bar-icons">
                        <div onClick={() => onSetFilterBy('Inbox')} className="sidebar-icon"><span className="material-symbols-outlined icon">inbox</span><span>Inbox</span></div>
                        <div onClick={() => onSetFilterBy('Starred')} className="sidebar-icon"><span className="material-symbols-outlined icon">star</span><span>Starred</span></div>
                        <div onClick={() => onSetFilterBy('Sent')} className="sidebar-icon"><span className="material-symbols-outlined icon">send</span><span>Sent</span></div>
                        <div onClick={() => onSetFilterBy('Deleted')} className="sidebar-icon"><span className="material-symbols-outlined icon">delete</span><span>Deleted</span></div>
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

