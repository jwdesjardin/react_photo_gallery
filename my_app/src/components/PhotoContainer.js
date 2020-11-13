import React, { Component } from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
import apiKey from '../config';
import axios from 'axios';
import Spinner from './Spinner';

class PhotoContainer extends Component {
    state = {
        photos : [],
        isLoading: false
    }

    searchPhotos = term => {
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a759cb8399bf04ffbd9ec4b2b7d7b285&tags=${term}&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({ photos: response.data.photos.photo, isLoading: false });
          console.log(`RESPONSE FROM SEARCH: ${term}: ${this.state.photos}`);
        })
        .catch(err => {
          console.log('SEARCH ERROR: ', err);
        })
      };
    componentDidMount(){
        this.setState({ isLoading: true });
        const term = this.props.term;
        this.searchPhotos(term);
    }

    componentDidUpdate(prevProps){
        if (this.props.term !== prevProps.term){
            this.setState({ isLoading: true });
            const term = this.props.term;
            this.searchPhotos(term);
        }
    }
    
    render(){

        return (
            <div className="photo-container">
                {this.props.term ? <h2>{this.props.term} gifs</h2> : '' }
                <ul>
                    {this.state.photos.length <= 0 ? <h3>Unfortunately there are no results</h3> : '' }
                    { this.state.isLoading ?
                     <Spinner /> : 
                    this.state.photos.map(photo => <Photo source={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />)
                    }
                </ul>
                </div>
            );
        }
         
        
    
}





export default PhotoContainer;

