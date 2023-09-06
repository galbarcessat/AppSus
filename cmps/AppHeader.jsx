const { Link, NavLink } = ReactRouterDOM
const { useState } = React
export function AppHeader() {
  const [menuState, setMenuState] = useState(false)

  let dynClass = menuState ? "icons-nav-container" : "icons-nav-container hide"
  console.log('dynClass:', dynClass)

  function toggleMenu() {
    setMenuState(prevState => !prevState)
    console.log('menuState:', menuState)
    // let dynClass = prevState ? "icons-nav-container" : "icons-nav-container hide"
    // return dynClass
  }

  return (
    <section>
      <header className="app-header">
        <Link to="/">
          <h3 className="app-header-title"><i className="fa-solid fa-horse-head"></i>AppSus</h3>
        </Link>
        <span onClick={() => toggleMenu()} className="main-menu-icon"><i className="fa-solid fa-bars"></i></span>
      </header>
      <div className={dynClass}>
        <nav>
          <ul className="main-nav-list">
            <li><NavLink to="/"> <div className="nav-item"><img className="main-nav-img" src="../assets/img/homeLogo.png" alt="" />Home</div></NavLink></li>
            <li><NavLink to="/mail"><div className="nav-item"><img className="main-nav-img" src="../assets/img/gmailLogo.png" alt="" />Gmail</div></NavLink></li>
            <li><NavLink to="/note"> <div className="nav-item"><img className="main-nav-img" src="../assets/img/keepsLogo.png" alt="" />Note</div></NavLink></li>
            <li><NavLink to="/book"> <div className="nav-item"><img className="main-nav-img" src="../assets/img/booksLogo.png" alt="" />Books</div></NavLink></li>
          </ul>
        </nav>
      </div>
    </section>

  )
}
