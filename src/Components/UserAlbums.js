import React, {Component} from 'react';
import AlbumItem from './AlbumItem';
export default class UserAlbums extends Component {

  constructor(props) {
    super(props);
    this.state = {
      albums: [
        {
        id: '',
        name: '',
        count: '',
        cover_photo: {
          source: '',
          id: ''
        },
        selected : false
      }
    ]

    }
  }

  componentWillReceiveProps(props) {
    //adding the selected attribute to albums to animate then when there are selected
    props.albums.data.forEach(album => {
      album["selected"] = false;
    });

    this.setState({
      albums: props.albums.data
    }, () => {
      //console.log("recevied albums inside user albums");
      //console.log(this.state.albums);
    });

  }

  handleSelectedAlbum(selectedAlbum){
    let albums = this.state.albums;
    //if an album we selected we remve the animation class other albums
    if(albums){
      albums.forEach(album => {
        if(album !== selectedAlbum){
          album.selected = false;
        }
      });

    }
    this.setState({
      albums: albums
    }, () => {
      //console.log("after unselecting other albums");
      //console.log(this.state.albums);
    });
  }




  render() {
    let visibility = "";
    if (this.props.hide) {
      visibility = "hidden";
    }

    let albumItems = [];

    if(this.state.albums){

       albumItems = this.state.albums.map( album => {
          //console.log(album);
          var coverUrl = "http://placehold.it/400x300";
          if (album.cover_photo) {
            coverUrl = album.cover_photo.source;
          }

          return (
            <AlbumItem key={album.id} album={album} cover={coverUrl} selectedAlbum={this.handleSelectedAlbum.bind(this)}  />
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
