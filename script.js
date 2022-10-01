let library; 
const DEFAULT_DATA = [
    {name: "Lord of the Rings", author:"Tolkien", status:"not read"},
    {name: "Alice in Wonderland", author:"Lewis Caroll" ,status:"read"},
    {name: "Naruto", author: "Masashi Kishimoto", status: "read"},
];

const $name = document.querySelector('#name');
const $author = document.querySelector('#author');
const $status = document.querySelector('#status');
const $tablebody = document.querySelector('#book-table-body');
const $form = document.querySelector("form").addEventListener("submit", (e) =>{
    e.preventDefault(); 
    addBookToLibrary(); 
    render(); 
    clearForm(); 
});

const $table = document.querySelector("table")
    .addEventListener("click", (e) =>{
        if(e.target.innerHTML == "delete"){
            if(confirm('are you sure you want to delete ${currentTarget.innerText}'))
                deleteBook(findBook(library, currentTarget.innerText));
        }
        if(e.target.classList.contains("status-button")){
            changeStatus(findBook(library, currentTarget.innerText));
        }
        updateLocalStorage(); 
        render(); 
    });

class Book{
    constructor(name, author, status){
        this.name = name; 
        this.author = author;
        this.status = status; 
    }
}

function addBookToLibrary(){
    if($name.value.length === 0 || $author.value.length === 0){
        alert('Please, fill all the fields');
        return;
    }
    const newBook = new Book($name.value, $author.value, $status.value);
    library.push(newBook); 
    updateLocalStorage(); 
}

function changeStatus(book){
    if(library[book].status === "read"){
        library[book].status = "not read"; 
    } else library[book].status = "read"; 
}

function deleteBook(currentBook){
    library.splice(currentBook, currentBook + 1);
}

function findBook(libraryArr, name){
    if(libraryArr.length === 0 || libraryArr === null){
        return; 
    }
    for(book of libraryArr)
    if (book.name === name){
        return libraryArr.indexOf(book); 
    }
    
}

function clearForm(){
    $name.value = ""; 
    $author.value = ""; 
}

function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
}

function checkLocalStorage(){
    if(localStorage.getItem("libray")){
        library = JSON.parse(localStorage.getItem("library"));
    }else{
        library = DEFAULT_DATA; 
    }
}

function render() {
    checkLocalStorage(); 
    $tablebody.innerHTML = "";
    library.forEach((book) => {
        const htmlBook = `
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td><button class="status-button">${book.status}</button></td>
            <td><button class="delete">delete</button></td>
        </tr>
        `;
        $tablebody.insertAdjacentHTML("afterbegin", htmlBook);
    });
}

render(); 