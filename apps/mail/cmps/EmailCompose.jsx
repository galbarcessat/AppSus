

export function EmailCompose({ onCloseCompose }) {

    return (
        <section className="compose-modal-container">

            <div className="compose-header"><p>New Message</p><span><i onClick={() => onCloseCompose()} className="fa-solid fa-x"></i></span></div>
            <form action="">
                <input type="text" name="to" placeholder="To" />
                <div className='line'></div>
                <input type="text" name="subject" placeholder="Subject" />
                <div className='line'></div>
                <input type="text" name="body" id="compose-body" className="compose-body" />
                <div className="form-lower-buttons">
                    <button>Send</button>
                    <i onClick={() => onCloseCompose()} className="fa-regular fa-trash-can"></i>
                </div>
            </form>
        </section>
        // <div>Compose Modal!!</div>
    )
}
