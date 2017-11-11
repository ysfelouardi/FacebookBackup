import React, { Component } from 'react';


export default class AlbumItem extends Component {


  constructor(props){
    super(props);
    this.state = {
      album : {}
    }
  }

  handleSelectedAlbum(album){
    album.selected = true;
    //console.log("album selected ! " + album.id);
    this.setState({album : album});
    this.props.selectedAlbum(album);
  }


  render() {
    let selectedAlbum = "";
    let selectedTitle = "";
    //if an album is selected we add somme classes to animate and distinguish the album div and the album title span from the other albums
    if(this.state.album.selected){
        selectedAlbum = "selected-album";
        selectedTitle = "selected-album-title";
    }

    return (
      <div className={"col-lg-3 col-md-4 col-xs-6 album-thumbnail " + selectedAlbum} data-id={this.props.album.id} onClick={this.handleSelectedAlbum.bind(this,this.props.album)} >
        <a className="d-block mb-4 h-100 text-center">
          <img className="img-fluid img-thumbnail album-cover" src={this.props.cover} alt="" />
            <span className={selectedTitle}>{this.props.album.name} <small>{this.props.album.count} photos</small></span>
        </a>
      </div>
    );
  }
}
