// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { noteService } from '../../note/services/note.service.js'

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
    getDefaultFilter,
    getEmptyEmail,
    convertEmailToNote

}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {

        emails = [{
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com',
            labels: []
        }, {
            id: 'e102',
            subject: 'Happy to see you!',
            body: 'I was so happy to see you yesterday at the club would like to meet.',
            isRead: false,
            isStarred: false,
            sentAt: 1521133930594,
            removedAt: null,
            from: 'galbarcessat@gmail.com',
            to: 'user@appsus.com',
            labels: []
        }, {
            id: 'e103',
            subject: 'Gift!',
            body: 'Hello, you have a secret gift waiting for you in this email',
            isRead: false,
            isStarred: false,
            sentAt: 1351133932594,
            removedAt: null,
            from: 'omerVered@gmail.com',
            to: 'user@appsus.com',
            labels: []
        },
        {
            id: 'e104',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            isStarred: false,
            sentAt: 1531133933594,
            removedAt: null,
            from: 'test@gal.com',
            to: 'user@appsus.com',
            labels: []
        },
        {
            id: 'e105',
            subject: 'Coding Academy July 2023!',
            body: 'Coding is life',
            isRead: false,
            isStarred: false,
            sentAt: 1251122930594,
            removedAt: null,
            from: 'dog@test.com',
            to: 'user@appsus.com',
            labels: []
        },
        {
            id: 'e106',
            subject: 'Testing AppSus',
            body: 'AppSuS web is the best app on earth bla bla bla ',
            isRead: false,
            isStarred: false,
            sentAt: 1651122933594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'Coding@hey.com',
            labels: []
        },
        {
            id: 'e107',
            subject: 'Hey hey',
            body: 'Hey hey hey hey hey hey hey hey hey hey hey hey hey ',
            isRead: false,
            isStarred: false,
            sentAt: 1622323930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'eyalB@hello.com',
            labels: []
        }, {
            id: 'e108',
            subject: 'You got rich!',
            body: 'Money money a lot of moeny you are now rich',
            isRead: false,
            isStarred: false,
            sentAt: 1422322230294,
            removedAt: null,
            from: 'money@appsus.com',
            to: 'user@appsus.com',
            labels: []
        }, {
            id: 'e109',
            subject: 'React applications',
            body: 'With react you can make a lot of dynamic applications',
            isRead: false,
            isStarred: false,
            sentAt: 1622322930222,
            removedAt: null,
            from: 'reactWeb@appsus.com',
            to: 'user@appsus.com',
            labels: []
        }, {
            id: 'e110',
            subject: 'LongTxt',
            body: 'Hey testing longTxt lets see if it will work.still testing needs to get many words! more words and more words',
            isRead: false,
            isStarred: false,
            sentAt: 1622444430222,
            removedAt: null,
            from: 'LongTxt@walla.com',
            to: 'user@appsus.com',
            labels: []
        },
        {
            id: 'e111',
            subject: 'Dream job',
            body: 'hey this is a mail from your dream job, you have passed the first phase.',
            isRead: false,
            isStarred: false,
            sentAt: 1655544430222,
            removedAt: null,
            from: 'Dreamjob@walla.com',
            to: 'user@appsus.com',
            labels: []
        },


        ]

        utilService.saveToStorage(STORAGE_KEY, emails)
    }
    // console.log('emails:', emails)

}

function query(filterBy, sortBy) {
    return storageService.query(STORAGE_KEY).then((emails) => {

        if (filterBy) {

            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                emails = emails.filter((email) => (regex.test(email.subject) && !email.removedAt))
            } if (filterBy.All) {
                // console.log('FILTERING BY ALL')
                emails = emails.filter((email) => !email.removedAt)
            }
            else if (filterBy.Deleted) {
                // console.log('FILTERING BY DELETE')
                emails = emails.filter((email) => email.removedAt !== null)
            }
            else if (filterBy.Sent) {
                // console.log('FILTERING BY SENT')
                emails = emails.filter((email) => (email.from === loggedinUser.email && !email.removedAt))
            }
            else if (filterBy.Starred) {
                // console.log('FILTERING BY STARRED')
                emails = emails.filter((email) => email.isStarred && !email.removedAt)
            } else if (filterBy.Inbox) {
                // console.log('FILTERING BY INBOX')
                emails = emails.filter(email => (email.from !== loggedinUser.email && !email.removedAt))
            }
        }
        if (sortBy) {
            if (sortBy === 'subject') {
                console.log('SORTING BY SUBJECT:')
                emails = emails.sort((email1, email2) => {
                    if (email1.subject < email2.subject) return -1;
                    else if (email1.subject > email2.subject) return 1;
                    return 0;
                })
            } else if (sortBy === 'date') {
                emails = emails.sort((email1, email2) => email2.sentAt - email1.sentAt)
            } else if (sortBy === 'isRead') {
                emails = emails.sort((email1, email2) => {
                    if (email1.isRead && !email2.isRead) {
                        return -1
                    } else if (!email1.isRead && email2.isRead) {
                        return 1
                    }
                })
            } else if (sortBy === 'isStarred') {
                emails = emails.sort((email1, email2) => {
                    if (email1.isStarred && !email2.isStarred) {
                        return -1
                    } else if (!email1.isStarred && email2.isStarred) {
                        return 1
                    }
                })
            }

        }
        console.log('emails', emails)

        return emails
    })
}



function get(emailId) {
    return storageService.get(STORAGE_KEY, emailId)
}


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
    return { txt: '', Deleted: false, Starred: false, Sent: false, Inbox: true, All: false }

}

function getEmptyEmail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: '',
        removedAt: null,
        from: 'user@appsus.com',
        to: '',
        labels: []
    }
}

function convertEmailToNote(email) {
    let { subject, body } = email
    return {
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: noteService._makeRandBackgroundColor()
        },
        info: {
            txt: subject + "-" + body
        }
    }
}