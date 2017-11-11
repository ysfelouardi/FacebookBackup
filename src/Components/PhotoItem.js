import React, { Component } from 'react';


export default class PhotoItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      photo : {}
    }
  }

  handleSelectedPhoto(selectedPhoto){
    selectedPhoto.selected = !selectedPhoto.selected;
    // console.log("photo selected ! ");
    // console.log(selectedPhoto);
    this.setState({photo : selectedPhoto});

    this.props.selectedPhoto(selectedPhoto);

  }


  render() {
    let selectedPhoto = "";
    //if a photo is selected we add a class to it to animate it and distinguish it from the other photos
    if(this.state.photo.selected){
        selectedPhoto = "selected-image-toimport";
    }
    return (
      <img className={selectedPhoto} src={this.props.photo.source} alt={this.props.photo.id} onClick={this.handleSelectedPhoto.bind(this,this.props.photo)}/>
    );
  }
}
