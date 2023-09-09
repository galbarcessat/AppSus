
export function TopNavBar({ handleChange, toggleSideMenu }) {


    return (
        <section className="top-navbar">
            <div className="input-and-side-content">

                <div className="top-navbar-left-content">
                    <i onClick={() => toggleSideMenu()} className="fa-solid fa-bars menu-icon"></i>
                    <img className="img-gmail-logo" src="assets/img/gmailLogo.png" alt="" />
                    <span className="gmail-txt">Gmail</span>
                </div>

                <div className="input-container">
                    <input className="search-input" type="text" name='txt' id='txt' placeholder="Search mail" onChange={handleChange} />
                    <i className="fas fa-search search-icon"></i>
                </div>
            </div>

            <img className="user-img" src="assets/img/galTeamImg.png" alt="" />
        </section>
    )
}