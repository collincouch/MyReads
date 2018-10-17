import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Menu extends Component {
  
  static propTypes = {
  onShelfChange: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
   
 }
  
  handleShelfChange = event => {
   
    //Call the callback function that was passed to this component from BookList
    this.props.onShelfChange(this.props.book,event.target.value);
  };

  render(){

   return(
     <div className="book-shelf-changer">
       <select onChange={this.handleShelfChange} value={this.props.book.shelf!==undefined?this.props.book.shelf:'none'}>
       <option value="move" disabled>Move to...</option>
       <option value="currentlyReading">Currently Reading</option>
       <option value="wantToRead">Want to Read</option>
       <option value="read">Read</option>
       <option value="none">None</option>
       </select>
     </div>
     )
  }
}

export default Menu