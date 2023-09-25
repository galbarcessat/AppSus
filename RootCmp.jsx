const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { EmailIndex } from "./apps/mail/views/EmailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { BookIndex } from "./apps/book/views/BookIndex.jsx"
import { BookDetails } from "./apps/book/views/BookDetails.jsx"
import { AddReview } from "./apps/book/views/AddReview.jsx"
import { BookEdit } from "./apps/book/views/BookEdit.jsx"
import { AddBook } from "./apps/book/views/AddBook.jsx"


export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/email/*" element={<EmailIndex />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/book" element={<BookIndex />} />
                <Route path='/book/:bookId' element={<BookDetails />} />
                <Route path='/book/review/:bookId' element={<AddReview />} />
                <Route path='/book/edit/:bookId' element={<BookEdit />} />
                <Route path='/book/edit' element={<BookEdit />} />
                <Route path='/book/add' element={<AddBook />} />
            </Routes>
        </section>
    </Router>
}


