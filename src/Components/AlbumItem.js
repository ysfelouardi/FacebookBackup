import React, { Component } from 'react';


export default class AlbumItem extends Component {


  constructor(props){
    super(props);
    this.state = {
      selected : false
    }
  }

  handleSelectedAlbum(albumid){

    console.log("album selected ! " + albumid);
    this.setState({selected : true});
  }


  render() {
    let selectedAlbum = "";
    let selectedTitle = "";

    if(this.state.selected){
        selectedAlbum = "selected-album";
        selectedTitle = "selected-title";
    }
    return (
      <div className={"col-lg-3 col-md-4 col-xs-6 " + selectedAlbum} data-id={this.props.album.id} onClick={this.handleSelectedAlbum.bind(this,this.props.album.id)} >
        <a className="d-block mb-4 h-100 text-center album-thumbnail">
          <img className="img-fluid img-thumbnail album-cover" src={this.props.cover} alt="" />
            <span className={selectedTitle}>{this.props.album.name} <small>{this.props.album.count} photos</small></span>

          </a>
      </div>
    );
  }
}
