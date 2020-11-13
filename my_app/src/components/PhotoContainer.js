import React, { Component } from 'react';
import Photo from './Photo';


class PhotoContainer extends Component {
    
    render(){
        const { term, photos } = this.props;
        const pics = photos[term];
        console.log(photos);
        return (
            <div className="photo-container">
                { term ? <h2>{term} gifs</h2> : '' }
                <ul>
                    {   pics && (pics.length <= 0 ? 
                        <h3>Unfortunately there are no results</h3> : 
                        pics.map(photo => <Photo source={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />))
                    }
                </ul>
                </div>
            );
        }
         
        
    
}





export default PhotoContainer;

