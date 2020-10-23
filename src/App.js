import React, { Component } from "react";

import {spotifyArray} from "./Spotify";

const spotifyLibrary = spotifyArray;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: " ", len: 0, globalArray: spotifyLibrary};
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
    console.log("In the constructor App comp");
  } // end constructor

  onSearchFormChange(event){
    this.setState({searchTerm: event.target.value});
    
    let sTerm = event.target.value;
    let numChars = sTerm.length;

    this.setState({len: numChars});
  
  }



  render() {
    return (
      <div className="App">
        <h1>CS385 Spotify Search App</h1>
        The search term is: [{this.state.searchTerm}]
        There are [{this.state.len}] cahracters typed.

        <SearchForm 
          searchTerm = {this.state.searchTerm}
          onChange = {this.onSearchFormChange}
         />
        <SearchResults
          searchTerm = {this.state.searchTerm}
          globalArray = {this.state.globalArray}
         />
         <Reset />
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

//**************************************************//
class SearchForm extends Component {
  render() {

    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;

    return (
      <div className="SearchForm">
        <hr />
        <h1>SearchForm</h1>
        <form>
        Type search here:
        <input type="text"
        value = {searchTermFromProps}
        onChange = {onChangeFromProps}
        /> 
        <button Reset>Clear Search Bar</button>
        </form>
      </div>
    );
  }
} // close the ComponentA component
//**************************************************//
class SearchResults extends Component {
  
  searchFilterFunction(searchTerm){
    return function(searchObject){
      let songTitle = searchObject.title;
      let songArtist = searchObject.artist;
      let songGenre = searchObject.topgenre;
      return(
        (searchTerm.length>3) && 
        (songTitle.includes(searchTerm) ||
        songArtist.includes(searchTerm) ||
        songGenre.includes(searchTerm)))
    };
  }
  render() {
    const arrayPassedAsParameter = this.props.globalArray;
    const searchTermFromProps = this.props.searchTerm;
    return (
      <div className="SearchResults">
        <h1>SearchResults</h1>
          <table border = '1'>
            <tr><th>Title</th><th>Artist</th><th>Genre</th></tr>
              <tbody>
                {
                arrayPassedAsParameter.filter(this.searchFilterFunction(searchTermFromProps)).map((a) => (
                <tr key = {a.id}>
                <td><b>{a.title}</b></td>
                <td><b> {a.artist}</b></td>
                <td><i> {a.topgenre}</i></td>
                </tr>  
                ))}
               </tbody>
           </table>
        </div>
    );
  }
} // close the ComponentB component


class Reset extends Component {
  render() {
    return (
      <div className = "ResetComponent">
      </div>
    );
  }
}

export default App;
