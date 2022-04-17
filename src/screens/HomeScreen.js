import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import Button2 from "../components/Button2";
import styled from "styled-components";
import Footer from "../components/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function HomeScreen(props) {

  const history = useHistory();

  const [hover1, setHover1] = useState('#eeebdd');
  const [hover2, setHover2] = useState('#eeebdd');
  const [hover3, setHover3] = useState('#eeebdd');
  const [hover4, setHover4] = useState('#eeebdd');
  const [hover5, setHover5] = useState('#eeebdd');
  const [hover6, setHover6] = useState('#eeebdd');

  const [user, setUser] = useState(null)

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(user)
    } else {
      // User is signed out
    }
  });

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{height: window.innerHeight * 0.95, display: 'flex', flexDirection: 'column', backgroundColor: '#1B1717'}}>
        <div style={{height: 70, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <text style={{color: '#eeebdd', fontFamily: 'roboto-700', fontSize: 25, cursor: 'pointer', marginLeft: 80}}>Appname</text>
          <div style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
            <text onMouseEnter={() => setHover1('#CE1212')} onMouseLeave={() => setHover1('#eeebdd')} style={{color: hover1, fontFamily: 'roboto-700', fontSize: 18, cursor: 'pointer'}}>Careers</text>
            <text onClick={() => document.getElementById('About').scrollIntoView({behavior: 'smooth'})} onMouseEnter={() => setHover2('#CE1212')} onMouseLeave={() => setHover2('#eeebdd')} style={{color: hover2, fontFamily: 'roboto-700', fontSize: 18, cursor: 'pointer', marginLeft: 20}}>About Us</text>
            <text onMouseEnter={() => setHover3('#CE1212')} onMouseLeave={() => setHover3('#eeebdd')} style={{color: hover3, fontFamily: 'roboto-700', fontSize: 18, cursor: 'pointer', marginLeft: 20}}>Privacy</text>
            <text onMouseEnter={() => setHover4('#CE1212')} onMouseLeave={() => setHover4('#eeebdd')} style={{color: hover4, fontFamily: 'roboto-700', fontSize: 18, cursor: 'pointer', marginLeft: 20}}>Support</text>
            <text onMouseEnter={() => setHover5('#CE1212')} onMouseLeave={() => setHover5('#eeebdd')} style={{color: hover5, fontFamily: 'roboto-700', fontSize: 18, cursor: 'pointer', marginLeft: 20}}>Safety</text>
          </div>
          {user ?
          <div onMouseEnter={() => setHover6('#CE1212')} onMouseLeave={() => setHover6('#eeebdd')}  onClick={() => history.push('/profile/home')} style={{marginRight: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer'}}>
            <Image src={require('../assets/images/profileicon.png')} style={{height: 30, width: 30, borderRadius: 1000}}/>
            <text style={{color: hover6, fontFamily: 'roboto-700', fontSize: 18, marginLeft: 10}}>{user.displayName}</text> 
          </div>
          : <Button onClick={() => history.push('/login')} title={'Login'} style={{height: 30, width: 100, marginRight: 80}}/>}
        </div>
          <div style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between'}}> 
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <label style={{fontFamily: 'Archivo', fontSize: 40, color: '#eeebdd', marginLeft: 120}}>Take care of yourself<br/>anytime anywhere</label>
              <label style={{fontFamily: 'Archivo', fontSize: 20, color: '#eeebdd', marginLeft: 120, marginTop: 30}}>Your health and well being is important to us. Feel better<br/>about finding healthcare and protect you and your family.</label>
              <div style={{display: 'flex', flexDirection: 'row', marginTop: 30, marginLeft: 120, alignItems: 'center'}}>
                <Button title={'Read More'} style={{height: 40, width: 180}}/>
                <Button2 onClick={() => user ? history.push('/profile/home') : history.push('/signup')} title={user ? 'My Profile' : 'Sign Up'} style={{height: 40, width: 180, marginLeft: 30}}/>
              </div>
            </div>
          </div>
      </div>
      <div id="About" style={{display: 'flex', flexDirection: 'column', height: 450, width: '100%', justifyContent: 'center'}}>
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 230, marginRight: 100}}>
              <label style={{color: '#000', fontFamily: 'Archivo', fontSize: 23}}>About Appname</label>
              <label  style={{color: '#000', fontFamily: 'Archivo', fontSize: 18, marginTop: 20}}>Use this long-form section to really paint a picture of the before and after. What’s the problem you’re solving? What’s the benefit people are getting?</label>
              <label  style={{color: '#000', fontFamily: 'Archivo', fontSize: 18, marginTop: 20}}>You can also highlight the urgency or exclusivity of your offer. <label style={{fontFamily: 'Archivo'}}>If this is only available on a particular day or for a limited time, make that clear.</label></label>
            </div>
            <Image src={require('../assets/images/doctorss.png')} style={{height: 400, marginRight: 100}}/>
          </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', height: 450, backgroundColor: '#f7f7f7', width: '100%', justifyContent: 'center'}}>
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Image src={require('../assets/images/family.png')} style={{height: 400, marginLeft: 150}}/>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 100, marginRight: 150}}>
              <label style={{color: '#000', fontFamily: 'Archivo', fontSize: 23}}>Keep Your Family Safe</label>
              <label  style={{color: '#000', fontFamily: 'Archivo', fontSize: 18, marginTop: 20}}>Use this long-form section to really paint a picture of the before and after. What’s the problem you’re solving? What’s the benefit people are getting?</label>
              <label  style={{color: '#000', fontFamily: 'Archivo', fontSize: 18, marginTop: 20}}>You can also highlight the urgency or exclusivity of your offer. <label style={{fontFamily: 'Archivo'}}>If this is only available on a particular day or for a limited time, make that clear.</label></label>
            </div>
          </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', height: 700, width: '100%', justifyContent: 'center'}}>
          <div style={{width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <text style={{fontSize: 35, fontFamily: 'Archivo', color: '#1b1717', marginTop: 20}}>STAY IN TOUCH WITH A HEALTHCARE PROFESSIONAL</text>
            <text style={{fontSize: 20, fontFamily: 'Archivo', color: '#1b1717', marginTop: 20, textAlign: 'center', marginLeft: 200, marginRight: 200}}>Chat with one of our healthcare professionals to stay up-to-date with your health condition and get the required medical assistance.</text>
            <Image src={require('../assets/images/connect.png')} style={{height: 500}}/>
          </div>
      </div>
      <Footer />
    </div>
  );
}

const Image = styled.img`
`;

export default HomeScreen;