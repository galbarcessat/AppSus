
const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM

import { EmailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx"
import { EmailDetails } from "../cmps/EmailDetails.jsx"

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [emailSelected, setSelectedEmail] = useState(false)

    useEffect(() => {
        EmailService.query().then((emails) => setEmails(emails))
    }, [])


    function toggleView(email) {

        setSelectedEmail((prevState) => {
            if (!prevState) {
                return email
            }else if(prevState){
                return null
            }
        })
    }

    function onDeleteEmail(emailId) {
        EmailService.remove(emailId)
            .then(() => {
                setEmails((prevEmails) => prevEmails.filter((email) => email.id !== emailId))
                //   showSuccessMsg(`Book Removed! ${bookId}`)
            })
            .catch((err) => {
                console.log('err:', err)
                //   showErrorMsg('Problem Removing ' + bookId)
            })
    }



    if (!emails) return <div>Loading...</div>
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
                {!emailSelected && <EmailList emails={emails} onDeleteEmail={onDeleteEmail} toggleView={toggleView} />}
                {emailSelected && <EmailDetails toggleView={toggleView} emailSelected={emailSelected}/>}
                {/* <Outlet />  ??? or && for the email details */}
            </section>
        </section>
    )
}

