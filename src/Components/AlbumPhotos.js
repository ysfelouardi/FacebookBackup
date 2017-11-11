import React, {Component} from 'react';
export default class AlbumPhotos extends Component {


  // componentWillReceiveProps(props) {
  //     console.log("inside album photos");
  //     console.log(props.selectedAlbum);
  // }

  render() {


    console.log("inside album photos");
    console.log(this.props.selectedAlbum);
    let albumPhotos = [];
    if(this.props.selectedAlbum.photos){
        albumPhotos = this.props.selectedAlbum.photos.data.map( photo => {
            return <img src={photo.source} alt={photo.id} key={photo.id}/>;
        })
    }

    return (
      <div id="photoSection" className="row text-center text-lg-left">
        <div className="gal" id="photoGallery">
            {albumPhotos}
        </div>
      </div>
      );
  }
}
