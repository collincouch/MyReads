import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'


class BookList extends Component{
 static propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
   
 }

onShelfChange = (book,updatedShelf) => {
    //The callback is getting called.
    this.props.onShelfChange(book, updatedShelf);
  };

render(){
	const {books} = this.props
	
	console.log(books);

return( 
  
  //{books.length===0&&(<div>asdfasdf</div>)}
	<ol className='books-grid'>
  	{books.map((b) => (
  		<li key={b.id}>
           <div className="book">
           	<div className="book-top">
           		<div 
           		className="book-cover" 
           		style={{ width: 128, height: 193, backgroundImage: `url("${b.imageLinks.thumbnail}")`}}
				>
				</div>
				<Menu
					onShelfChange={this.onShelfChange}
					book={b}/>
           	</div>
			<div className="book-title">{b.title}</div>
           	<div className="book-authors">{b.authors}</div>
           </div>
        </li>
	))
	}
  	</ol>
)
}
}

export default BookList