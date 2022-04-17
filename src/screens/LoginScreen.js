import React, {useState, useEffect} from "react";
import styled from "styled-components";
import RedButton from "../components/RedButton";
import { useHistory } from "react-router-dom";
import RedBorderButton from "../components/RedBorderButton";
import {signInWithEmailAndPassword, onAuthStateChanged, getAuth} from 'firebase/auth'

function LoginScreen(props) {

  const history = useHistory();

  const [hover2, setHover2] = useState('#CE1212');

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      user.uid === 'QImcv95RSjhpIAKMRHuUpXwHa7C3' ? history.push('/doctor/home') :history.push('/profile/home')
    } else {
      // User is signed out
    }
  });


  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        handle(event)
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handle]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handle(event){
    event.preventDefault();
    setLoading(true);
    setError(false)
    try{
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false)
    }
    catch(err){
      setError(true)
      setLoading(false)
    }
  }

  return (
    <Container>
      <div style={{height: 70, backgroundColor: '#1B1717', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
        <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 80}} onClick={() => history.push('/')}>
            <text style={{color: '#eeebdd', fontFamily: 'roboto-700', fontSize: 25, cursor: 'pointer'}}>Appname</text>
        </div>
      </div>
      <div style={{backgroundColor: '#f4f4f4', height: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: -35}}>
        <label style={{fontSize: 40, fontFamily: 'Archivo', marginTop: 50, color: '#000'}}>Log in to Appname</label>
        <label style={{fontSize: 20, fontFamily: 'Archivo', marginTop: 20, textAlign: 'center'}}>Earn Miles every time you fly with us and our partners. And <br/>spend your Skywards Miles on a world of rewards.</label>
        <div style={{minHeight: 480, width: '85%', backgroundColor: '#fff', marginTop: 60, boxShadow: '0px 1px 5px  0.35px #000', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '49%', height: '100%', justifyContent: 'center'}}>
            <label style={{fontFamily: 'Archivo', fontSize: 25, marginLeft: 40}}>Login</label>
            {error ? <div style={{width: '70%', height: 50, backgroundColor: '#ffdbe0', border: '2px solid red', display: 'flex',  alignItems: 'center', justifyContent: 'center', marginLeft: 40, marginTop: 20}}>
              <label style={{color: 'red', fontFamily: 'Archivo', fontSize: 17}}>Invalid Email or Password</label>
            </div> : null}
            <input style={{height: 50, width: '70%', marginTop: 20, fontSize: 20, marginLeft: 40}} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input style={{height: 50, width: '70%', marginTop: 20, fontSize: 20, marginLeft: 40}} placeholder="Password" type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <text style={{fontFamily: 'Archivo', fontSize: 18, color: hover2, cursor: 'pointer', marginTop: 10, textDecorationLine: 'underline', marginLeft: 40, width: 190}} onMouseEnter={() => setHover2('#810000')} onMouseLeave={() => setHover2('#CE1212')} onClick={() => history.push('/forgotpassword')}>Forgot your password?</text>
            <RedButton loading={loading} style={{height: 50, width: '70%', marginTop: 20, marginLeft: 40}} title={'Log in'} onClick={handle}/>
          </div>
          <div style={{width: 3, height: '85%', backgroundColor: '#696969'}}/>
          <div style={{display: 'flex', flexDirection: 'column', width: '49%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <label style={{fontFamily: 'Archivo Black', fontSize: 18, marginTop: 10, marginLeft: 40}}>Not an Appname member yet?</label>
            <label style={{fontFamily: 'Archivo', textAlign: 'center', fontSize: 18, marginTop: 10, marginLeft: 40}}>Register now to make the most of digital healthcare.</label>
            <RedBorderButton style={{height: 50, width: '50%', marginTop: 30, marginLeft: 40, border: '2px solid rgba(207,117,0,1)'}} onClick={() => history.push('/signup')} title={'Join Now'}/>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default LoginScreen;