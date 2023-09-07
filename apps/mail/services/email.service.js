// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const STORAGE_KEY = 'emailsDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Gal Omer'
}

_createEmails()

export const EmailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter

}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {

        emails = [{
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        }, {
            id: 'e102',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1521133930594,
            removedAt: null,
            from: 'galbarcessat@gmail.com',
            to: 'user@appsus.com'
        }, {
            id: 'e103',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1351133932594,
            removedAt: null,
            from: 'omerVered@gmail.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e104',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1531133933594,
            removedAt: null,
            from: 'test@gal.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e105',
            subject: 'Coding Academy July 2023!',
            body: 'Coding is life',
            isRead: false,
            sentAt: 1251122930594,
            removedAt: null,
            from: 'dog@test.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e106',
            subject: 'Testing AppSus',
            body: 'AppSuS web is the best app on earth bla bla bla ',
            isRead: false,
            sentAt: 1651122933594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'Coding@hey.com'
        },
        {
            id: 'e107',
            subject: 'Hey hey',
            body: 'Hey hey hey hey hey hey hey hey hey hey hey hey hey ',
            isRead: false,
            sentAt: 1622323930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'eyalB@hello.com'
        },]

        utilService.saveToStorage(STORAGE_KEY, emails)
    }
    // console.log('emails:', emails)
}
// FilterBy = { Deleted: false, Starred: false, Sent: false }
function query(filterBy) {
    return storageService.query(STORAGE_KEY).then((emails) => {
        console.log('filterBy:', filterBy)
        console.log('emails:', emails)
        // INBOX STATE
        // emails = emails.filter(email => (email.removedAt === null && email.from !== loggedinUser.email))

        if (filterBy) {

            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                emails = emails.filter((email) => (regex.test(email.subject) && !email.removedAt))
                console.log('books', emails)
            }
            if (filterBy.Deleted) {
                console.log('FILTERING BY DELETE')
                emails = emails.filter((email) => email.removedAt !== null)
            }
            else if (filterBy.Sent) {
                console.log('FILTERING BY SENT')
                emails = emails.filter((email) => (email.from === loggedinUser.email && !email.removedAt))
            }
            else if (filterBy.Starred) {
                console.log('FILTERING BY STARRED')
                emails = emails.filter((email) => email.Starred && !email.removedAt)
                // emails = emails.filter((email) => email.Starred === true)
            } else if (filterBy.Inbox) {
                console.log('FILTERING BY INBOX')
                emails = emails.filter(email => (email.from !== loggedinUser.email && !email.removedAt))
            }
        }
        console.log('emails', emails)

        return emails
    })
}

function get(emailId) {
    return storageService.get(STORAGE_KEY, emailId)
}

// function get(bookId) {
//     return storageService.get(STORAGE_KEY, bookId).then((book) => {
//         book = _setNextPrevBookId(book)
//         return book
//     })
// }

function remove(emailId) {
    return storageService.remove(STORAGE_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(STORAGE_KEY, email)
    } else {
        return storageService.post(STORAGE_KEY, email)
    }
}


function getDefaultFilter() {
    return { txt: '', Deleted: false, Starred: false, Sent: false, Inbox: true }

}