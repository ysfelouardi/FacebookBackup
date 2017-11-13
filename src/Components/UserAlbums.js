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
    selectedAlbum : {},
    selectedPhotos : []

    }
  }

  componentWillReceiveProps(props) {
    //adding the selected attribute to albums to animate them when they are selected
    // props.albums.data.forEach(album => {
    //   album["selected"] = false;
    // });

    this.setState({
      albums: props.albums.data
    }, () => {
      //console.log("recevied albums inside user albums component");
      //console.log(this.state.albums);
    });

  }

  handleSelectedAlbum(selectedAlbum){

    // unselecting the previous photos and clear the selectedPhotos
    this.state.selectedPhotos.forEach(photo => {
      photo.selected = false;
      this.state.selectedPhotos.splice(photo);
    });
     this.props.handleSelectedPhotos(this.state.selectedPhotos);









    let albums = this.state.albums;
    //if an album is selected we unselect other albums
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


  handleSelectedPhotos(selectedPhotos){
    // console.log("retrieved the selected Photos");
    // console.log(selectedPhotos);

    //remove all the photos that does not belong to the selectedAlbum
    selectedPhotos.forEach((photo,index) => {
      if(photo.album_id !== this.state.selectedAlbum.id){
        photo.selected = false;
        selectedPhotos.splice(photo);
        //console.log(" photo " + index +" album id : "+  photo.album_id + " selected album : " + this.state.selectedAlbum.id);
      }
    })

    this.setState({
      selectedPhotos: selectedPhotos
    }, () => {
      console.log("in userAlbums retrieved the selected Photos");
      console.log(this.state.selectedPhotos);
      //we call the props func and we pass in the selectedPhotos Array
      this.props.handleSelectedPhotos(this.state.selectedPhotos);
    });

  }


  render() {
    //if the user is not connected we hide album section
    let visibility = "";
    if (this.props.hide) {
      visibility = "hidden";
    }


    //getting the albums
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
        {this.state.selectedAlbum? <AlbumPhotos selectedAlbum={this.state.selectedAlbum} handleSelectedPhotos={this.handleSelectedPhotos.bind(this)} />: "" }
      </div>
      );
  }
}
