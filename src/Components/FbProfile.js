import React, { Component } from 'react';
import Fblogin from './FbLogin';
import UserInfo from './UserInfo';
import UserAlbums from './UserAlbums';

export default class FbProfile extends Component {


   constructor(props){
     super(props);

     this.state = {
       user : {},
       hideLogin : false,
       hideUser : true,
       disableExportBtn : true
     };
   }

   handleExport(selectedPhotos){
     console.log("preparing to export the photos");
     console.log(selectedPhotos);
     if(selectedPhotos.length){
       this.setState({disableExportBtn : false});
     }else{
       this.setState({disableExportBtn : true});
     }

     console.log("export btn disable ? " + this.state.disableExportBtn);
   }

   handleUserInfos(user) {
    this.setState({
      user : user,
      hideLogin : true,
      hideUser : false
    });
  }

  render() {

    return (
      <div className="container text-center">
          <Fblogin displayUserInfos={this.handleUserInfos.bind(this)} hide={this.state.hideLogin}/>
          <UserInfo userinfo={this.state.user} hide={this.state.hideUser} disableExportBtn={this.state.disableExportBtn}/>
          <UserAlbums albums={this.state.user.albums} hide={this.state.hideUser} handleSelectedPhotos={this.handleExport.bind(this)}/>
      </div>
    );
  }
}
