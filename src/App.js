import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import AddBook from './AddBook'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books:[]
  }

componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

updateBookShelf = (book,updatedShelf) =>{
BooksAPI.update(book,updatedShelf)
      .then((nbook) => {
      	let updatedBook = this.state.books.filter((b)=>(b.id===book.id))[0];
  		if(updatedBook!==undefined)
        {
	  		updatedBook.shelf = updatedShelf;
            this.setState({})
        }
  		else
        {
          book.shelf = updatedShelf;
        	this.setState((currentState)=>({
              books:currentState.books.concat([book])
            }))
        }
          
        
      })
};

  render() {
    
    const { books } = this.state;
	
	const currentlyReading = books.filter((b)=>(
  		b.shelf.toLowerCase() === 'currentlyreading'));
	
	const wantToRead = books.filter((b)=>(
  		b.shelf.toLowerCase() === 'wanttoread'));
	
	const read = books.filter((b)=>(
  		b.shelf.toLowerCase() === 'read'));
 	
	
    
    return (
      <div className="app">
       	   
         <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={currentlyReading}
                  shelfName='Currently Reading'
				  onShelfChange={this.updateBookShelf}/>
				<BookShelf
                  books={wantToRead}
                  shelfName='Want To Read'
				  onShelfChange={this.updateBookShelf}/>
                <BookShelf
                  books={read}
                  shelfName='Read'
                  onShelfChange={this.updateBookShelf}/>
                
              </div>
            </div>
            <div className="open-search">
                      <Link
                          to='/search'
                        >Add a book</Link>
			</div>
          </div>
        )} />
		<Route path='/search' render={({ history }) => (
          <AddBook 
			onShelfChange={this.updateBookShelf}
			books={books}
          />
         )} /> 
      </div>
    )
  }
}

export default BooksApp
