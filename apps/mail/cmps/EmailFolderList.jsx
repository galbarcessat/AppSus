const { useNavigate } = ReactRouterDOM

export function EmailFolderList({ onSetFilterBy, setSideMenuFolder, sideMenuFolder, onOpenCompose, isReadCount, sideMenuState }) {
    const navigate = useNavigate()

    const dynComposeClass = sideMenuState ? 'compose-hidden' : ''
    
    return (
        <section className="side-navbar">
            <div className="side-navbar-inner-container">
                <button onClick={onOpenCompose} className={"btn-compose " + dynComposeClass}>
                    <span className="material-symbols-outlined">edit</span>
                    {!sideMenuState && <span className="side-txt">Compose</span>}</button>
                <div className="side-bar-icons">
                    <div onClick={() => {
                        navigate('/email')
                        onSetFilterBy('Inbox')
                        setSideMenuFolder('Inbox')
                    }}
                        className={"sidebar-icon count-container " + (sideMenuFolder === 'Inbox' ? 'active' : '')}>
                        <div>
                            <span className="material-symbols-outlined icon">inbox</span>
                            {!sideMenuState && <span className="side-txt" >Inbox</span>}
                        </div>
                        {<span className="isRead-counter">{isReadCount}</span>}
                    </div>
                    <div onClick={() => {
                        navigate('/email')
                        onSetFilterBy('Starred')
                        setSideMenuFolder('Starred')
                    }}
                        className={"sidebar-icon " + (sideMenuFolder === 'Starred' ? 'active' : '')}><span className="material-symbols-outlined icon">star</span>{!sideMenuState && <span className="side-txt">Starred</span>}
                    </div>
                    <div onClick={() => {
                        navigate('/email')
                        onSetFilterBy('Sent')
                        setSideMenuFolder('Sent')
                    }}
                        className={"sidebar-icon " + (sideMenuFolder === 'Sent' ? 'active' : '')}><span className="material-symbols-outlined icon">send</span>{!sideMenuState && <span className="side-txt">Sent</span>}
                    </div>
                    <div onClick={() => {
                        navigate('/email')
                        onSetFilterBy('Deleted')
                        setSideMenuFolder('Deleted')
                    }}
                        className={"sidebar-icon " + (sideMenuFolder === 'Deleted' ? 'active' : '')}><span className="material-symbols-outlined icon">delete</span>{!sideMenuState && <span className="side-txt">Trash</span>}
                    </div>
                    <div onClick={() => {
                        navigate('/email')
                        onSetFilterBy('All')
                        setSideMenuFolder('All')
                    }}
                        className={"sidebar-icon " + (sideMenuFolder === 'All' ? 'active' : '')}><span className="material-symbols-outlined icon">stacked_email</span>{!sideMenuState && <span className="side-txt">All Mail</span>}
                    </div>
                </div>
            </div>

        </section>
    )
}

