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

function Symptoms(props) {

  const history = useHistory();

  const [hover1, setHover1] = useState('#1b1717');
  const [hover2, setHover2] = useState('#1b1717');
  const [hover3, setHover3] = useState('#CE1212');
  const [hover4, setHover4] = useState('#1b1717');
  const [hover5, setHover5] = useState('#1b1717');
  const [hover6, setHover6] = useState('#1b1717');

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})
  const [user, setUser] = useState({})
  const [arr, setArr] = useState([])

  function reverseArr(input) {
    var ret = [];
    for(var i = input.length-1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
  }

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
      setArr(reverseArr(docSnap.data().symptoms))
      setLoading(false)
    }
    fetchData()
  }, [user]);

  const render = () => {
    return(
      (
        userData.completedProfile ?
          (
            userData.symptoms.length === 0 ?
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
                <Image src={require('../assets/images/symptoms.png')} style={{height: 300, alignSelf: 'center', marginRight: 120}}/>
                <label style={{fontSize: 30, fontFamily: 'Archivo', fontWeight: 'bold', color: '#1b1717', alignSelf: 'center', marginTop: 20, marginRight: 120}}>Feeling Symptomatic?</label>
                <label style={{fontSize: 20, fontFamily: 'Archivo', color: '#1b1717', textAlign: 'center', marginTop: 20, marginRight: 120}}>If you are feeling sick, report your symptoms throught the application so we can connect you through to a health care professional.</label>
                <RedButton onClick={() => history.push({
                  pathname: '/report/symptoms',
                  user: userData
                })} style={{width: 240, height: 40, marginTop: 20, alignSelf: 'center', marginRight: 120}} title={'Report Symptoms'}/>
              </div>
              :     
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
                <div style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', marginRight: 120, marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                  <label style={{fontSize: 30, fontFamily: 'Archivo', color: '#1b1717'}}>Reported Symptoms</label>
                  <RedButton onClick={() => history.push({
                    pathname: '/report/symptoms',
                    user: userData
                  })} style={{width: 30, height: 30, marginLeft: 10}} title={'+'}/>
                </div>
                {arr.map((symptom, index) => (
                  <div key={index} style={{border: '2px #1b1717 solid', display: 'flex', flexDirection: 'column', marginRight: 120, borderRadius: 15, marginTop: 20}}>
                    <text style={{color: '#1b1717', fontSize: 15, fontFamily: 'Archivo', marginTop: 15, marginLeft: 10}}>Contact with Infected Person: <text style={{color: symptom.contact ? 'green' : 'red', fontFamily: 'roboto-700'}}>{symptom.contact ? 'Yes' : 'No'}</text></text>
                    <text style={{color: '#1b1717', fontSize: 15, fontFamily: 'Archivo', marginTop: 15, marginLeft: 10}}>Cough: <text style={{color: symptom.cough ? 'green' : 'red', fontFamily: 'roboto-700'}}>{symptom.cough ? 'Yes' : 'No'}</text></text>
                    <text style={{color: '#1b1717', fontSize: 15, fontFamily: 'Archivo', marginTop: 15, marginLeft: 10}}>Headache: <text style={{color: symptom.headache ? 'green' : 'red', fontFamily: 'roboto-700'}}>{symptom.headache ? 'Yes' : 'No'}</text></text>
                    <text style={{color: '#1b1717', fontSize: 15, fontFamily: 'Archivo', marginTop: 15, marginLeft: 10}}>Sore Throat: <text style={{color: symptom.throat ? 'green' : 'red', fontFamily: 'roboto-700'}}>{symptom.throat ? 'Yes' : 'No'}</text></text>
                    <text style={{color: '#1b1717', fontSize: 15, fontFamily: 'Archivo', marginTop: 15, marginLeft: 10}}>Shortness of Breath: <text style={{color: symptom.breath ? 'green' : 'red', fontFamily: 'roboto-700'}}>{symptom.breath ? 'Yes' : 'No'}</text></text>
                    <text style={{color: '#1b1717', fontSize: 15, fontFamily: 'Archivo', marginTop: 15, marginLeft: 10}}>Fever: <text style={{color: symptom.fever ? 'green' : 'red', fontFamily: 'roboto-700'}}>{symptom.fever ? 'Yes' : 'No'}</text></text>
                    <text style={{color: '#1b1717', fontSize: 15, fontFamily: 'Archivo', marginTop: 15, marginLeft: 10, marginRight: 10}}>Other Symptoms: <text style={{color: symptom.other === '' ? 'red' : '#1b1717', fontFamily: 'roboto-700'}}>{symptom.other === '' ? 'No' : symptom.other}</text></text>
                    <text style={{color: '#1b1717', fontSize: 15, fontFamily: 'Archivo', marginTop: 15, marginLeft: 10}}>Diagnosis: <text style={{color: symptom.diagnosis === "1" ? 'green' : 'red', fontFamily: 'roboto-700'}}>{symptom.diagnosis === "1" ? 'Positive' : 'Negative'}</text></text>
                    <text style={{color: '#696969', fontSize: 15, fontFamily: 'Archivo', marginTop: 15, marginLeft: 10, marginRight: 10, textAlign: 'center'}}>Our diagnosis are based on data you have submitted but are not accurate. Please get a PCR test to confirm your diagnosis.</text>
                    <text style={{color: '#1b1717', fontSize: 15, fontFamily: 'Archivo', marginTop: 15, marginLeft: 10, marginBottom: 10}}>Reported On: <text style={{fontFamily: 'roboto-700'}}>{symptom.reportedAt}</text></text>
                  </div>
                ))}  
              </div>
          )
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
            <label onMouseEnter={() => setHover2('#810000')} onMouseLeave={() => setHover2('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover2}} onClick={() => history.push('/profile/vitals')}>My Vitals</label>
            <label onMouseEnter={() => setHover3('#810000')} onMouseLeave={() => setHover3('#CE1212')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover3}} onClick={() => history.push('/profile/symptoms')}>My Symptoms</label>
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

export default Symptoms;