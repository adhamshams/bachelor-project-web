import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import RedButton from "../components/RedButton";
import Switch from "react-switch";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from 'axios'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {updateDoc, doc} from 'firebase/firestore'
import { db } from '../firebase'

function ReportSymptoms(props) {

    const history = useHistory();
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

    const [loading, setLoading] = useState(false)

    const [contact, setContact] = useState(false)
    const [headache, setHeadache] = useState(false)
    const [breath, setBreath] = useState(false)
    const [throat, setThroat] = useState(false)
    const [cough, setCough] = useState(false)
    const [fever, setFever] = useState(false)
    const [other, setOther] = useState(false)
    const [otherSymptoms, setOtherSymptoms] = useState('')

    const [otherError, setOtherError] = useState(false)

    function getAge(date) {
        var today = new Date();
        var age = today.getFullYear() - date.getFullYear();
        var m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
            age--;
        }
        return age;
    }

    async function handle(){
        setOtherError(false)
        setLoading(true)
        if(other && otherSymptoms === ''){
            setOtherError(true)
            setLoading(false)
        }
        else{
          var formData = new FormData();
          formData.append('head_ache', headache ? '1' : '0')
          formData.append('test_indication', contact ? '1' : '0')
          formData.append('shortness_of_breath', breath ? '1' : '0')
          formData.append('sore_throat', throat ? '1' : '0')
          formData.append('gender', props.location.user.gender === 'Male' ? '1' : '0')
          formData.append('fever', fever ? '1' : '0')
          formData.append('cough', cough ? '1' : '0')
          formData.append('age_60_and_above', getAge(new Date(props.location.user.dateOfBirth)) >= 60 ? '1' : '0')
          const response = await fetch('https://corona-prediction-app.herokuapp.com/predict', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': "*"
              },
            body: formData
          });
          const json = await response.json();
          console.log(json)
          let symptoms = props.location.user.symptoms
          let sympObj = {
            contact: contact,
            headache: headache,
            breath: breath,
            throat: throat,
            cough: cough,
            fever: fever,
            //diagnosis: json.corona_result,
            other: other ? otherSymptoms : '',
            reportedAt: new Date().toLocaleString()
          }
          symptoms.push(sympObj)
          await updateDoc(doc(db, "users", user.uid), {
            symptoms: symptoms
          });
          history.push('/profile/symptoms')
          setLoading(false)
        }
    }
  

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Header firstName={user.displayName}/>
      <label style={{fontFamily: 'Archivo', fontSize: 14, marginTop: 50, textAlign: 'center'}}>A P P N A M E</label>
      <label style={{fontFamily: 'Archivo', fontSize: 37, marginTop: 10, textAlign: 'center'}}>Report Symptoms</label>
      <label style={{textAlign: 'center', fontFamily: 'Archivo', fontSize: 14, marginTop: 10}}>Fill out information about your medical history to help us get a better understanding of your condition.</label>
      <div style={{boxShadow: '0px 1px 5px  0.35px #000', width: '80%', marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', paddingBottom: 20}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Have you been in recent contact with an infected person?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setContact(val)}} checked={contact} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you have shortness of breath?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setBreath(val)}} checked={breath} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you have a sore throat?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setThroat(val)}} checked={throat} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you have a headache?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setHeadache(val)}} checked={headache} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you have a cough?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setCough(val)}} checked={cough} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you have a fever?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setFever(val)}} checked={fever} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you suffer from any other symptoms?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setOther(val)}} checked={other} />
        </div>
        {other ?
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Please specify your other symptoms below:</text>
          <input style={{height: 120, marginTop: 20, width: 400, fontSize: 20, border: otherError ? '2px solid red' : '2px solid #1b1717', borderRadius: 5}} value={otherSymptoms} onChange={(e) => {setOtherSymptoms(e.target.value); setOtherError(false)}}/>
          {otherError ? <text style={{fontSize: 20, fontFamily: 'Archivo', color: 'red', marginTop: 20}}>Please enter your other symptoms</text> : null}
        </div> 
        : null}
        <RedButton loading={loading} onClick={() => handle()} style={{width: 200, height: 40, marginTop: 20, alignSelf: 'center'}} title={'Report'}/>
      </div>
      <Footer />
    </div>
  );
}

export default ReportSymptoms;