import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BookList from './BookList'


class BookShelf extends Component{


 static propTypes = {
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
   
 }

onShelfChange = (book,updatedShelf) => {
    //The callback is getting called.
    this.props.onShelfChange(book,updatedShelf);
  };


 render(){
   const {shelfName, books} = this.props

   
 	return(
   	<div className="bookshelf">
     	<h2 className="bookshelf-title">{shelfName}</h2>
		<div className="bookshelf-books">
			<BookList
			 books={books}
			onShelfChange={this.onShelfChange}/>
		</div>
		
    </div>
   	)
 }
}

export default BookShelf
