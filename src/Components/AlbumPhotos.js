import React, {Component} from 'react';
import PhotoItem from './PhotoItem';
export default class AlbumPhotos extends Component {
  

  handleSelectedPhoto(photo){
      console.log("inside album photos selected photo");
      console.log(photo);
  }


  render() {


    // console.log("inside photos of selectedAlbum");
    // console.log(this.state.photos);
    let photoItems = [];
    if(this.props.selectedAlbum.photos){
        photoItems = this.props.selectedAlbum.photos.data.map( photo => {
            //adding the selected attribute to photos to animate then when there are selected
            photo["selected"] = false;
            return <PhotoItem photo={photo} key={photo.id} selectedPhoto={this.handleSelectedPhoto.bind(this)}/>;
        })
    }

    return (
      <div id="photoSection" className="row text-center text-lg-left">
        <div className="gal" id="photoGallery">
            {photoItems}
        </div>
      </div>
      );
  }
}
