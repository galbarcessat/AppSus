
export function Home() {
    return <section className="home">
        <div className="home-big-logo">
            <img className="home-horse-img" src="../assets/img/horseImg.png" alt="" />
            <p>AppSus </p>
        </div>
        <p className="main-sentence">"Welcome to the ultimate app that brings together all your favorite applications in one place!
            <br />
            Discover the convenience of having everything you love at your fingertips."</p>
        <button role="button" className="btn-get-started">Get Started <i className="fa-solid fa-arrow-down"></i></button>
    </section>
}