import React, {Component} from 'react';
import FbProfile from './Components/FbProfile';
import firebase from './firebase';
import b64toBlob from "b64-to-blob"; //to convert base64 data to binary data
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      exportProgress : 0
    }
  }

  exportPhotos(selectedPhotos) {
    console.log("finalizingExport");
    //console.log(selectedPhotos);

    var ref = firebase.storage().ref("photos");

    selectedPhotos.forEach((photo) => {
      var photoref = ref.child(photo.id + ".png");

      //getting the base64 data of the photo
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = photo.source;
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        var dataUrl = canvas.toDataURL().replace(/data:image\/png;base64,/, '');
        //converting base64 data to binary data
        var blob = b64toBlob(dataUrl, "image/png");

        
        //uploading the binary photo to firebase

        var task = photoref.put(blob);
        task.on('state_changed',
          function progress(snapshot) {
              var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("export progress " + percentage);
              this.setState({exportProgress : percentage});

          }).bind(this);
      }

    });
  }



  render() {
    return (<div className="App">
      <FbProfile finalizingExport={this.exportPhotos.bind(this)} exportProgress={this.state.exportProgress}/>
    </div>);
  }
}

export default App;
