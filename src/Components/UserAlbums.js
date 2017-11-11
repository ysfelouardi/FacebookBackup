import React, {Component} from 'react';
import AlbumItem from './AlbumItem';
import AlbumPhotos from './AlbumPhotos';
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
        selected : false,
        photos : [
            {
              id : '',
              source : ''
            }
        ]
      }
    ],
    selectedAlbum : {}

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
      console.log("recevied albums inside user albums");
      console.log(this.state.albums);
    });

  }

  handleSelectedAlbum(selectedAlbum){
    let albums = this.state.albums;
    //if an album is selected we remove the animation class from other albums
    if(albums){
      albums.forEach(album => {
        if(album !== selectedAlbum){
          album.selected = false;
        }
      });

    }
    this.setState({
      albums: albums,
      selectedAlbum : selectedAlbum
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


    //
    // console.log("the selected album");
    // console.log(this.state.selectedAlbum);



    return (

      <div id="albums" className={"col-md-12 "+ visibility}>
        <h3>Albums</h3>
        <div id="albumSection" className="row text-center text-lg-left">
              {albumItems}
        </div>
        {this.state.selectedAlbum? <AlbumPhotos selectedAlbum={this.state.selectedAlbum}/>: "" }
      </div>
      );
  }
}
