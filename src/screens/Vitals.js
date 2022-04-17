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
import TemperatureMonitor from "../components/TemperatureMonitor";
import OxygenMonitor from "../components/OxygenMonitor";
import HeartMonitor from "../components/HeartMonitor";

function Vitals(props) {

  const history = useHistory();

  var today = new Date();
  var date = today.getDay()
  var dateNumber = today.getDate()

  const monthDefault = ['1', '6', '12', '18', '24', '30']
  var monthNow = []
  if(dateNumber > 30){
    monthNow = ['1', '6', '12', '18', '24', dateNumber]
  }
  else if(dateNumber > 24 && dateNumber <= 30){
    monthNow = ['1', '6', '12', '18', '24', dateNumber]
  }
  else if(dateNumber > 18 && dateNumber <= 24){
    monthNow = ['1', '6', '12', '18', dateNumber]
  }
  else if(dateNumber > 12 && dateNumber <= 18){
    monthNow = ['1', '6', '12', dateNumber]
  }
  else if(dateNumber > 6 && dateNumber <= 12){
    monthNow = ['1', '6', dateNumber]
  }
  else if(dateNumber <= 6){
    monthNow = ['1', dateNumber]
  }
  const monthDaysLeft = monthDefault.slice(monthNow.length-1, monthDefault.length);
  const month = monthDaysLeft.concat(monthNow)

  const weekDefault = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 'Friday', 'Saturday']
  const weekDaysNow = weekDefault.slice(0, date+1)
  const weekDaysLeft = weekDefault.slice(date+1,weekDefault.length)
  const week = weekDaysLeft.concat(weekDaysNow)

  const day = ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '6 PM', '9 PM']

  const [hover1, setHover1] = useState('#1b1717');
  const [hover2, setHover2] = useState('#CE1212');
  const [hover3, setHover3] = useState('#1b1717');
  const [hover4, setHover4] = useState('#1b1717');
  const [hover5, setHover5] = useState('#1b1717');
  const [hover6, setHover6] = useState('#1b1717');

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})
  const [user, setUser] = useState({})

  const [period, setPeriod] = useState('Week')

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(user)
    } else {
      // User is signed out
      history.push('/')
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

  const goBack = () => {
    if(period === 'Today'){
      setPeriod('Week')
    }
    else if(period === 'Week'){
      setPeriod('Month')
    }
  }

  const goForward = () => {
    if(period === 'Week'){
      setPeriod('Today')
    }
    else if(period === 'Month'){
      setPeriod('Week')
    }
  }

  const temperatureData = [
    {
      "x": period === 'Week' ? week[0] : (period === 'Month' ? month[0] : day[0]),
      "y": 37.0
    },
    {
      "x": period === 'Week' ? week[1] : (period === 'Month' ? month[1] : day[1]),
      "y": 40.1
    },
    {
      "x": period === 'Week' ? week[2] : (period === 'Month' ? month[2] : day[2]),
      "y": 39.6
    },
    {
      "x": period === 'Week' ? week[3] : (period === 'Month' ? month[3] : day[3]),
      "y": 38.7
    },
    {
      "x": period === 'Week' ? week[4] : (period === 'Month' ? month[4] : day[4]),
      "y": 37.9
    },
    {
      "x": period === 'Week' ? week[5] : (period === 'Month' ? month[5] : day[5]),
      "y": 37.0
    },
    {
      "x": period === 'Week' ? week[6] : (period === 'Month' ? month[6] : day[6]),
      "y": 36.7
    },
  ]

  const oxygenData = [
    {
      "x": period === 'Week' ? week[0] : (period === 'Month' ? month[0] : day[0]),
      "y": 99.3
    },
    {
      "x": period === 'Week' ? week[1] : (period === 'Month' ? month[1] : day[1]),
      "y": 99.1
    },
    {
      "x": period === 'Week' ? week[2] : (period === 'Month' ? month[2] : day[2]),
      "y": 100
    },
    {
      "x": period === 'Week' ? week[3] : (period === 'Month' ? month[3] : day[3]),
      "y": 98.8
    },
    {
      "x": period === 'Week' ? week[4] : (period === 'Month' ? month[4] : day[4]),
      "y": 96.8
    },
    {
      "x": period === 'Week' ? week[5] : (period === 'Month' ? month[5] : day[5]),
      "y": 92.8
    },
    {
      "x": period === 'Week' ? week[6] : (period === 'Month' ? month[6] : day[6]),
      "y": 95.4
    },
  ]

  const heartData = [
    {
      "x": period === 'Week' ? week[0] : (period === 'Month' ? month[0] : day[0]),
      "y": 99
    },
    {
      "x": period === 'Week' ? week[1] : (period === 'Month' ? month[1] : day[1]),
      "y": 120
    },
    {
      "x": period === 'Week' ? week[2] : (period === 'Month' ? month[2] : day[2]),
      "y": 100
    },
    {
      "x": period === 'Week' ? week[3] : (period === 'Month' ? month[3] : day[3]),
      "y": 104
    },
    {
      "x": period === 'Week' ? week[4] : (period === 'Month' ? month[4] : day[4]),
      "y": 144
    },
    {
      "x": period === 'Week' ? week[5] : (period === 'Month' ? month[5] : day[5]),
      "y": 99
    },
    {
      "x": period === 'Week' ? week[6] : (period === 'Month' ? month[6] : day[6]),
      "y": 100
    },
  ]

  const temperature = [
    {
      "id": "Temperature",
      "color": "hsl(280, 70%, 0%)",
      "data": temperatureData
    }
  ]

  const oxygen = [
    {
      "id": "Oxygen Level",
      "color": "hsl(280, 0%, 0%)",
      "data": oxygenData
    }
  ]

  const heart = [
    {
      "id": "BPM",
      "color": "hsl(249, 70%, 50%)",
      "data": heartData
    }
  ]

  const render = () => {
    return(
      (
        userData.completedProfile ?
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200, marginRight: 120}}>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: -5}}>
            <Image onClick={() => goBack()} src={require('../assets/images/arrow-back2.png')} style={{height: 50, alignSelf: 'center', cursor: 'pointer', color: period === 'Month' ? '#fff' : ''}}/>
            <text style={{color: '#1b1717', fontSize: 30, alignSelf: 'center', fontFamily: 'Archivo'}}>{period}</text>
            <Image onClick={() => goForward()} src={require('../assets/images/arrow-back3.png')} style={{height: 50, alignSelf: 'center', cursor: 'pointer', color: period === 'Today' ? '#fff' : ''}}/>
          </div>
          <TemperatureMonitor data={temperature}/>
          <OxygenMonitor data={oxygen}/>
          <HeartMonitor data={heart}/>
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
            <label onMouseEnter={() => setHover1('#810000')} onMouseLeave={() => setHover1('#1b1717')} style={{color: hover1, fontFamily: 'Archivo', cursor: 'pointer', marginTop: 20, fontSize: 15, marginRight: 'auto'}} onClick={() => history.push('/profile/home')}>Home</label>
            <label onMouseEnter={() => setHover2('#810000')} onMouseLeave={() => setHover2('#CE1212')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover2, marginRight: 'auto'}} onClick={() => history.push('/profile/vitals')}>My Vitals</label>
            <label onMouseEnter={() => setHover3('#810000')} onMouseLeave={() => setHover3('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover3, marginRight: 'auto'}} onClick={() => history.push('/profile/symptoms')}>My Symptoms</label>
            <label onMouseEnter={() => setHover4('#810000')} onMouseLeave={() => setHover4('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover4, marginRight: 'auto'}} onClick={() => history.push('/profile/doctors')}>Doctors</label>
            <label onMouseEnter={() => setHover5('#810000')} onMouseLeave={() => setHover5('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover5, marginRight: 'auto'}} onClick={() => history.push('/profile/messages')}>Messages</label>
            <div style={{height: 3, width: 60, backgroundColor: '#CE1212', marginTop: 10}}/>
            <label onMouseEnter={() => setHover6('#810000')} onMouseLeave={() => setHover6('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover6, marginRight: 'auto'}} onClick={() => {signOut(auth)}}>Log Out</label>
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