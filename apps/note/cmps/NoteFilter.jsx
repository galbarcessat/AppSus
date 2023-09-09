const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log('value:', value)

        switch (target.type) {
            // case 'number':
            // case 'range':
            //     value = +value || ''
            //     break;

            // case 'checkbox':
            //     value = target.checked
            //     break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt } = filterByToEdit
    return (
        <section>
            <form className="filter-container" onSubmit={onSubmitFilter}>
                <input
                    className="filter-input" value={txt} onChange={handleChange} type="text" placeholder="Start typing to filter..." id="txt" name="txt"
                />
            </form>
        </section>
    )



}