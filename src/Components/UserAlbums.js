import React, {Component} from 'react';
import AlbumItem from './AlbumItem';
export default class UserAlbums extends Component {

  constructor(props) {
    super(props);
    this.state = {
      albums: {
        id: '',
        name: '',
        count: '',
        cover_photo: {
          source: '',
          id: ''
        }
      }
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      albums: props.albums
    }, () => {
      // console.log("content from state");
      // console.log(this.state.albums);
    });

  }

  render() {
    let visibility = "";
    if (this.props.hide) {
      visibility = "hidden";
    }

    let albumItems = [];



    if(this.state.albums.data){
       albumItems = this.state.albums.data.map( album => {
         //console.log(album);
          var coverUrl = "http://placehold.it/400x300";
          if (album.cover_photo) {
            coverUrl = album.cover_photo.source;
          }

          return (
            <AlbumItem key={album.id} album={album} cover={coverUrl}  />
          );

      });
    }





    return (

      <div id="albums" className={"col-md-12 "+ visibility}>
        <h3>Albums</h3>
        <div id="albumSection" className="row text-center text-lg-left">
              {albumItems}
        </div>
          {/* <div id="photoSection" className="row text-center text-lg-left">
            <div className="gal" id="photoGallery"></div>
          </div> */}
      </div>
      );
  }
}
