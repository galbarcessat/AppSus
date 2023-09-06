
const { useState, useEffect } = React
import { EmailService } from "../services/email.service.js"
import { EmailList } from "../cmps/EmailList.jsx"

export function EmailIndex() {
    const [emails, setEmails] = useState(null)

    useEffect(() => {
        EmailService.query().then((emails) => setEmails(emails))
    }, [])

    if (!emails) return <div>Loading...</div>
    return (
        <section className="email-app-container">
            {/*TOP NAV COMPONENET*/}
            <section className="top-navbar">
                <div className="top-navbar-left-content">
                    <i className="fa-solid fa-bars menu-icon"></i>
                    <img className="img-gmail-logo" src="../assets/img/gmailLogo.png" alt="" />
                    <span className="gmail-txt">Gmail</span>
                </div>
                <div className="input-container">
                    <input className="search-input" type="text" placeholder="Search mail" />
                    <i className="fas fa-search search-icon"></i>
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
                {/* EMAIL LIST */}
            </section>
            <EmailList emails={emails} />
        </section>
    )
}

