import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './books.css';


function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const location = useLocation();
  const successMessage = location?.state?.successMessage;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://reactnd-books-api.udacity.com/books', {
          headers: {
            'Authorization': 'whatever-you-want'
          }
        });
        console.log(response);
        const fetchedBooks = response.data.books;
        setBooks(fetchedBooks);
        setFilteredBooks(fetchedBooks);      
    } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);
const filtersearch = (e) => {
  const query = e.target.value.toLowerCase();
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  
};
  function getStarRating(averageRating) {
    const yellowStar = "⭐";
    const grayStar = "☆";
    const maxRating = 5;
    const roundedRating = Math.round(averageRating);
  
    // Create an array of stars based on the rounded rating
    const stars = Array(maxRating)
      .fill(grayStar)
      .map((star, index) => (index < roundedRating ? yellowStar : star));

    return <div>{stars}</div>;
  }

  return (
    <>
    <input id='search' type="text" placeholder="Search Books"  onChange={filtersearch} />
    <div id='success'>
        {successMessage?<p>{successMessage}</p>:<p>Register to get free books</p>}
    </div>
    <div className="book-container" id="book-container">
        {filteredBooks.map((book) => (
        <div className="book" key={book.id}>
            <img className="book-thumbnail" src={book.imageLinks.thumbnail} alt={book.title} />
            <h2 className="book-title">
            <a href={book.previewLink}>{book.title}</a>
            </h2>
            <h3 className="book-authors">By {book.authors.map((author) => <div key={author}>{author}</div>)}</h3>
            <div className='additional'><div className='rating'>{getStarRating(book.averageRating)}</div><div className='status'>{successMessage?'Free':'Buy'}</div></div>
        </div>
        ))}
    </div>
    </>
  );
}
export default Books;
