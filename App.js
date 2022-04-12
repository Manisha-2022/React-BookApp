import  React, {useState, useEffect} from "react";
//import api from "../src/components/api/books";
// import logo from './logo.svg';
import { View } from "./components/view";

//getting values from local storage
 const getDatafromLS=() =>{
  const data= localStorage.getItem("books");
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
 }

 export const App = () => {

//books array of object
  const [books, setBooks]=useState(getDatafromLS());


//input field states
  const [title, setTitle]=useState('');
  const [author, setAuthor]=useState('');
  const [publishingYear, setPublishingYear]=useState('');
  const [isbn, setISBN]=useState('');


//form submit event
  const handleAddBookSubmit=(e) =>{
    e.preventDefault();

  //creating an object
  let book={
    title,
    author,
    publishingYear,
    isbn
  }
    setBooks([...books,book]);
    setTitle('');
    setAuthor('');
    setPublishingYear('');
    setISBN('');
  }

  //delete book from LS
  const deleteBook=(isbn) =>{
    const filteredBooks= books.filter((element,index) =>{
      return element.isbn !== isbn
    })
    setBooks(filteredBooks);
  }

  //saving in local storage
   useEffect(()=> {
      localStorage.setItem("books",JSON.stringify(books));
   },[books])

  return (
    <div className="wrapper">
     <h1> BookList App </h1>
     <p> Add And View yours books </p>
     <div className="main">

       <div className="form-container">
         <form autocomplete="off" className="form-group"
         onSubmit={handleAddBookSubmit}>
           <label> Title </label>
           <input type= "text" className="form-control" required 
           onChange={(e)=>setTitle(e.target.value)} value={title}></input>
           <br></br><br></br>
           <label> Author </label>
           <input type= "text" className="form-control" required 
           onChange={(e)=>setAuthor(e.target.value)} value={author}></input>
           <br></br><br></br>
           <label> Publishing Year </label>
           <input type= "text" className="form-control" required 
           onChange={(e)=>setPublishingYear(e.target.value)} value={publishingYear}></input>
           <br></br><br></br>
           <label> ISBN </label>
           <input type= "text" className="form-control" required 
           onChange={(e)=>setISBN(e.target.value)} value={isbn}></input>
           <br></br><br></br>
           <button type="submit" className="btn"> 
             ADD
           </button>
           </form>
         </div>

         <div className="view-container">
         {books.length > 0 && <> 
          <div className="table-responsive"> 
            <table className="table">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Publishing Year</th>
                  <th>Titlen</th>
                  <th>Author</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                 <View books={books} deleteBook={deleteBook}/>  
              </tbody> 
              </table>
          </div>
          <button className="btn-danger" onClick={() => setBooks([])}> Remove All</button>
          </>}
           {books.length < 1 && <div> No Books Are Added Yet!</div>}
         </div>
       </div>
    </div>
  )
}

export default App
