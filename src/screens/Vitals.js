import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactLoading from 'react-loading';
import RedButton from "../components/RedButton";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

function Vitals(props) {

  const history = useHistory();

  const [hover1, setHover1] = useState('#1b1717');
  const [hover2, setHover2] = useState('#CE1212');
  const [hover3, setHover3] = useState('#1b1717');
  const [hover4, setHover4] = useState('#1b1717');
  const [hover5, setHover5] = useState('#1b1717');
  const [hover6, setHover6] = useState('#1b1717');

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})
  const [user, setUser] = useState({})

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

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data())
      setLoading(false)
    }
    fetchData()
  }, [user]);

  const render = () => {
    return(
      (
        userData.completedProfile ?
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
          
        </div>
        :
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
          <Image src={require('../assets/images/steps.png')} style={{height: 300, alignSelf: 'center', marginRight: 120, marginTop: 20}}/>
          <label style={{fontSize: 30, fontFamily: 'roboto-700', color: '#1b1717', alignSelf: 'center', marginTop: 20, marginRight: 120}}>Profile Not Complete</label>
          <label style={{fontSize: 20, fontFamily: 'Archivo', color: '#1b1717', textAlign: 'center', marginTop: 20, marginRight: 120}}>It looks like you have not completed your profile registration.</label>
          <RedButton onClick={() => history.push('/profile/complete')} style={{width: 200, height: 40, marginTop: 20, alignSelf: 'center', marginRight: 120}} title={'Complete Profile'}/>
        </div>
      )
    )
  }

  return (
    <Container style={{display: "flex", flexDirection: 'column'}}>
        <Header firstName={user.displayName}/>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: 80, width: 200}}>
            <label onMouseEnter={() => setHover1('#810000')} onMouseLeave={() => setHover1('#1b1717')} style={{color: hover1, fontFamily: 'Archivo', cursor: 'pointer', marginTop: 20, fontSize: 15}} onClick={() => history.push('/profile/home')}>Home</label>
            <label onMouseEnter={() => setHover2('#810000')} onMouseLeave={() => setHover2('#CE1212')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover2}} onClick={() => history.push('/profile/vitals')}>My Vitals</label>
            <label onMouseEnter={() => setHover3('#810000')} onMouseLeave={() => setHover3('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover3}} onClick={() => history.push('/profile/symptoms')}>My Symptoms</label>
            <label onMouseEnter={() => setHover4('#810000')} onMouseLeave={() => setHover4('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover4}} onClick={() => history.push('/profile/doctors')}>Doctors</label>
            <label onMouseEnter={() => setHover5('#810000')} onMouseLeave={() => setHover5('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover5}} onClick={() => history.push('/profile/messages')}>Messages</label>
            <div style={{height: 3, width: 60, backgroundColor: '#CE1212', marginTop: 10}}/>
            <label onMouseEnter={() => setHover6('#810000')} onMouseLeave={() => setHover6('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover6}} onClick={() => {signOut(auth).then(() => {history.push('/');})}}>Log Out</label>
          </div>
          {loading ?
            <div div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200, alignItems: 'center', marginRight: 120, justifyContent: 'center', height: 400}}>
              <ReactLoading type={"spin"} color={"#CE1212"} height={50} width={50}/>
            </div>
            :
            render()
          }
        </div>
        <Footer />
    </Container>
  );
}

const Container = styled.div`
`;

const Image = styled.img`
`;

export default Vitals;