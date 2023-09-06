const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/">
        <h3 className="app-header-title"><i className="fa-solid fa-horse-head"></i>AppSus</h3>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
      </nav>
    </header>
  )
}
