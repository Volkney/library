const form = document.querySelector("form");
const labels = document.querySelector("label");
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const status = document.getElementById('status');
const plusBookButton = document.getElementById('add-book');
const leftBlockPopUp = document.getElementById('left-block');
const bgColor = "hsla(0, 0%, 88%, 1)";
const whiteColor = "hsla(0, 0%, 99%, 1)";
const rightBlock = document.getElementById('right-block');


status.addEventListener("click", function() {
    // Toggle the value of the checkbox between "on" and "off"
    if (this.checked) {
      this.value = "on";
    } else {
      this.value = "off";
    }
  });

plusBookButton.addEventListener('click', function(event){
    event.stopPropagation();
    document.getElementById("overlay").style.display = "block";
    //transition out
    leftBlockPopUp.style.transitionTimingFunction = 'ease-in';
    leftBlockPopUp.style.transition = '0.6s';
    leftBlockPopUp.style.transform = 'translateY(0)';
    leftBlockPopUp.style.visibility = 'unset';
});  

function hidePopUp(){
    leftBlockPopUp.style.visibility = 'hidden';
    //transition in
    document.getElementById("overlay").style.display = "none";
    leftBlockPopUp.style.transitionTimingFunction = 'ease-out';
    leftBlockPopUp.style.transition = '0.6s';
    leftBlockPopUp.style.transform = 'translateY(180%)';
}
document.addEventListener('click', function(event){
    if (event.target.closest('#left-block') || event.target === plusBookButton) {
        // If the clicked element is inside the leftBlockPopUp or plusBookButton was clicked, do nothing
        return;
    }
    hidePopUp();
});

let titleValue = '';
let authorValue = '';
let pagesValue = '';
let statusValue = 0;

function Book(title, author, pages, status) {
  // the constructor...
  this.titleName = title;
  this.authorName = author;
  this.NumberOfPages = pages;
  this.readOrNotRead = status;
}


form.addEventListener("input", updateValue);

function updateValue(e) {
  console.log(e.target.value);
}


let myLibrary = [];

  function addBookToLibrary() {
    // Get input values
    const titleValue = title.value;
    const authorValue = author.value;
    const pagesValue = pages.value;
    let statusValue = status.value;
  
    if (statusValue === 'on') {
      statusValue = "read";
    } else {
      statusValue = "Not read";
    }
  
    // Create new book object
    const newBook = new Book(titleValue, authorValue, pagesValue, statusValue);
  
    // Add new book object to myLibrary array
    myLibrary.push(newBook);
  
    // Create new book div element and add class based on index
    const newBookDiv = document.createElement('div');
    newBookDiv.classList.add(`book${myLibrary.indexOf(newBook)}`);
    newBookDiv.classList.add(`book-collection`);
  
    // Create new book title element and append to book div
    const newTitleDiv = document.createElement('div');
    newTitleDiv.innerHTML = `Title: ${newBook.titleName}`;
    newBookDiv.appendChild(newTitleDiv);
  
    // Create new book author element and append to book div
    const newAuthorDiv = document.createElement('div');
    newAuthorDiv.innerHTML = `Author: ${newBook.authorName}`;
    newBookDiv.appendChild(newAuthorDiv);
  
    // Create new book page amount element and append to book div
    const newPagesDiv = document.createElement('div');
    newPagesDiv.innerHTML = `Pages: ${newBook.NumberOfPages}`;
    newBookDiv.appendChild(newPagesDiv);
  
    // Create new book status element and append to book div
    const newStatusContainer= document.createElement('div');
    const newStatusSpan = document.createElement('span');
    newStatusSpan.innerHTML = `Read: `;
    newStatusContainer.appendChild(newStatusSpan);
    const newStatusDiv = document.createElement('label');
    const newStatusLabel = document.createElement('span');
    const newStatusInput = document.createElement('input');
    newStatusInput.setAttribute('type', 'checkbox');
    newStatusInput.setAttribute('class', 'book-status');
    newStatusDiv.setAttribute('class', 'switch');
    newStatusLabel.setAttribute('class', 'slider');
    newStatusInput.checked = statusValue === 'read';
    newStatusInput.setAttribute('value', statusValue === 'read' ? '1' : '0');
    
    newStatusDiv.appendChild(newStatusInput);
    newStatusDiv.appendChild(newStatusLabel);
    newStatusContainer.appendChild(newStatusDiv);
    newBookDiv.appendChild(newStatusContainer);
  
    // Create new remove button element and append to book div
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
        // Find the index of the book in the array
        const bookIndex = myLibrary.indexOf(newBook);
        // Remove the book from the array
        myLibrary.splice(bookIndex, 1);
        // Remove the book div from the DOM
        newBookDiv.remove();
    });
    const buttonDiv = document.createElement('div');
    buttonDiv.appendChild(removeButton);
    newBookDiv.appendChild(buttonDiv);
  
    // Append book div to center-grid
    const centerGrid = document.querySelector('.center-grid');
    centerGrid.appendChild(newBookDiv);
    
    // Return new book object
    return newBook;
}
  
function clearBookValues(){
	titleValue = '';
    authorValue = '';
    pagesValue = '';
    statusValue = 0;
    title.value = '';
    author.value = '';
    pages.value = '';
    status.value = 0;
}
function displayArray(){
	for (let i = 0; i< myLibrary.length; i++){
			 console.table(myLibrary[i]);
	    }
    }
  

form.addEventListener('submit', function(event){
    
		addBookToLibrary();
		displayArray();
        clearBookValues();
        hidePopUp();
        event.preventDefault();

});
