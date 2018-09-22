import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
//todo 
// const { API_KEY } = process.env
// const API_URL = 'http://api.musicgraph.com/api/v2/artist/suggest'


class ListsContainer extends Component {

    constructor(props){
        super(props)
        this.state={
            searchQuery:'',
            lists:[]
        };
    }

    handleInputChange = () => {
        this.setState({
          searchQuery: this.search.value
        }, () => {
          if (this.state.searchQuery && this.state.searchQuery.length > 1) {
            if (this.state.searchQuery.length % 2 === 0) {
              this.searchMovies(this.state.searchQuery)
            }
          } 
        })
      }
      
    searchMovies = () => {
        const baseUrl='https://api.themoviedb.org/3/search/movie?'
        axios.get(baseUrl,{
            params:{
               query:this.state.searchQuery,
               api_key:'db99740bbdd2065a8f852dd7ba3e8b45',
               language:'en-US',
               page:'1',
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
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}/>
                <p>{this.state.searchQuery}</p>
            </form>
        </p>     
                <div className="lists-container">
                        {this.state.lists.map( list => {
                        return (<List list={list} key={list.id} />) 
                    })}
                </div>
        </div>     
        )
    }   
    //todo if this ends up not being needed
    // componentDidMount(){
    //     this.searchMovies(query)
    //     //axios.get('https://api.themoviedb.org/3/search/movie?query=Titanic&api_key=db99740bbdd2065a8f852dd7ba3e8b45&language=en-US&page=1&include_adult=false')
    // }

    // render() {
    //     return (
    //       <form onInput={event => this.onInput(event.target.value)}>
    //       <p>
    //         <input
    //           type="text"
    //           size="80"
    //           placeholder="Search movies"
    //           value={this.props.searchQuery}
    //         />{' '}
    //         <button className="btn btn-sm btn-primary">Search</button>
    //       </p>
    //       </form>
    //     );
    //   }

    
}        

export default ListsContainer;