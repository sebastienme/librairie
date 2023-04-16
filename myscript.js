let myLibrary = [];
let idCount = 1;

function Book(author, title, nbPages, date, haveRead, id, display) {
  this.author = author;
  this.title = title;
  this.nbPages = nbPages;
  this.date = date;
  this.haveRead = haveRead;
  this.id = id;
  this.display = display;
}


let displayBooks = (librairie) => {

    for (let i = 0; i < librairie.length; i++) {
        let book = librairie[i];
        
        if (book.display === false) {
            author = book.author;
            title = book.title;
            page = book.nbPages;
            date = book.date;
            read = book.haveRead;
            id = book.id;
            book.display = true;
        
            const template = document.createElement('template');
        
            template.innerHTML = `
            <div class="cards-container__item deletable" data-id=${id}>
            <div class="cards-container__item__title">${title}</div>
            <div class="cards-container__item__sub-title">
                <div class="cards-container__item__sub-title__element">Auteur</div>
                <div class="cards-container__item__sub-title__value">${author}</div>
            </div>
            <div class="cards-container__item__bottom_wrapper">
                <div class="cards-container__item__bottom_wrapper__one">
                    <div class="cards-container__item__value">${page}</div>
                    <div class="cards-container__item__element">pages</div>
                </div>
                <div class="cards-container__item__bottom_wrapper__two">
                    <div class="cards-container__item__value">${date}</div>
                    <div class="cards-container__item__element">date</div>
                </div>
                <div class="cards-container__item__bottom_wrapper__three" data-id=${id}>
                    <div class="cards-container__item__value">${read}</div>
                    <div class="cards-container__item__element">lu</div>
                </div>
            </div>
            <div class="cards-container__item__close">
                <div class="cards-container__item__close__wrapper" data-id="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" width="20" height="20" id="close"><path d="M13.4,12l6.3-6.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4
                    l6.3,6.3l-6.3,6.3C4.1,18.5,4,18.7,4,19c0,0.6,0.4,1,1,1c0.3,0,0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.4,0.3,0.7,0.3
                    s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12z"></path></svg>
                </div>
            </div>
            </div>
            `;
        
            document.querySelector('.cards-container').insertBefore(template.content, document.querySelector('.cards-container__item'));
            
            removeCardActive();
            changeStatusActive();
        }
    }
}

function addBookToLibrary(book) {
    
    myLibrary.push(book);

    displayBooks(myLibrary);
}

const extraCard = document.querySelector('.cards-container__item.extra');
const bgFormSection = document.querySelector('.background-form-section');
const formSection = document.querySelector('.form-section');
const closeFormButton = document.querySelector('.form-close > a');


extraCard.addEventListener('click', () => {
    openForm();
});

let openForm = () => {
    bgFormSection.style.transform = "scale(1)";
    formSection.style.transform = "scale(1)";
    closeFormButton.addEventListener('click', () => {
        closeForm();
    })
}

let closeForm = () => {
    bgFormSection.style.transform = "scale(0)";
    formSection.style.transform = "scale(0)";
}

let clearValue = (inputs) => {
    inputs.forEach((element) => {
        if (element.type === 'text') {
            element.value = "";
        }
    });
}

const form = document.getElementById('book-form');
const inputs = document.querySelectorAll('#book-form input')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("page-number").value;
    let date = document.getElementById("date").value;
    let read = document.querySelector('input[name=read]:checked').value;


    let book = new Book(author, title, pages, date, read, idCount, false);

    addBookToLibrary(book);
    clearValue(inputs);
    closeForm();

    idCount++;
})

let removeCardActive = () => {
    const closeButton = document.querySelectorAll('.cards-container__item__close__wrapper');

    closeButton.forEach((element) => {
        element.addEventListener('click', () => {
            removeBookFromLibrairie(element.dataset.id);
        })
    })
}

let removeBookFromLibrairie = (id) => {
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        if (book.id == id) {
            removeBookFromDisplay(book.id);
            myLibrary.splice(i, 1)
        }
    }
}

let removeBookFromDisplay = (id) => {
    const cardBook = document.querySelectorAll('.cards-container__item.deletable');

    cardBook.forEach((element) => {

        if (element.dataset.id == id) {
            element.remove();
        }
    })
}

let changeStatusActive = () => {
    const readElement = document.querySelector('.cards-container__item__bottom_wrapper__three');
    
    readElement.addEventListener('click', () => {
        let dataId = readElement.getAttribute('data-id');
        let book = myLibrary.find(item => item.id == dataId);
        
        changeBookReadStatus(book);
        
        readElement.querySelector('.cards-container__item__value').innerHTML = book.haveRead;
        console.log(myLibrary)
    })
}

let changeBookReadStatus = (book) => {
    return book.haveRead == "Oui" ? book.haveRead = "Non" : book.haveRead = "Oui";
}

