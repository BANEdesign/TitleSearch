import React, { Component } from 'react';
import axios from 'axios';
import List from './List';

class ListsContainer extends Component {

    constructor(props){
        super(props)
        this.state={
            lists:[]
        }
    }
    componentDidMount(){
        //todo movie,apiKey and page should be a variable
        //https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
        
        //axios.get('https://api.themoviedb.org/3/search/movie?query=Titanic&api_key=db99740bbdd2065a8f852dd7ba3e8b45&language=en-US&page=1&include_adult=false')
        axios.get('https://api.themoviedb.org/3/search/movie?query=Titanic&api_key=db99740bbdd2065a8f852dd7ba3e8b45&language=en-US&page=1&include_adult=false')    
        .then(response =>{
            console.log(response)
            this.setState({
                lists: response.data.results
            })
        })
        .catch(error => console.log(error))
    }
    render() {
        return(
        <div className="lists-container">
                {this.state.lists.map( list => {
                return (<List list={list} key={list.id} />) 
            })}
        </div>
        )
    }
}        

export default ListsContainer;