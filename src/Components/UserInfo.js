import React, { Component } from 'react';


export default class UserInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      user : {
        name : '',
        email : '',
        cover : {source : '',id : ''},
        birthday : '',
        picture : { data : {url: ''} },
        location : {id : '' , name : ''}
      }
    }
  }

  componentWillReceiveProps(props){
    this.setState({user: props.userinfo} , ()=>{
      //console.log("content from state userinfo");
      //console.log(this.state.user);
    });

  }

  handleExport(){
    this.props.handleExport();
  }




  render() {
    let progressbarVisiblity = "";
    let exportPercentage = 0;
    let visibility = "";
    let disability = "";

    //if the user is not connected we hide the userinfo section
    if(this.props.hide){
      visibility = "hidden";
    }

    //if there is no selected photos we disable the export btn
    if(this.props.disableExportBtn){
      disability = "disabled";
      progressbarVisiblity = "hidden";
    }

    //show the progressbar if the photos are being exported
    if(!this.props.exportProgress){
        progressbarVisiblity = "hidden";
    }else{
        exportPercentage = this.props.exportProgress;
    }

    //hide the progressbar if the export is finished
    if(exportPercentage === 100){
      progressbarVisiblity = "hidden";
    }


    return (
      <div id="userInfo" className={"col-md-12 " + visibility }>
        <div className="profile clearfix">
          <div className="image">
            <img id="profileCover" src={this.state.user.cover.source} alt="cover" className="img-cover" />
          </div>
          <div className="user clearfix">
            <div className="avatar">
              <img id="profilePic" src={this.state.user.picture.data.url} alt="profile" className="img-thumbnail img-profile" />
            </div>
            <h2 id="userName">{this.state.user.name}</h2>
            <div className="actions">
              <div className="btn-group">
                <button className={"btn btn-success btn-md tip btn-responsive " + disability} onClick={this.handleExport.bind(this)} id="export-firebase-btn" data-original-title="Export images to firebase"><span className="fa fa-cloud-upload"></span> Export</button>
              </div>
            </div>
            <div className="info">
              <p><span className="fa fa-globe"></span> <span className="title">Address: </span>{this.state.user.location.name}<span id="userAddress"></span></p>
              <p><span className="fa fa-gift"></span> <span className="title">Date of birth: </span>{this.state.user.birthday}<span id="userBirthday"></span></p>
            </div>
          </div>
        </div>
        <div className={"progressbar col-md-12 " + progressbarVisiblity}>
          <div className="progress">
            <div id="upload-progress-bar" className="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow={exportPercentage} aria-valuemin="0" aria-valuemax="100" style={ {width : exportPercentage + '%' }}>
              {exportPercentage}%
            </div>
          </div>
        </div>
      </div>
    );
  }
}
