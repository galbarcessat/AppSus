export function EmailSort({ onSetSortBy }) {

    return (
        <section className="sort-emails-container">
            <button onClick={() => onSetSortBy('isRead')}>Read</button>
            <button onClick={() => onSetSortBy('isStarred')}>Starred</button>
            <button onClick={() => onSetSortBy('date')}>Date</button>
            <button onClick={() => onSetSortBy('subject')}>Subject</button>
            <button onClick={() => onSetSortBy('none')}>No Sort</button>
        </section>

    )

}