import React, { Component } from 'react';

export default class FbLogin extends Component{



    componentDidMount(){
        // Load the required SDK asynchronously for facebook
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function() {
            window.FB.init({
              appId      : '2041386602760785',
              cookie     : true,  // enable cookies to allow the server to access the session
              xfbml      : true,  // parse social plugins on this page
              version    : 'v2.10' // use version 2.1
            });
        };
    }

    facebookLogin(){
        window.FB.login(
            function(resp){
                this.statusChangeCallback(resp);
            }.bind(this),{ scope : 'public_profile,email,user_birthday,user_location,user_photos' });
    }

    checkLoginState() {
        alert("Checking Login Status")
        console.log( "Checking login status..........." );

        window.FB.getLoginStatus(function(response) {
            alert("FB Callback")
            console.log("----------->")
            console.log(response)
            this.statusChangeCallback(response);
        }.bind(this));
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            //alert( "Connected to facebook. Retriving user from fb" );
            // Logged into your app and Facebook.
            //this.props.displayElements();
            this.fetchDataFacebook();
        } else if (response.status === 'not_authorized') {
            console.log('Import error', 'Authorize app to import data', 'error')
        } else {
            console.log('Import error', 'Error occured while importing data', 'error')
        }
    }

    fetchDataFacebook(){
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('me?fields=name,email,location,cover,birthday,picture.type(large){url},albums{id,name,count,cover_photo{source},photos.limit(1000){source}}', function(user) {
          this.props.displayUserInfos(user);
            console.log('Successful login from facebook : ' + user.name);
            //alert( 'Successful login for: ' + user.name );
        }.bind(this));
    }

    render(){
      let visibility = "";
      if(this.props.hide){
        visibility = "hidden";
      }
        return(
            <button id="fb-btn" className={"btn btn-lg btn-primary " + visibility } onClick={this.facebookLogin.bind(this) }>
              <span className="fa fa-facebook"></span> Connect With Facebook
            </button>
        )
    }
}
