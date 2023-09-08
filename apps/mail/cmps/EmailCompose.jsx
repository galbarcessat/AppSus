import { EmailService } from "../services/email.service.js"
const { useState } = React
export function EmailCompose({ onCloseCompose }) {
    const [emailToEdit, setEmailToEdit] = useState(EmailService.getEmptyEmail())


    function onSendEmail(ev) {
        ev.preventDefault()
        const updatedEmail = { ...emailToEdit, sentAt: Date.now() };

        EmailService.save(updatedEmail).then(email => {
            onCloseCompose()
        })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setEmailToEdit((prevEmailToEdit) => ({ ...prevEmailToEdit, [field]: value }))

    }

    return (
        <section className="compose-modal-container">

            <div className="compose-header"><p>New Message</p><span><i onClick={() => onCloseCompose()} className="fa-solid fa-x"></i></span></div>
            <form action="" onSubmit={() => onSendEmail(event)}>
                <input required onChange={handleChange} type="email" name="to" placeholder="To" />

                <div className='line'></div>

                <input required onChange={handleChange} type="text" name="subject" placeholder="Subject" />

                <div className='line'></div>

                <input required onChange={handleChange} type="text" name="body" id="compose-body" className="compose-body" />

                <div className="form-lower-buttons">
                    <button>Send</button>
                    <i onClick={() => onCloseCompose()} className="fa-regular fa-trash-can"></i>
                </div>
            </form>

        </section>
    )
}
