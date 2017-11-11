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
      console.log("content from state");
      console.log(this.state.user);
    });

  }


  render() {
    let visibility = "";
    if(this.props.hide){
      visibility = "hidden";
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
                <button className="btn btn-success btn-sm tip btn-responsive disabled" id="export-firebase-btn" title="" data-original-title="Export images to firebase"><span className="fa fa-cloud-upload"></span> Export</button>
                <button className="btn btn-danger btn-sm tip btn-responsive" id="logout" title="" data-original-title="logout"><span className="fa fa-sign-out"></span> Logout</button>
              </div>
            </div>
            <div className="info">
              <p><span className="glyphicon glyphicon-globe"></span> <span className="title">Address:</span>{this.state.user.location.name}<span id="userAddress"></span></p>
              <p><span className="glyphicon glyphicon-gift"></span> <span className="title">Date of birth:</span>{this.state.user.birthday}<span id="userBirthday"></span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
