import React, {useState, useEffect} from "react";
import styled from "styled-components";
import RedButton from "../components/RedButton";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import "react-calendar/dist/Calendar.css"
import {db, auth} from '../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'

function SignUp(props) {

    const history = useHistory();

    const [conditionsMet, setConditionsMet] = useState([]);
    const [passowrdStrength, setPasswordStrength] = useState('Weak');
  
    const [errors, setErrors] = useState([]);
  
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthMonthDisplayed, setBirthMonthDisplayed] = useState('');
    const [birthYear, setBirthYear] = useState(new Date().getFullYear());
    const [birthDay, setBirthDay] = useState('');

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  
    const [color, setColor] = useState('red');

    function getAge(date) {
      var today = new Date();
      var age = today.getFullYear() - date.getFullYear();
      var m = today.getMonth() - date.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
          age--;
      }
      return age;
    }

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

  function checkPassword(password){
    setPassword(password)
    if(password.length >= 8 && !conditionsMet.includes('length')){
      const arr = [...conditionsMet];
      arr.push('length')
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
    }
    else if(password.length < 8 && conditionsMet.includes('length')){
      const arr = [...conditionsMet];
      arr.splice(arr.indexOf('length'), 1);
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
    }
    if(/\d/.test(password) && !conditionsMet.includes('number')){
      const arr = conditionsMet.slice();
      arr.push('number')
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
    }
    else if(!/\d/.test(password) && conditionsMet.includes('number')){
      const arr = conditionsMet.slice();
      arr.splice(arr.indexOf('number'), 1);
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
    }
    if(/[A-Z]/.test(password) && !conditionsMet.includes('upper')){
      const arr = conditionsMet.slice();
      arr.push('upper')
      if(password.length === 8){
        arr.push('length')
      }
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
    }
    else if(!/[A-Z]/.test(password) && conditionsMet.includes('upper')){
      const arr = conditionsMet.slice();
      arr.splice(arr.indexOf('upper'), 1);
      setConditionsMet(arr)
      if(arr.length === 1){
        setPasswordStrength('Weak')
        setColor('red')
      }
      else if(arr.length === 2){
        setPasswordStrength('Medium')
        setColor('orange')
      }
      else if(arr.length === 3){
        setPasswordStrength('Strong')
        setColor('green')
      }
    }
  }

  const renderErrors = () => {
    let errorArr = [];
    for(let i = 0; i < errors.length; i++){
        errorArr.push(
            <label style={{fontFamily: 'Archivo', color: '#f00', marginTop: 10, marginBottom: 10}}>{errors[i]}</label>
        )
    }
    return errorArr;
}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handle(event){
    event.preventDefault(); 
    setErrors([])
    setFirstNameError(false)
    setLastNameError(false)
    setPhoneNumberError(false)
    setDateError(false)
    setEmailError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    const birthDate = new Date(birthYear, birthMonth, birthDay)
    let re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const arr = [];
    setLoading(true)
    if(firstName.length === 0){
        arr.push('Please enter your first name')
        setFirstNameError(true)
    }  
    if(lastName.length === 0){
        arr.push('Please enter your last name')
        setLastNameError(true)
    }
    if(phoneNumber.length === 0){
        arr.push('Please enter your phone number')
        setPhoneNumberError(true)
    }
    if(getAge(birthDate) < 12){
      arr.push('You have to be greater than 12 years old')
      setDateError(true)
    }
    if(gender === ''){
      arr.push('Please select your gender')
      setGenderError(true)
    }
    if(email.length === 0){
        arr.push('Please enter your email address')
        setEmailError(true)
    }
    else if(!re.test(email)){
        arr.push('Please enter a valid email address')
        setEmailError(true)
    }
    if(password.length === 0){
        arr.push('Please enter a password')
        setPasswordError(true)
    }
    else if(password !== confirmPassword){
        arr.push('Passwords do not match')
        setConfirmPasswordError(true)
    }
    else if(passowrdStrength !== 'Strong'){
        arr.push('Please fullfil all password requirements')
        setPasswordError(true)
    }
    setErrors(arr)
    if(arr.length === 0){
      try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          phoneNumber: phoneNumber,
          dateOfBirth: birthDate.toLocaleDateString(),
          completedProfile: false,
          symptoms: []
        });
        history.push('/complete')
      } catch(err) {
        arr.push(err.message === 'Firebase: Error (auth/email-already-in-use).' ? 'Email already in use' : err.message)
        if(err.message === 'Firebase: Error (auth/email-already-in-use).'){
          setEmailError(true) 
        }
        setErrors(arr)
        setLoading(false)
      }
    }
    else{
        setLoading(false)
    }
  }

  const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  var max = new Date().getFullYear()
  var min = max - 120
  var years = []

  for (var i = max; i >= min; i--) {
    years.push(i)
  }

  const [daysArray, setDaysArray] = useState([])

  useEffect(() => {
    var maxDay = new Date(birthYear, birthMonth, 0).getDate()
    let days = []
    for (var i = 1; i <= maxDay; i++) {
      days.push(i)
    }
    setDaysArray(days)
  }, [birthYear, birthMonth]);

  const handleMonthChange = (event) => {
    setDateError(false)
    var d = Date.parse(event.target.value + "1, 2012");
    setBirthMonth(new Date(d).getMonth() + 1);
    setBirthMonthDisplayed(event.target.value)
  };

  const handleYearChange = (event) => {
    setDateError(false)
    setBirthYear(event.target.value);
  };

  const handleDayChange = (event) => {
    setDateError(false)
    setBirthDay(event.target.value);
  };

  return (
    <Container>
      <div style={{height: 70, backgroundColor: '#1B1717', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
        <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 120}} onClick={() => history.push('/')}>
            <text style={{color: '#eeebdd', fontFamily: 'roboto-700', fontSize: 25, cursor: 'pointer'}}>Appname</text>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <label style={{fontFamily: 'Archivo', fontSize: 14, marginTop: 50}}>A P P N A M E</label>
        <label style={{fontFamily: 'Archivo', fontSize: 37, marginTop: 10}}>Account Registration</label>
        <label style={{textAlign: 'center', fontFamily: 'Archivo', fontSize: 14, marginTop: 10}}>Open up a world of digital healthcare when you sign up.</label>
        <div style={{boxShadow: '0px 1px 5px  0.35px #000', width: '80%', marginTop: 30, display: 'flex', flexDirection: 'row'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '60%', alignItems: 'center'}}>
            <div style={{width: '85%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', marginTop: 20}}>
              <input style={{height: 50, width: '47%', fontSize: 20, border: firstNameError ? '2px solid red' : '1px solid lightgray', borderRadius: 5}} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              <input style={{height: 50, width: '47%', fontSize: 20, border: lastNameError ? '2px solid red' : '1px solid lightgray', borderRadius: 5}} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div style={{marginTop: 20, width: '85%', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <PhoneInput
                country={'eg'}
                style={{border: phoneNumberError ? '2px solid red' : '', width: '47%', borderRadius: 5}}
                enableSearch={true}
                countryCodeEditable={false}
                value={phoneNumber} 
                onChange={phone => {setPhoneNumber('+' + phone)}}
              />
            </div>
            <div style={{marginTop: 20, height: 100, width: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <text style={{fontSize: 20, fontFamily: 'Archivo'}}>Date of Birth</text>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                <select value={birthMonthDisplayed} onChange={handleMonthChange} style={{height: 50, width: '32%', borderRadius: 5, border: dateError ? '2px solid red' : '1px solid lightgray'}}>
                  {Months.map((month) => (
                    <option value={month}>{month}</option>
                  ))}
                </select>
                <select value={birthDay} onChange={handleDayChange} style={{height: 50, width: '32%', borderRadius: 5, border: dateError ? '2px solid red' : '1px solid lightgray'}}>
                  {daysArray.map((day) => (
                    <option value={day}>{day}</option>
                  ))}
                </select>
                <select value={birthYear} onChange={handleYearChange} style={{height: 50, width: '32%', borderRadius: 5, border: dateError ? '2px solid red' : '1px solid lightgray'}}>
                  {years.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <label style={{fontFamily: 'Archivo', marginTop: 10, fontSize: 12, textAlign: 'center'}}>Your age will not be shown publicly on your profile.</label>
            </div>
            <div style={{width: '85%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', marginTop: 20}}>
              <div onClick={() => {setGender('Male'); setGenderError(false)}} style={{height: 50, width: '47.5%', border: genderError ? '2px solid red' : (gender === 'Male' ? '2px solid #0f0' : '1px solid lightgray'), cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
                <Logo src={require("../assets/images/male.png")} style={{width: 20, height: 20}}/>
                <text style={{marginLeft: 10, fontSize: 20, color: '#1b1717', fontFamily: 'Archivo'}}>Male</text>
              </div>
              <div onClick={() => {setGender('Female'); setGenderError(false)}} style={{height: 50, width: '47.5%', border: genderError ? '2px solid red' : (gender === 'Female' ? '2px solid #0f0' : '1px solid lightgray'), cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
                <Logo src={require("../assets/images/female.png")} style={{width: 20, height: 20}}/>
                <text style={{marginLeft: 10, fontSize: 20, color: '#1b1717', fontFamily: 'Archivo'}}>Female</text>
              </div>
            </div>
            <input style={{height: 50, width: '84.2%', fontSize: 20, marginTop: 20, borderRadius: 5, border: emailError ? '2px solid red' : '1px solid lightgray'}} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type={'email'}/>
            <div style={{width: '85%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', marginTop: 20}}>
              <input style={{height: 50, width: '47%', fontSize: 20, borderRadius: 5, border: passwordError ? '2px solid red' : '1px solid lightgray'}} autoComplete="new-password" placeholder="Password" type={'password'} value={password} onChange={(e) => checkPassword(e.target.value)}/>
              <input style={{height: 50, width: '47%', fontSize: 20, borderRadius: 5, border: confirmPasswordError ? '2px solid red' : '1px solid lightgray'}} placeholder="Confirm Password" type={'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <div style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center', marginTop: 20}}>
              <div style={{width: '25%', height: 4, backgroundColor: password.length > 0 ? color : 'gray' }}/>
              <div style={{width: '25%', height: 4, marginLeft: 10, backgroundColor: passowrdStrength !== 'Weak'  && password.length > 0 ? color : 'gray'}}/>
              <div style={{width: '25%', height: 4, marginLeft: 10, backgroundColor: passowrdStrength === 'Strong' && password.length > 0 ? color : 'gray'}}/>
            </div>
            <label style={{fontFamily: 'Archivo', marginTop: 10, fontSize: 14}}>Password Strength: <label style={{fontFamily: 'Archivo Black'}}>{password.length > 0 ? passowrdStrength : ''}</label></label>
            <label style={{fontFamily: 'Archivo', marginTop: 10, fontSize: 12, textAlign: 'center'}}>Your password should contain a minimum of eight characters. Please use a combination of uppercase and lowercase letters along with numbers.</label>
            <div style={{width: '100%', flexDirection: 'row', display: 'flex', marginTop: 20, alignItems: 'center'}}>
              <input style={{height: 60, width: 60, marginLeft: 20}} type={'checkbox'}/>
              <label style={{fontFamily: 'Archivo', marginLeft: 10, fontSize: 13}}>Sign up to receive Appname newsletters and special offer emails. You can unsubscribe at any time via the link in our emails, by updating your Appname account preferences or by contacting us. For more details on how we use your personal information, please see our privacy policy.</label>
            </div>
            {errors.length === 0 ? null : <div style={{width: '80%', backgroundColor: '#ffdbe0', border: '2px solid red', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              {renderErrors()}
            </div>}
            <RedButton onClick={handle} loading={loading} style={{width: 250, height: 50, marginTop: 20}} title={'Create Account'}/>
            <label style={{fontFamily: 'Archivo', fontSize: 13, marginBottom: 40, marginTop: 40}}>By creating an account you are agreeing to the Appname programme rules and our privacy policy.</label>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', width: '40%', alignItems: 'center'}}>
            <Logo src={require("../assets/images/signup.jpg")} style={{width: '93%', height: 240, marginTop: 20}}/>
            <div style={{width: '80%', height: 300, boxShadow: '0px 1px 5px  0.35px #000', marginTop: -20, zIndex: 1000, backgroundColor: '#fff', display: 'flex', flexDirection: 'column'}}>
              <label style={{fontFamily: 'Archivo', fontSize: 26, marginLeft: 20, marginTop: 30}}>Change the way you <br/>take care of your health</label>
              <div style={{width: 40, marginTop: 20, marginLeft: 20, height: 3, backgroundColor: '#CE1212'}}/>
              <label style={{marginLeft: 20, marginTop: 20, fontFamily: 'Archivo', marginRight: 20}}>It costs nothing to join - just complete this application form and start enjoying the digital healthcare. Connect with a health care professional at any time and get medical advise anytime anywhere.</label>
              <label style={{marginLeft: 20, marginBottom: 30, marginTop: 'auto', fontFamily: 'Archivo', marginRight: 20, fontSize: 14}}>For more information please check the Terms and Conditions.</label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
`;

export default SignUp;