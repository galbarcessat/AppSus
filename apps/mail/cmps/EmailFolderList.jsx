const { useNavigate } = ReactRouterDOM

export function EmailFolderList({ onSetFilterBy, setSideMenuFolder, sideMenuFolder, onOpenCompose, isReadCount }) {
    const navigate = useNavigate()

    return (
        <section className="side-navbar">
            <div>
                <button onClick={onOpenCompose} className="btn-compose"><i className="fa-solid fa-pen"></i>Compose</button>

                <div className="side-bar-icons">
                    <div onClick={() => {
                        navigate('/email')
                        onSetFilterBy('Inbox')
                        setSideMenuFolder('Inbox')
                    }}
                        className={"sidebar-icon count-container " + (sideMenuFolder === 'Inbox' ? 'active' : '')}>
                        <div>
                            <span className="material-symbols-outlined icon">inbox</span>
                            <span>Inbox</span>
                        </div>
                        <span className="isRead-counter">{isReadCount}</span>
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
                        className={"sidebar-icon " + (sideMenuFolder === 'Deleted' ? 'active' : '')}><span className="material-symbols-outlined icon">delete</span><span>Trash</span>
                    </div>
                    <div onClick={() => {
                        navigate('/email')
                        onSetFilterBy('All')
                        setSideMenuFolder('All')
                    }}
                        className={"sidebar-icon " + (sideMenuFolder === 'All' ? 'active' : '')}><span className="material-symbols-outlined icon">stacked_email</span><span>All Mail</span>
                    </div>
                </div>
            </div>

        </section>
    )
}