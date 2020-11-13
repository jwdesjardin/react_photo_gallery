import React, { Component } from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

class PhotoContainer extends Component {
    constructor(){
       const term = this.props.title; 
       let images = this.props.photos;
       if (this.props.title !== 'Cats' && this.props.title !== 'Dogs' && this.props.title !== 'Tacos'){
           images = this.props.photos.term;
       } else {
       images = this.props.photos;
       }
    }
    

    render(){
        return (
            <div className="photo-container">
                {this.props.title ? <h2>{this.props.title} gifs</h2> : '' }
                <ul>
                    { images.length > 0 ?
                      images.map(photo => <Photo source={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />) :
                      <NotFound /> }
                </ul>
                </div>
            );
        }
         
        
    
}





export default PhotoContainer;

