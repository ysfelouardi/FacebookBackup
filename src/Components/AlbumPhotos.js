import React, {Component} from 'react';
import PhotoItem from './PhotoItem';
export default class AlbumPhotos extends Component {


  constructor(props){
    super(props);
    this.state = {
      selectedPhotos : [
      ]
    }
  }

  handleSelectedPhoto(photo){
      console.log("inside album photos selected photo");
      console.log(photo);
      //we add the selected photo to othr selected photos and we we call the props func

      if(photo.selected === true){
        this.state.selectedPhotos.push(photo);
      }else{
        this.state.selectedPhotos.forEach((picture,index) => {
          if(picture === photo){
            this.state.selectedPhotos.splice(index,1);
          }
        })
      }


      //
      // console.log("selected Photos");
      // console.log(this.state.selectedPhotos);

      //call the props func and passe in the selected photos
      // if(this.state.selectedPhotos.length){
      //       this.props.handleSelectedPhotos(this.state.selectedPhotos);
      // }

      this.props.handleSelectedPhotos(this.state.selectedPhotos);



  }


  render() {


    // console.log("inside photos of selectedAlbum");
    // console.log(this.state.photos);
    let photoItems = [];
    if(this.props.selectedAlbum.photos){
        photoItems = this.props.selectedAlbum.photos.data.map( photo => {
            //adding the selected attribute to photos to animate then when there are selected
            //photo["selected"] = false;
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
