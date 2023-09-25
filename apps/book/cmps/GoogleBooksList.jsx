export function GoogleBooksList({ books, onAddBook }) {
  return (
    <section className="google-books-list">
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <span>{book.volumeInfo.title}</span>
            <button onClick={() => onAddBook(book.id)}>+</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
