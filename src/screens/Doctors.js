import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RedButton from "../components/RedButton";
import ReactLoading from 'react-loading';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'
import DoctorCard from "../components/DoctorCard";

function Doctors(props) {

  const history = useHistory();

  const [loading, setLoading] = useState(true)

  const [hover1, setHover1] = useState('#1b1717');
  const [hover2, setHover2] = useState('#1b1717');
  const [hover3, setHover3] = useState('#1b1717');
  const [hover4, setHover4] = useState('#CE1212');
  const [hover5, setHover5] = useState('#1b1717');
  const [hover6, setHover6] = useState('#1b1717');

  var user = JSON.parse(localStorage.getItem('user'));
  const [doctors, setDoctors] = useState([])

  const [id, setId] = useState('')

  useEffect(() => {
    async function fetchData() {
        let arr = []
        const querySnapshot = await getDocs(collection(db, "doctors"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          arr.push(doc.data())
          //console.log(doc.id, " => ", doc.data());
        });
        setDoctors(arr)
        setLoading(false)
    }
    fetchData()
  }, []);

  return (
    <Container style={{display: "flex", flexDirection: 'column'}}>
        <Header firstName={user.firstName}/>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: 80, width: 200}}>
          <label onMouseEnter={() => setHover1('#810000')} onMouseLeave={() => setHover1('#1b1717')} style={{color: hover1, fontFamily: 'Archivo', cursor: 'pointer', marginTop: 20, fontSize: 15}} onClick={() => history.push('/profile')}>Home</label>
            <label onMouseEnter={() => setHover2('#810000')} onMouseLeave={() => setHover2('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover2}} onClick={() => history.push('/profile/vitals')}>My Vitals</label>
            <label onMouseEnter={() => setHover3('#810000')} onMouseLeave={() => setHover3('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover3}} onClick={() => history.push('/profile/symptoms')}>My Symptoms</label>
            <label onMouseEnter={() => setHover4('#810000')} onMouseLeave={() => setHover4('#CE1212')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover4}} onClick={() => history.push('/profile/doctors')}>Doctors</label>
            <label onMouseEnter={() => setHover5('#810000')} onMouseLeave={() => setHover5('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover5}} onClick={() => history.push('/profile/messages')}>Messages</label>
            <label onMouseEnter={() => setHover6('#810000')} onMouseLeave={() => setHover6('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover6}} onClick={() => {history.push('/'); localStorage.clear()}}>Log Out</label>
          </div>
            {
                loading ?
                <div div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200, alignItems: 'center', marginRight: 120, justifyContent: 'center', height: 500}}>
                    <ReactLoading type={"spin"} color={"#CE1212"} height={50} width={50}/>
                </div>
                :
                <div div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
                    {doctors.map((doctor, index) => (
                        <DoctorCard doctor={doctor} key={index}/>
                    ))}  
                </div>
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

export default Doctors;