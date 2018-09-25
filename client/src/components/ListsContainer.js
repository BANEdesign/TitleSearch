import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import { Pager } from 'react-bootstrap';

//stored api_key
const API_KEY = process.env.REACT_APP_API_KEY
//the base url remains the same but movies and shows have a different url parameter
const baseUrl='https://api.themoviedb.org/3/search/'
        const movieParam ='movie?'
        const showParam ='tv?'

class ListsContainer extends Component {

    constructor(props){
        super(props)
        this.state={
            searchQuery:'',
            lists:[],
            selectedOption: 'null',
            page:1
        };
    }
    // When the list is refreshed the focus goes back to the top
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    // validates query so that the request can be made with no errors
    handleInputChange = () => {
        this.setState({
          searchQuery: this.search.value,
        }, () => {
          if (this.state.searchQuery && this.state.searchQuery.length > 1) {
            // if (this.state.searchQuery.length % 2 === 0) {
              this.searchMovies(this.state.searchQuery)
            // }
          } 
        })
      }
    // radio button listener  
    handleOptionChange = (changeEvent) => {
    this.setState({
        selectedOption: changeEvent.target.value
        });
    } 
    // Prev and Next navigators
    handlePrevPage = () => {
        this.setState({
            page: this.state.page - 1
        }, () => {
            this.searchMovies(this.state.searchQuery)
        })
    } 

    handleNextPage = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.searchMovies(this.state.searchQuery)
        })
    }
    // builds url and makes request
    searchMovies = () => {
        var filteredUrl = ''

        if(this.state.selectedOption === 'movie'){
            filteredUrl = baseUrl+movieParam
        }else{
            filteredUrl = baseUrl+showParam
        }
    // takes the base url for either show or movies and adds parameters  
        axios.get(filteredUrl,{
            params:{
               query: this.state.searchQuery,
               api_key: API_KEY,
               language:'en-US',
               page: this.state.page,
               include_adult:'false'
            }
        })    
        .then(response =>{
            // takes json response and sets it as lists array
            this.setState({
                lists: response.data.results,
            })
        })
        .catch(error => console.log(error))
    }
    render() {

        return(
        <div className="search-form">  
        <p>
            <form>
                <input
                    size="80"
                    placeholder="Search for Titles..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}/>
                <p>{this.state.searchQuery}</p>
                <div className="radio">
                    <label>
                        <input type="radio" 
                            value="movie" 
                            checked={this.state.selectedOption === 'movie'} 
                            onChange={this.handleOptionChange}  />
                        Movies
                    </label>
                    <p>
                    <label>
                        <input type="radio" 
                            value="show" 
                            checked={this.state.selectedOption === 'show'} 
                            onChange={this.handleOptionChange}/>
                        Shows
                    </label>
                    </p>
                </div>
            </form>
        </p> 
            {/* iterates through json and makes a view w/title and link to details */}
            {this.state.lists.map( list => (
                <List list={list} key={list.id} />
            ))}
            <Pager>
                <Pager.Item 
                    onClick={this.handlePrevPage}>
                     &larr; Prev Page
                </Pager.Item>
                <Pager.Item 
                    onClick={this.handleNextPage}>
                    Next Page &rarr;
                </Pager.Item>
            </Pager>
        </div>     
        )
    }     
}        

export default ListsContainer;