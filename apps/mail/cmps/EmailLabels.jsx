export function EmailLabels({ onAddLabel }) {

    return (
        <div className="labels-container">
            <div onClick={() => onAddLabel('Critical')} className="label-row label-Critical">
                <span>Critical</span>
                <i className="fa-solid fa-check"></i>
            </div>
            <div onClick={() => onAddLabel('Work')} className="label-row label-Work">
                <span>Work</span>
                <i className="fa-solid fa-check"></i>
            </div>
            <div onClick={() => onAddLabel('Friends')} className="label-row label-Friends">
                <span>Friends</span>
                <i className="fa-solid fa-check"></i>
            </div>
            <div onClick={() => onAddLabel('Spam')} className="label-row label-Spam">
                <span>Spam</span>
                <i className="fa-solid fa-check"></i>
            </div>
            <div onClick={() => onAddLabel('Memories')} className="label-row label-Memories">
                <span>Memories</span>
                <i className="fa-solid fa-check"></i>
            </div>

        </div>
    )
}