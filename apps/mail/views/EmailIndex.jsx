
const { useState, useEffect } = React
const { Route, Routes, useNavigate } = ReactRouterDOM


import { EmailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx"
import { EmailDetails } from "../cmps/EmailDetails.jsx"

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [FilterBy, setFilterBy] = useState(EmailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(null)
    const [sideMenuFolder, setSideMenuFolder] = useState('Inbox')
    const [composeSelected, setComposeSelected] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        console.log('FilterBy:', FilterBy)
        loadEmails(FilterBy, sortBy)
    }, [FilterBy, sortBy])

    function loadEmails(filter, sort) {
        EmailService.query(filter, sort).then((emails) => setEmails(emails))
    }

    

    // function getCurrentFolder() {

    // }

    function onToggleElement(email, element) {
        if (!emails) return
        console.log('email:', email)
        console.log('element:', element)
        if (element === 'star') {
            console.log('STAR CLICKED:')
            email.isStarred = !email.isStarred
        }
        else if (element === 'envelope') {
            console.log('ENVELOPE CLICKEDDDDDDDDDDDDDDD:')
            email.isRead = !email.isRead
            console.log('email.isRead:', email.isRead)
        }
        EmailService.save(email).then(email => {
            const idx = emails.findIndex(mail => mail.id === email.id)
            emails[idx] = email
            setEmails([...emails])
        })

    }

    // function onDeleteEmail(emailId) {
    //     EmailService.get(emailId).then(email => {
    //         email.removedAt = Date.now()
    //         return email
    //     })
    //         .then(email => {
    //             EmailService.save(email).then(email => {
    //                 const idx = emails.findIndex(mail => mail.id === email.id)
    //                 let emailsCopy = [...emails]
    //                 emailsCopy[idx] = email
    //                 loadEmails(FilterBy)
    //             })

    //         })
    //         .catch(err => console.log('err:', err))
    // }

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
                    console.log('EMAIL BEFORE first DELETE:', email)
                    EmailService.save(email).then(email => {
                        const idx = emails.findIndex(mail => mail.id === email.id)
                        let emailsCopy = [...emails]
                        emailsCopy[idx] = email
                        loadEmails(FilterBy)
                    })
                } else if (email.removedAt) {
                    console.log('EMAIL BEFORE FINAL DELETE:', email)
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
                setFilterBy((prevFilter) => ({ ...prevFilter, Deleted: true, Sent: false, Starred: false, Inbox: false }));
                break;
            case 'Sent':
                setFilterBy((prevFilter) => ({ ...prevFilter, Deleted: false, Sent: true, Starred: false, Inbox: false }));
                break;
            case 'Inbox':
                setFilterBy((EmailService.getDefaultFilter()));
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
    function onSetSortBy(sortBy) {
        if(sortBy === 'none'){
            setSortBy(null)
        } else setSortBy(sortBy)

        // if (sortBy === 'subject') {
        //     setSortBy(sortBy)
        // }else if(sortBy === 'date'){
        //     setSortBy(sortBy)
        // } else if(sortBy === 'isRead'){
        // setSortBy()
        // }else if (sortBy === 'none') {
        //     setSortBy(null)
        // }

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
                        <div onClick={() => {
                            navigate('/email')
                            onSetFilterBy('Inbox')
                            setSideMenuFolder('Inbox')
                        }}
                        className={"sidebar-icon " + (sideMenuFolder === 'Inbox' ? 'active' : '')}
                        ><span className="material-symbols-outlined icon">inbox</span><span>Inbox</span>
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
                        className={"sidebar-icon " + (sideMenuFolder === 'Deleted' ? 'active' : '')}><span className="material-symbols-outlined icon">delete</span><span>Deleted</span>
                        </div>
                    </div>
                </div>

            </section>
            {/* SORT EMAILS COMPONENET */}
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
                    <Route path="/Details/:emailId" element={<EmailDetails onDeleteEmail={onDeleteEmail} onReadMail={onReadMail} />} />
                </Routes>

                {/* COMPOSE MODAL HERE WITH &&ComposeIsSelected poistion fixed */}
            </section>
        </section>
    )
}

