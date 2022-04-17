import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import DoctorHeader from "../components/DoctorHeader";
import Footer from "../components/Footer";
import ReactLoading from 'react-loading';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

function DoctorProfile(props) {

  const history = useHistory();

  const [hover1, setHover1] = useState('#5463FF');
  const [hover2, setHover2] = useState('#1b1717');
  const [hover3, setHover3] = useState('#1b1717');

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})
  const [user, setUser] = useState({})

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      user.uid === 'QImcv95RSjhpIAKMRHuUpXwHa7C3' ? setUser(user) : history.push('/profile/home')
    } else {
      // User is signed out
    }
  });

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "doctors", user.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data())
      setLoading(false)
    }
    fetchData()
  }, [user]);

  const render = () => {
    return(
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200, marginRight: 120}}>
          <Image4 style={{height: 250, marginTop: 20, display: 'flex', flexDirection: 'column', boxShadow: '0px 1px 5px  0.35px #000',}}>
            <div style={{width: '100%', height: 170, display: 'flex', flexDirection: 'row', marginTop: 'auto', backgroundColor: '#fff', boxShadow: '0px 0.5px 0.5px  0px #000'}}>
              <div style={{width: '49.5%', display: 'flex', flexDirection: 'column'}}>
                <Image style={{width: 90, height: 90, marginLeft: 40, marginTop: -45, border: '6px solid white', borderRadius: 50}} src={user.photoURL}/>
                <text style={{marginLeft: 46, marginTop: 10, fontFamily: 'Archivo', fontSize: 20, fontWeight: 'bold'}}>Dr. {userData.firstName} {userData.lastName}</text>
                <text style={{marginLeft: 46, marginTop: 'auto', marginBottom: 20, fontFamily: 'Archivo', fontSize: 15}}>User ID: {user.uid}</text>
              </div>
              <div style={{height: '85%', backgroundColor: 'grey', width: 2, alignSelf: 'center'}}/>
                <div style={{width: '49.5%', display: 'flex', flexDirection: 'column'}}>
                  <text style={{marginLeft: 40, marginTop: 20, fontFamily: 'Archivo', fontSize: 20}}>Status</text>
                </div>
              </div>
          </Image4>
          <div style={{height: 400}}>

          </div>
        </div>
    )
  }

  return (
    <Container style={{display: "flex", flexDirection: 'column'}}>
        <DoctorHeader user={user}/>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: 80, width: 200}}>
            <text onMouseEnter={() => setHover1('#11468F')} onMouseLeave={() => setHover1('#5463FF')} style={{color: hover1, fontFamily: 'Archivo', cursor: 'pointer', marginTop: 20, fontSize: 15, marginRight: 'auto'}} onClick={() => history.push('/doctor/home')}>Home</text>
            <text onMouseEnter={() => setHover2('#11468F')} onMouseLeave={() => setHover2('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover2, marginRight: 'auto'}} onClick={() => history.push('/doctor/messages')}>Messages</text>
            <div style={{height: 3, width: 60, backgroundColor: '#5463FF', marginTop: 10}}/>
            <text onMouseEnter={() => setHover3('#11468F')} onMouseLeave={() => setHover3('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover3, marginRight: 'auto'}} onClick={() => {signOut(auth).then(() => {history.push('/');})}}>Log Out</text>
          </div>
          {loading ?
            <div div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200, alignItems: 'center', marginRight: 120, justifyContent: 'center', height: 400}}>
              <ReactLoading type={"spin"} color={"#5463FF"} height={50} width={50}/>
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

const Image4 = styled.div`
  background-image: url(${require("../assets/images/backgroundD.webp")});
  background-size: cover;
`;

export default DoctorProfile;