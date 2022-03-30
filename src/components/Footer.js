import React from "react";
import styled from "styled-components";
import Button from "./Button";

function Footer(props) {

  return (
    <div style={{background: '#1b1717', display: 'flex', flexDirection: 'column', marginTop: props.marginTop||35}}>
      <div style={{width: '85%', display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: 30, justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', width: '33%', alignItems: 'center'}}>
          <label style={{color: '#fff', fontFamily: 'Archivo', fontSize: 18}}>Subscribe to our newsletter</label>
          <label style={{color: 'grey', fontFamily: 'Archivo', fontSize: 13, marginTop: 10}}>Stay updated with our latest news</label>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 10, justifyContent: 'center'}}>
            <input style={{height: 30, width: '40%', fontSize: 12}} placeholder="Email Address"/>
            <Button style={{height: 35, width: '30%', fontSize: 12, marginLeft: 10, borderRadius: 5}} title={'Subscribe'}/>
          </div>
          <label style={{color: 'grey', fontFamily: 'Archivo', fontSize: 13, marginTop: 20}}>For details on how we use your information, please <br/>see our privacy policy.</label>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', width: '33%', alignItems: 'center'}}>
          <label style={{color: '#fff', fontFamily: 'Archivo', fontSize: 18}}>Mobile Apps and Site</label>
          <label style={{color: 'grey', fontFamily: 'Archivo', fontSize: 13, marginTop: 10}}>Chat with doctors, check your vitals, and more.</label>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 10, justifyContent: 'center'}}>
            <Logo src={require("../assets/images/appstore.png")} style={{width: '33%', height: 45, cursor: 'pointer'}}/>
            <Logo src={require("../assets/images/googleplay.png")} style={{width: '36%', height: 45, marginLeft: 10, cursor: 'pointer'}}/>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', width: '33%', alignItems: 'center'}}>
          <label style={{color: '#fff', fontFamily: 'Archivo', fontSize: 18}}>Connect with us</label>
          <label style={{color: 'grey', fontFamily: 'Archivo', fontSize: 13, marginTop: 10}}>Share your Appname experience.</label>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 10, justifyContent: 'center'}}>
            <Logo src={require("../assets/images/twitter.svg").default} style={{width: 35, height: 45, cursor: 'pointer'}}/>
            <Logo src={require("../assets/images/instagram.svg").default} style={{width: 35, height: 45, marginLeft: 10, cursor: 'pointer'}}/>
            <Logo src={require("../assets/images/linkedin.svg").default} style={{width: 35, height: 45, marginLeft: 10, cursor: 'pointer'}}/>
            <Logo src={require("../assets/images/youtube.svg").default} style={{width: 35, height: 45, marginLeft: 10, cursor: 'pointer'}}/>
          </div>
        </div>
      </div>
      <div style={{marginTop: 20, width: '85%', height: 2, backgroundColor: 'grey', alignSelf: 'center'}}/>
      <div style={{height: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <label style={{color: '#fff', fontFamily: 'Archivo', fontSize: 12}}>© 2022 Appname. All Rights Reserved.</label>
      </div>
    </div>
  );
}

const Logo = styled.img`
`;

export default Footer;
