import './App.css';
import React, { Component } from 'react';
import Search from './components/Search';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import apiKey from './config';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import axios from 'axios';


class App extends Component {
  state = {
    photos: {},
    photosHome: []
  
  }


  componentDidMount() {

    const requestOne = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`);
    const requestTwo = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`);
    const requestThree = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=tacos&per_page=24&format=json&nojsoncallback=1`);

    axios.all([requestOne, requestTwo, requestThree])
    .then(axios.spread((...responses) => {
        this.setState({ photos: {...this.state.photos, cats : responses[0].data.photos.photo }});
        this.setState({ photos: {...this.state.photos, dogs : responses[1].data.photos.photo }});
        this.setState({ photos: {...this.state.photos, tacos : responses[2].data.photos.photo }});
        this.setState({ photosHome: [...responses[0].data.photos.photo, ...responses[1].data.photos.photo, ...responses[2].data.photos.photo] });
    })).then(() => {
      console.log("COMPONENT DID MOUNT RESULTS: ", this.state);
    }).catch(err => {
      console.log("THERE HAS BEEN AN ERROR: ", err);
    });
  }

  searchPhotos = term => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a759cb8399bf04ffbd9ec4b2b7d7b285&tags=${term}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({ photos: {...this.state.photos, [term]: response.data.photos.photo }});
      console.log(`RESPONSE FROM SEARCH: ${term}: ${this.state.photosSearched}`);
    })
    .catch(err => {
      console.log('SEARCH ERROR: ', err);
    })
  };

  render(){
    return (
      <BrowserRouter>
        <div className="container">
          <Search searchPhotos={this.searchPhotos}/>
          <Nav />
          <Switch>
            <Route exact path='/' render={ () => <PhotoContainer photos={this.state.photosHome} />} />
            <Route path="/cats" render={ () => <PhotoContainer title={'Cat'} photos={this.state.photos.cats} />} />
            <Route path="/dogs" render={ () => <PhotoContainer title={'Dog'} photos={this.state.photos.dogs} />} />
            <Route path="/tacos" render={ () => <PhotoContainer title={'Taco'} photos={this.state.photos.tacos} />} />
            <Route path="/search/:term" render={ (props) => <PhotoContainer title={props.match.params.term} photos={this.state.photos} />} />
            <Route component={NotFound} />
           </Switch> 
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
