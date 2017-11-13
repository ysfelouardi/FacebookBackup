import React, {Component} from 'react';
import PhotoItem from './PhotoItem';
export default class AlbumPhotos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPhotos: []
    }
  }

  handleSelectedPhoto(photo) {
    // console.log("inside album photos selected photo");
    // console.log(photo);


    //we add the selected photo to the other selected photos and we we call the props func
    if (photo.selected === true) {
      this.state.selectedPhotos.push(photo);
    } else {
      this.state.selectedPhotos.forEach((picture, index) => {
        if (picture === photo) {
          this.state.selectedPhotos.splice(index, 1);
        }
      })
    }

    //we call the props func and we pass in the selected photos
    this.props.handleSelectedPhotos(this.state.selectedPhotos);

  }

  render() {

    //getting the photos of the selected Album
    let photoItems = [];
    if (this.props.selectedAlbum.photos) {
      photoItems = this.props.selectedAlbum.photos.data.map(photo => {
        photo["album_id"] = this.props.selectedAlbum.id;
        return <PhotoItem photo={photo} key={photo.id} selectedPhoto={this.handleSelectedPhoto.bind(this)}/>;
      })
    }

    return (
    <div id="photoSection" className="row text-center text-lg-left">
      <div className="gal" id="photoGallery">
        {photoItems}
      </div>
    </div>);
  }
}
