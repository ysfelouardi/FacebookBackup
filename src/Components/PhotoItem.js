import React, { Component } from 'react';


export default class PhotoItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      photo : {}
    }
  }

  handleSelectedPhoto(selectedPhoto){
    //we change the selection status of the photo
    selectedPhoto.selected = !selectedPhoto.selected;
    
    this.setState({photo : selectedPhoto});
    this.props.selectedPhoto(selectedPhoto);

  }


  render() {
    let selected = "";
    //if a photo is selected we add a class to it to animate it and distinguish it from the other photos
    if(this.state.photo.selected){
        selected = "selected-image";
    }
    return (
      <img className={selected} src={this.props.photo.source} alt={this.props.photo.id} onClick={this.handleSelectedPhoto.bind(this,this.props.photo)}/>
    );
  }
}
