const express = require("express");

//Database
const database = require("./database");

//Initializing express
const booky = express();

/* 
Route              /
Description        Get all the books
Access             PUBLIC
Parameter          NONE
Methods            GET
*/
booky.get("/",(req,res) =>{
    return res.json({books: database.books});
});

/* 
Route              /is
Description        Get specific book on ISBN
Access             PUBLIC
Parameter          isbn
Methods            GET
*/
booky.get("/is/:isbn", (req,res)=> {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found fo the ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});
});

/* 
Route              /c
Description        Get specific book on Category
Access             PUBLIC
Parameter          category
Methods            GET
*/
booky.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    )
    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for the category of ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});
});

/* 
Route              /lang
Description        Get specific book on Language
Access             PUBLIC
Parameter          language
Methods            GET
*/
booky.get("/lang/:language", (req,res) => {
    const getspecificLanguage = database.books.filter(
        (book) => book.language.includes(req.params.language)
    );
    if(getspecificLanguage.length === 0){
        return res.json({error: `No book found for the language ${req.params.language}`});
    }
    return res.json({book: getspecificLanguage});
});

/* 
Route              /author
Description        Get All the authors
Access             PUBLIC
Parameter          NONE
Methods            GET
*/
booky.get("/author", (req,res) => {
    return res.json({authors: database.author});
});

/* 
Route              /author
Description        Get All the books based on specific Author
Access             PUBLIC
Parameter          id
Methods            GET
*/
booky.get("/author/id/:id", (req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );
    if(getSpecificAuthor.length === 0){
        return res.json({error: `No Books found for the Author ${req.params.id}`});
    }
    return res.json({author: getSpecificAuthor});
});

/* 
Route              /author/book
Description        Get All the authors based on books
Access             PUBLIC
Parameter          isbn
Methods            GET
*/
booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0){
        return res.json({
            error: `No author found for the book of ${req.params.isbn}`
        });
    }

    return res.json({authors: getSpecificAuthor});
});

/* 
Route              /publications
Description        Get All the Publication
Access             PUBLIC
Parameter          none
Methods            GET
*/
booky.get("/publications", (req,res) => {
    return res.json({publications: database.publication});
});

/* 
Route              /publications/name
Description        Get specific publications
Access             PUBLIC
Parameter          name
Methods            GET
*/
booky.get("/publications/name/:name", (req,res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.name.includes(req.params.name)
    );
    if(getSpecificPublication.length === 0){
        return res.json({error: `No publications based on the name ${req.params.name}`});
    }
    return res.json({publications: getSpecificPublication});
});

/* 
Route              /publications/book
Description        Get specific publications
Access             PUBLIC
Parameter          books
Methods            GET
*/
booky.get("/publications/book/:books", (req,res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.books)
    );
    if(getSpecificPublication.length === 0){
        return res.json({error: `No publications based on the book named ${req.params.books}`});
    }
    return res.json({publications: getSpecificPublication});
});

//Listening Port
booky.listen(3000, () => {
    console.log("Server is up and running");
});