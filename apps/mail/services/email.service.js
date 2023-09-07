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
        },]

        utilService.saveToStorage(STORAGE_KEY, emails)
    }
    console.log('emails:', emails)
}
// FilterBy = { Deleted: false, Starred: false, Sent: false }
function query(filterBy) {
    return storageService.query(STORAGE_KEY).then((emails) => {
        //NORMAL STATE FILTERS ALL THE EMAILS THAT revmovedAt === null if they have removed at they belong to filterby.deleted
        if (filterBy) {

            // if (filterBy.txt) {
            //     const regex = new RegExp(filterBy.txt, 'i')
            //     emails = emails.filter((book) => regex.test(book.title))
            //     console.log('books', emails)
            // }
            if (filterBy.Deleted) {
                //NEEDS SOME CHANGES TO THE REMOVED FUNCTION AND TO QUERY
                emails = emails.filter((email) => email.removedAt !== null)
            }
            else if (filterBy.Sent) {
                emails = emails.filter((email) => email.from === loggedinUser.email)
            }
            else if (filterBy.Starred) {
                emails = emails.filter((email) => email.Starred)
                // emails = emails.filter((email) => email.Starred === true)
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
    return { txt: '', Deleted: false, Starred: false, Sent: false }

}