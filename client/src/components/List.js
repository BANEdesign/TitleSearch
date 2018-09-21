import React from 'react';

const image_url= 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
const List = ({list}) =>
    <div className="movie-list" key={list.id}>
        <div className="image">
            <img src={image_url+list.poster_path} />
        </div>
        <h4>{list.title}</h4>
        <p>{list.overview}</p>
    </div>

export default List;