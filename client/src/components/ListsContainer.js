import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import { Pager } from 'react-bootstrap';

//todo 
// const { API_KEY } = process.env
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
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleInputChange = () => {
        this.setState({
          searchQuery: this.search.value,
        }, () => {
          if (this.state.searchQuery && this.state.searchQuery.length > 1) {
            if (this.state.searchQuery.length % 2 === 0) {
              this.searchMovies(this.state.searchQuery)
            }
          } 
        })
      }
      
    handleOptionChange = (changeEvent) => {
    this.setState({
        selectedOption: changeEvent.target.value
    }, () => {
        console.log('Options selected: ', this.state.selectedOption)
        });
    } 
    //todo these are functions are redundant, could be one function with if/else statement
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
    searchMovies = () => {
        var filteredUrl = ''

        if(this.state.selectedOption === 'movie'){
            filteredUrl = baseUrl+movieParam
        }else{
            filteredUrl = baseUrl+showParam
        }
        axios.get(filteredUrl,{
            params:{
               query: this.state.searchQuery,
               api_key:'db99740bbdd2065a8f852dd7ba3e8b45',
               language:'en-US',
               page: this.state.page,
               include_adult:'false'
            }
        })    
        .then(response =>{
            console.log(response)
            this.setState({
                lists: response.data.results,
            //todo this should be reused whereever the list will show 
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