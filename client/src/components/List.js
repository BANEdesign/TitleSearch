import React from 'react';

//todo these links need to work for shows as well
const image_url= 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
const detail_url='https://www.themoviedb.org/movie/'
const the_rest='?api_key=db99740bbdd2065a8f852dd7ba3e8b45&language=en-US'
const List = ({list}) =>
    <div className="movie-images">
        <a href={detail_url+list.id+the_rest} ><img src={image_url+list.poster_path} /></a>
        <h4 className="movie_title"><font color="white">{list.title}</font></h4>    
    </div>    

export default List;