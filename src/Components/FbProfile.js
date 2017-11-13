import React, {Component} from 'react';
import Fblogin from './FbLogin';
import UserInfo from './UserInfo';
import UserAlbums from './UserAlbums';

export default class FbProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      hideLogin: false,
      hideUser: true,
      disableExportBtn: true,
      selectedPhotos: [],
      exportProgress: 0
    };
  }

  // componentWillMount(){
  //   console.log("fb profile did mount " + this.state.selectedPhotos.length);
  //   if(this.state.selectedPhotos.length){
  //     this.setState({disableExportBtn : false});
  //   }else{
  //     this.setState({disableExportBtn : true});
  //   }
  // }

  componentWillReceiveProps(props) {
    console.log("i received props in FbProfile");
    this.setState({
      exportProgress: props.exportProgress
    }, () => {
      console.log("FbProfile received exportpgress");
      console.log(this.state.exportProgress);
    });
  }

  preparingToExport(selectedPhotos) {
    console.log("in fbprofile preparing to export the photos");
    console.log(selectedPhotos);
    if (selectedPhotos.length) {
      this.setState({disableExportBtn: false, selectedPhotos: selectedPhotos});
    } else {
      this.setState({disableExportBtn: true, selectedPhotos: []});
    }
    //console.log("export btn disable ? " + this.state.disableExportBtn);
  }

  triggeringExport() {
    this.props.finalizingExport(this.state.selectedPhotos, this.state.user.name);
  }

  handleUserInfos(user) {
    this.setState({user: user, hideLogin: true, hideUser: false});
  }

  logOut() {
    console.log("logout clicked children");
    // this.setState({
    //   user: {},
    //   hideLogin: false,
    //   hideUser: true,
    //   disableExportBtn: true,
    //   selectedPhotos: [],
    //   exportProgress: 0
    // });
  }

  render() {
    return (<div className="container text-center">
      <Fblogin displayUserInfos={this.handleUserInfos.bind(this)} hide={this.state.hideLogin}/>
      <UserInfo userinfo={this.state.user} hide={this.state.hideUser} disableExportBtn={this.state.disableExportBtn} handleExport={this.triggeringExport.bind(this)} logingOut={this.logOut.bind(this)} exportProgress={this.state.exportProgress}/>
      <UserAlbums albums={this.state.user.albums} hide={this.state.hideUser} handleSelectedPhotos={this.preparingToExport.bind(this)}/>
    </div>);
  }
}
