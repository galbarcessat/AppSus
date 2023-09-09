const { Link } = ReactRouterDOM
const { useRef } = React
export function Home() {

    const cardsAppsRef = useRef(null);

    function scrollToCardsApps() {
        if (cardsAppsRef.current) {
            cardsAppsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }


    return <section className="home">
        <div className="home-big-logo">
            <img className="home-horse-img" src="../assets/img/horseImg.png" alt="" />
            <p>AppSus </p>
        </div>
        <p className="main-sentence">"Welcome to the ultimate app that brings together all your favorite applications in one place!
            <br />
            Discover the convenience of having everything you love at your fingertips."</p>
        <button onClick={() => scrollToCardsApps()} role="button" className="btn-get-started">Get Started <i className="fa-solid fa-arrow-down"></i></button>

        <h2 className="our-apps-title" ref={cardsAppsRef}>Our Apps</h2>
        <section className="cards-apps-container" >
            <div className="card-app">
                <div className="img-and-title-container">
                    <img className="card-app-img" src="../assets/img/gmailLogo.png" alt="" />
                    <h3>AppSus Mail</h3>
                </div>
                <p>"Effortlessly manage your email with our user-friendly AppSus mail app.
                    Stay organized, and streamline your inbox for effective communication on the go."</p>
                <button className="card-app-button"><Link to="/email">Learn more</Link></button>
            </div>
            <div className="card-app">
                <div className="img-and-title-container">
                    <img className="card-app-img" src="../assets/img/keepsLogo.png" alt="" />
                    <h3>AppSus Keeps</h3>
                </div>
                <p>"Capture your thoughts and ideas instantly. Enhance your notes with photos and more using AppSus Notes."</p>
                <button className="card-app-button"><Link to="/note">Learn more</Link></button>
            </div>
            <div className="card-app">
                <div className="img-and-title-container">
                    <img className="card-app-img" src="../assets/img/booksLogo.png" alt="" />
                    <h3>AppSus Books</h3>
                </div>

                <p>"Explore the world's largest collection of full-text books with our extensive index using the AppSus Books app."</p>
                <button className="card-app-button"><Link to="/book">Learn more</Link></button>
            </div>

        </section>

        <h2 className="our-team-title">Our Team</h2>
        <section className="team-cards-container">

            <div className="card-team">

                <img className="team-member-img" src="../assets/img/galTeamImg.png" alt="" />
                <div className="card-team-text">
                    <h4>Gal Ben Natan</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Dolorum perspiciatis iusto totam error aperiam itaque odio natus facilis a voluptatibus!</p>
                </div>

                <div className="links-container">
                    <a href="https://www.linkedin.com/in/gal-ben-natan-232342251/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/galbarcessat" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://www.instagram.com/gal.barcessat/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </div>

            <div className="card-team last-team-card">

                <img className="team-member-img" src="../assets/img/omerTeamImg.png" alt="" />
                <div className="card-team-text">
                    <h4>Omer Vered</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Dolorum perspiciatis iusto totam error aperiam itaque odio natus facilis a voluptatibus!</p>
                </div>

                <div className="links-container">

                    <a href="https://www.linkedin.com/in/omer-vered/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>

                    <a href="https://github.com/omervered" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://www.instagram.com/omervered27/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-instagram"></i>
                    </a>

                </div>
            </div>

            <footer>
                <p>&copy; 2023 AppSus. All rights reserved. Gal Ben Natan & Omer Vered.</p>
            </footer>
        </section>

    </section>
}