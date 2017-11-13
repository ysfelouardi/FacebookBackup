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

  //convert the selected photos to binary data and export them to firebase
  exportPhotos(selectedPhotos,username) {
    //console.log("finalizingExport");
    //console.log(selectedPhotos);

    var ref = firebase.storage().ref("photos of " + username);

    selectedPhotos.forEach((photo) => {
      var photoref = ref.child(photo.id + ".png");

      //getting the base64 data of the photo
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = photo.source;

      img.onload = function(img){
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(img, 0, 0);
        //getting the base64 data
        var base64Data = canvas.toDataURL().replace(/data:image\/png;base64,/, '');
        //converting base64 data to binary data
        var blob = b64toBlob(base64Data, "image/png");
        //uploading the binary data to firebase 
        var task = photoref.put(blob);
        task.on('state_changed',
          function progress(snapshot) {
              var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("export progress " + Math.round(percentage));
              this.setState({exportProgress : Math.round(percentage)});
          }.bind(this),
        function error(err){
          console.log(err);
        },
      function complete(){
            console.log("upload complete !");
      });
      }.bind(this,img);


    });
  }




  render() {
    return (<div className="App">
      <FbProfile finalizingExport={this.exportPhotos.bind(this)} exportProgress={this.state.exportProgress}/>
    </div>);
  }
}

export default App;
