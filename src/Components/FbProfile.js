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
       hideUser : true
     };
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
          <UserInfo userinfo={this.state.user} hide={this.state.hideUser}/>
          <UserAlbums albums={this.state.user.albums} hide={this.state.hideUser}/>
      </div>
    );
  }
}
