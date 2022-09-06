import React, { useState } from 'react' ;
import axios from "axios" ;
import "./search.css";

function Search() {
    const apikey = "AIzaSyBIiK4JSgjwsd0S1gwsNG2SG1z6p4yYXRY";
    const [search, setSearch] = useState(""); //take input from user
    const [searchResults, setSearchResults] = useState([]); //array of objects./
    const [showDescription, setShowDescription] = useState(false);
    const [bookName, setBookName] = useState("")
    //console.log(search)

    const getData = async () => {
        console.log("function called")
        const response = await axios.get(
           `https://www.googleapis.com/books/v1/volumes?q=${search}&orderBy=newest&key=${apikey}`
        );
        const result = await response.data.items; //array of objects containing book info  
        console.log(result);
        setSearchResults(result);   
    };
    return(
       
        <div>
            <div className="header">
                <h1> Athenaeum </h1>
            </div>
            <div className="searchBar">
                <input className="searchInput" type="text" placeholder='search for any book' onChange={(e) => setSearch(e.target.value)} />
                <button className="searchButton" onClick = {() => getData()}>search</button>
            </div>
            <div className="results">
            {searchResults.map ((books, key) => {
                return(
                    <ul key={key} className= "resultsWrapper">
                        <img className="image" src={books.volumeInfo.imageLinks.thumbnail} alt="book cover" />
                        <li className="booktitle"> Title : {books.volumeInfo.title}</li>
                        <li className="authorname"> {books.volumeInfo.authors[0]}</li>
                        <button onClick={()=> {setShowDescription(!showDescription); setBookName(books.volumeInfo.title) }}>Read Me</button>
                        <div>
                            {showDescription && bookName === books.volumeInfo.title ? <p>{books.volumeInfo.description}</p> : null}
                            {/* first we check if showDescription is true, then we check if the bookName for wich the user clicked on readme 
                            is same as what we are displaying description for */}
                        </div> 
                    </ul>
                )
            })}
            
            </div>
        </div >          
    )
}

export default Search
