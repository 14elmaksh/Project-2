const bookBtn = document.getElementById('BookBtn');



bookBtn.addEventListener("click", function(event){
    getBooks();
})

var pageurl = window.location.href;
console.log(pageurl)
var fetchurl = `${pageurl}/api/`;
console.log(fetchurl);

async function getBooks(){
    await fetch(fetchurl)
    .then(books => console.log(books))
}