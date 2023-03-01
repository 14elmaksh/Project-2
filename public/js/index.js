const bookBtn = document.getElementById('BookBtn');
const libEl = document.getElementById('bookContainer');
//const template = Handlebars.compile(getBookData);


bookBtn.addEventListener("click", function (event) {
    getBooks();
})

var pageurl = window.location.href.split('#')[0];


//console.log(pageurl)
var fetchurl = `${pageurl}api/book`;
//console.log(fetchurl);

function getBooks() {
    fetch(fetchurl)
        .then(response => response.json())
        .then(books => {
            let booklist = JSON.parse(JSON.stringify(books));
            var libraryStr = "";

            booklist.forEach(book => {
                let str = `${book.title} - ${book.author} | $${book.price} \n`;
                libraryStr += str;
            });

            console.log(libraryStr);
            alert(libraryStr)
        });

};