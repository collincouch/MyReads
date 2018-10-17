import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class AddBook extends Component{

  state = {
    query: '',
    searchResults:[],
    
  }

static propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
 }

onShelfChange = (book,updatedShelf) => {
    //The callback is getting called.
    this.props.onShelfChange(book,updatedShelf);
  };

searchBooks = (query) =>{
  
   this.setState(() => ({
      query: query
    }))
	BooksAPI.search(query)
  	 .then((searchResults) => {
      this.setState({searchResults:this.mergeSearchResultsThatContainBooksAlreadyOnShelf(searchResults)});
        
      })
   .catch((e) =>{
       this.setState({searchResults: []})
     })
}

mergeSearchResultsThatContainBooksAlreadyOnShelf = (searchResults) =>{
//The only point of this function is to ensure that for any books returned 
//from the search exist on the book shelf, that I do a merge so that the 
//proper menu item is selected for the book shelf that it is on.
  
//Map all elements in arra1 into arra1 itself. On the mapping function try to find the correlative item in arra2 and merge the two items with object spread if //its found, if not, return the original item. Notice that spreading item2 last is crucial to the merge, so you overwrite with the values from item2 but keep //those in item1 that were not overwritten.
  
//the below function was obtained on StackOverflow at
//https://stackoverflow.com/questions/46591628/javascript-update-an-array-based-on-another-array-on-matching-index
 
searchResults = searchResults.map(item => {
  let item2 = this.props.books.find(i2 => i2.id === item.id);
  return item2 ? { ...item, ...item2 } : item;
      
});
  
return searchResults;

}



  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

clearQuery = () => {
    this.updateQuery('')
  }
render(){

const { query,searchResults } = this.state


  
  return(
  <div className="search-books">
            <div className="search-books-bar">
              <Link
                className='close-search'
                to='/'>
                Close
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                
				<input
                  type='text'
                  placeholder='Search by title or author'
                  value={query}
                  onChange={(event) => this.searchBooks(event.target.value)}
                />
              </div>
            </div>

            <div className="search-books-results">
			<div className="bookshelf">
     			<h2 className="bookshelf-title">Search Results</h2>
					<div className="bookshelf-books">
                      <BookList
                         books={searchResults}
                        onShelfChange={this.onShelfChange}/>
					</div>
				</div>
            </div>
          </div>
  )
}
}

export default AddBook