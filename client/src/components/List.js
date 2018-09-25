import React, {Component} from 'react';

// Movies and show details are fetched using slightly different url, but images come from the same place
const image_url= 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
const movieDetailUrl='https://www.themoviedb.org/movie/'
const tvShowDetailUrl='https://www.themoviedb.org/tv/'
const API_KEY = '?'+process.env.REACT_APP_API_KEY
const language='&language=en-US'

// Make different lists depending on movie or tv show

const List = ({list}) => (

    <div className="movie-images">
        
        {list.title != null &&(
        // for each movie or show item in json an image and title is presented along with links to details   
        <p>
            <a href={movieDetailUrl+list.id+API_KEY+language} ><img src={image_url+list.poster_path} /></a>
            <h4 className="movie_title"><font color="white">{list.title}</font></h4> 
        </p>    
        )}
        {list.name != null &&(
        <p>    
            <a href={tvShowDetailUrl+list.id+API_KEY+language} > <img src={image_url+list.poster_path} /></a>
            <h4 className="show-title"><font color="white">{list.name}</font></h4>
        </p>    
        )}
        
    </div>  
)

 
    
export default List;