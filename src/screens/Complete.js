import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import RedButton from "../components/RedButton";
import Switch from "react-switch";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {updateDoc, doc} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../firebase'

function Complete(props) {

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

  const [step, setStep] = useState(1)

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [tookVaccine, setTookVaccine] = useState(false)
  const [vaccine, setVaccine] = useState('')
  const [fullyVaxxed, setFullyVaxxed] = useState(false)
  const [tookBooster, setTookBooster] = useState(false)
  const [boosterVaccine, setBoosterVaccine] = useState('')

  const [firstShotMonth, setFirstShotMonth] = useState('');
  const [firstShotMonthDisplayed, setFirstShotMonthDisplayed] = useState('');
  const [firstShotYear, setFirstShotYear] = useState(new Date().getFullYear());
  const [firstShotDay, setFirstShotDay] = useState('');

  const [secondShotMonth, setSecondShotMonth] = useState('');
  const [secondShotMonthDisplayed, setSecondShotMonthDisplayed] = useState('');
  const [secondShotYear, setSecondShotYear] = useState(new Date().getFullYear());
  const [secondShotDay, setSecondShotDay] = useState('');

  const [boosterShotMonth, setBoosterShotMonth] = useState('');
  const [boosterShotMonthDisplayed, setBoosterShotMonthDisplayed] = useState('');
  const [boosterShotYear, setBoosterShotYear] = useState(new Date().getFullYear());
  const [boosterShotDay, setBoosterShotDay] = useState('');

  const [recoveryMonth, setRecoveryMonth] = useState('');
  const [recoveryMonthDisplayed, setRecoveryMonthDisplayed] = useState('');
  const [recoveryYear, setRecoveryYear] = useState(new Date().getFullYear());

  const [covid, setCovid] = useState(false)
  const [respiratory, setRespiratory] = useState(false)
  const [diabetes, setDiabetes] = useState(false)
  const [cardio, setCardio] = useState(false)
  const [transplant, setTransplant] = useState(false)
  const [immunoD, setImmunoD] = useState(false)
  const [immunoM, setImmunoM] = useState(false)

  const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  var max = new Date().getFullYear()
  var years = []

  for (var i = max; i >= 2020; i--) {
    years.push(i)
  }

  const [firstShotDaysArray, setFirstShotDaysArray] = useState([])
  const [secondShotDaysArray, setSecondShotDaysArray] = useState([])
  const [boosterShotDaysArray, setBoosterShotDaysArray] = useState([])

  useEffect(() => {
    var maxDay = new Date(firstShotYear, firstShotMonth, 0).getDate()
    let days = []
    for (var i = 1; i <= maxDay; i++) {
      days.push(i)
    }
    setFirstShotDaysArray(days)
  }, [firstShotYear, firstShotMonth]);

  useEffect(() => {
    var maxDay = new Date(secondShotYear, secondShotMonth, 0).getDate()
    let days = []
    for (var i = 1; i <= maxDay; i++) {
      days.push(i)
    }
    setSecondShotDaysArray(days)
  }, [secondShotMonth, secondShotYear]);

  useEffect(() => {
    var maxDay = new Date(boosterShotYear, boosterShotMonth, 0).getDate()
    let days = []
    for (var i = 1; i <= maxDay; i++) {
      days.push(i)
    }
    setBoosterShotDaysArray(days)
  }, [boosterShotMonth, boosterShotYear]);

  let vaccines = ['Pfizer/BioNTech','Moderna','Sinovac','Sputnik','AstraZeneca','Johnson & Johnson','Sinopharm','Covishield','Other']

  const [weightError, setWeightError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('')
  const [firstShotError, setFirstShotError] = useState(false)
  const [secondShotError, setSecondShotError] = useState(false)
  const [boosterShotError, setBoosterShotError] = useState(false)
  const [recoveryError, setRecoveryError] = useState(false)

  const handleVaccineChange = (event) => {
    setVaccine(event.target.value);
    if (event.target.value === 'Johnson & Johnson'){
      setFullyVaxxed(true)
    }
  };

  const handleBoosterVaccineChange = (event) => {
    setBoosterVaccine(event.target.value);
  };

  async function handleNext(){
    if(step === 1){
      if(weight === ''){
        setWeightError(true)
      }
      if(height === ''){
        setHeightError(true)
      }
      if(weight !== '' && height !== ''){
        tookVaccine ? setStep(2) : setStep(3)
      }
    }
    else if(step === 2){
      const firstShotDate = new Date(firstShotYear, firstShotMonth, firstShotDay)
      const secondShotDate = new Date(secondShotYear, secondShotMonth, secondShotDay)
      const boosterShotDate = new Date(boosterShotYear, boosterShotMonth, boosterShotDay)
      if(firstShotDate > new Date()){
        setFirstShotError(true)
        setErrorMsg('Please enter a valid date for your first shot date')
      }
      else if(fullyVaxxed && vaccine !== 'Johnson & Johsnson' && secondShotDate < firstShotDate){
        setSecondShotError(true)
        setErrorMsg('Your second shot date cannot be before your first shot date')
      }
      else if(tookBooster && boosterShotDate < secondShotDate){
        setBoosterShotError(true)
        setErrorMsg('Your booster shot date cannot be before your second shot date')
      }
      else{
        setStep(3)
      }
    }
    else if(step === 3){
      const recoveryDate = new Date(recoveryYear, recoveryMonth, 1)
      if(covid && recoveryDate > new Date()){
        setRecoveryError(true)
        setErrorMsg('Please enter a valid date')
      }
      else{
        setLoading(true)
        const firstShotDate = new Date(firstShotYear, firstShotMonth, firstShotDay)
        const secondShotDate = new Date(secondShotYear, secondShotMonth, secondShotDay)
        const boosterShotDate = new Date(boosterShotYear, boosterShotMonth, boosterShotDay)
        await updateDoc(doc(db, "users", user.uid), {
          completedProfile: true,
          weight: weight,
          height: height,
          testedPositive: covid,
          recoveryDate: covid ? recoveryDate.toLocaleDateString() : 'N/A',
          tookVaccine: tookVaccine,
          vaccine: tookVaccine ? vaccine : 'N/A',
          fullyVaccinated: vaccine === 'Johnson & Johnson' ? true : fullyVaxxed,
          tookBooster: tookBooster,
          boosterVaccine: tookBooster ? boosterVaccine : 'N/A',
          firstShotDate: tookVaccine ? firstShotDate.toLocaleDateString() : 'N/A',
          secondShotDate: fullyVaxxed && vaccine !== 'Johnson & Johnson' ? secondShotDate.toLocaleDateString() : 'N/A',
          boosterShotDate: tookBooster ? boosterShotDate.toLocaleDateString() : 'N/A',
          respiratoryDisease: respiratory,
          diabetes: diabetes,
          cardiovascularDisease: cardio,
          organTransplant: transplant,
          immunosupressiveDisease: immunoD,
          immunosupressiveMedication: immunoM
        });
        history.push('/profile/home')
      }
    }
  }

  async function handleBack(){
    if(step === 3 && tookVaccine){
      setStep(2)
      setErrorMsg('')
      setRecoveryError(false)
    }
    else{
      setStep(1)
      setErrorMsg('')
      setBoosterShotError(false)
      setFirstShotError(false)
      setSecondShotError(false)
    }
  }

  const renderFirstStep = () => {
    return(
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo'}}>Your Weight:</text>
          <input type={'number'} style={{height: 35, marginLeft: 10, width: 70, fontSize: 20, border: weightError ? '2px solid red' : '2px solid #1b1717', borderRadius: 5}} value={weight} onChange={(e) => {setWeight(e.target.value); setWeightError(false)}}/>
          <text style={{fontSize: 20, fontFamily: 'Archivo', marginLeft: 10}}>kg</text>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo'}}>Your Height: </text>
          <input type={'number'} style={{height: 35, marginLeft: 10, width: 70, fontSize: 20, border: heightError ? '2px solid red' : '2px solid #1b1717', borderRadius: 5}} value={height} onChange={(e) => {setHeight(e.target.value); setHeightError(false)}}/>
          <text style={{fontSize: 20, fontFamily: 'Archivo', marginLeft: 10}}>cm</text>
        </div>
        <text style={{color: '#9A9A9A', fontFamily: 'roboto-regular', fontSize: 15, marginTop: 20, textAlign: 'center', marginLeft: 50, marginRight: 50}}>It is ok to estimate, you can always update your data later.</text>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Have you received any vaccine shots for Covid-19?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setTookVaccine(val); setFullyVaxxed(false); setTookBooster(false)}} checked={tookVaccine} />
        </div>
        {tookVaccine ? 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: 20}}>
            <text style={{fontSize: 20, fontFamily: 'Archivo'}}>Which vaccine have you received?</text>
            <select value={vaccine} onChange={handleVaccineChange} style={{height: 50, width: '25%', borderRadius: 5, border: '2px solid #1b1717', marginTop: 10}}>
              {vaccines.map((vaccine) => (
                <option value={vaccine}>{vaccine}</option>
              ))}
            </select>
          </div>
        : null}
        {vaccine !== 'Johnson & Johnson' && tookVaccine ?
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Have you received both shots of the vaccine?</text>
            <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setFullyVaxxed(val); setTookBooster(false)}} checked={fullyVaxxed} />
          </div>
        : null}
        {fullyVaxxed && tookVaccine ?
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Have you received a vaccine booster shot?</text>
            <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setTookBooster(val)}} checked={tookBooster} />
          </div>
        : null}
        {tookBooster && tookVaccine && fullyVaxxed ?
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20, width: '100%'}}>
            <text style={{fontSize: 20, fontFamily: 'Archivo'}}>Which booster vaccine have you received?</text>
            <select value={boosterVaccine} onChange={handleBoosterVaccineChange} style={{height: 50, width: '25%', borderRadius: 5, border: '2px solid #1b1717', marginTop: 10}}>
              {vaccines.map((vaccine) => (
                <option value={vaccine}>{vaccine}</option>
              ))}
            </select>
          </div>
        : null}
        {weightError || heightError ? <text style={{fontSize: 20, fontFamily: 'Archivo', color: 'red', marginTop: 20}}>Please enter all the required information.</text> : null}
      </div>
    )
  }

  const handleFirstShotMonthChange = (event) => {
    setFirstShotError(false)
    setErrorMsg('')
    var d = Date.parse(event.target.value + "1, 2012");
    setFirstShotMonth(new Date(d).getMonth());
    setFirstShotMonthDisplayed(event.target.value)
  };

  const handleFirstShotYearChange = (event) => {
    setFirstShotError(false)
    setErrorMsg('')
    setFirstShotYear(event.target.value);
  };

  const handleFirstShotDayChange = (event) => {
    setFirstShotError(false)
    setErrorMsg('')
    setFirstShotDay(event.target.value);
  };

  const handleSecondShotMonthChange = (event) => {
    setSecondShotError(false)
    setErrorMsg('')
    var d = Date.parse(event.target.value + "1, 2012");
    setSecondShotMonth(new Date(d).getMonth());
    setSecondShotMonthDisplayed(event.target.value)
  };

  const handleSecondShotYearChange = (event) => {
    setSecondShotError(false)
    setErrorMsg('')
    setSecondShotYear(event.target.value);
  };

  const handleSecondShotDayChange = (event) => {
    setSecondShotError(false)
    setErrorMsg('')
    setSecondShotDay(event.target.value);
  };

  const handleBoosterShotMonthChange = (event) => {
    setBoosterShotError(false)
    setErrorMsg('')
    var d = Date.parse(event.target.value + "1, 2012");
    setBoosterShotMonth(new Date(d).getMonth());
    setBoosterShotMonthDisplayed(event.target.value)
  };

  const handleBoosterShotYearChange = (event) => {
    setBoosterShotError(false)
    setErrorMsg('')
    setBoosterShotYear(event.target.value);
  };

  const handleBoosterShotDayChange = (event) => {
    setBoosterShotError(false)
    setErrorMsg('')
    setBoosterShotDay(event.target.value);
  };

  const handleRecoveryMonthChange = (event) => {
    setRecoveryError(false)
    setErrorMsg('')
    var d = Date.parse(event.target.value + "1, 2012");
    setRecoveryMonth(new Date(d).getMonth());
    setRecoveryMonthDisplayed(event.target.value)
  };

  const handleRecoveryYearChange = (event) => {
    setRecoveryError(false)
    setErrorMsg('')
    setRecoveryYear(event.target.value);
  };

  const renderSecondStep = () => {
    return(
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        <text style={{fontSize: 20, fontFamily: 'Archivo', marginTop: 20}}>{vaccine === 'Johnson & Johnson' ? 'When did you receive your vaccination shot?' : 'When did you recieve your first vaccine shot?'}</text>
        <div style={{display: 'flex', marginTop: 10, flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between'}}>
          <select value={firstShotMonthDisplayed} onChange={handleFirstShotMonthChange} style={{height: 50, width: '32%', borderRadius: 5, border: firstShotError ? '2px solid red' : '2px solid #1b1717'}}>
            {Months.map((month) => (
              <option value={month}>{month}</option>
            ))}
          </select>
          <select value={firstShotDay} onChange={handleFirstShotDayChange} style={{height: 50, width: '32%', borderRadius: 5, border: firstShotError ? '2px solid red' : '2px solid #1b1717'}}>
            {firstShotDaysArray.map((day) => (
              <option value={day}>{day}</option>
            ))}
          </select>
          <select value={firstShotYear} onChange={handleFirstShotYearChange} style={{height: 50, width: '32%', borderRadius: 5, border: firstShotError ? '2px solid red' : '2px solid #1b1717'}}>
            {years.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </select>
        </div>
        {fullyVaxxed && vaccine !== 'Johnson & Johnson' ? 
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', marginTop: 20}}>When did you recieve your second vaccine shot?</text>
          <div style={{display: 'flex', marginTop: 10, flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between'}}>
            <select value={secondShotMonthDisplayed} onChange={handleSecondShotMonthChange} style={{height: 50, width: '32%', borderRadius: 5, border: secondShotError ? '2px solid red' : '2px solid #1b1717'}}>
              {Months.map((month) => (
                <option value={month}>{month}</option>
              ))}
            </select>
            <select value={secondShotDay} onChange={handleSecondShotDayChange} style={{height: 50, width: '32%', borderRadius: 5, border: secondShotError ? '2px solid red' : '2px solid #1b1717'}}>
              {secondShotDaysArray.map((day) => (
                <option value={day}>{day}</option>
              ))}
            </select>
            <select value={secondShotYear} onChange={handleSecondShotYearChange} style={{height: 50, width: '32%', borderRadius: 5, border: secondShotError ? '2px solid red' : '2px solid #1b1717'}}>
              {years.map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        : null}
        {tookBooster ?
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', marginTop: 20}}>When did you recieve your booster vaccine shot?</text> 
          <div style={{display: 'flex', marginTop: 10, flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between'}}>
            <select value={boosterShotMonthDisplayed} onChange={handleBoosterShotMonthChange} style={{height: 50, width: '32%', borderRadius: 5, border: boosterShotError ? '2px solid red' : '2px solid #1b1717'}}>
              {Months.map((month) => (
                <option value={month}>{month}</option>
              ))}
            </select>
            <select value={boosterShotDay} onChange={handleBoosterShotDayChange} style={{height: 50, width: '32%', borderRadius: 5, border: boosterShotError ? '2px solid red' : '2px solid #1b1717'}}>
              {boosterShotDaysArray.map((day) => (
                <option value={day}>{day}</option>
              ))}
            </select>
            <select value={boosterShotYear} onChange={handleBoosterShotYearChange} style={{height: 50, width: '32%', borderRadius: 5, border: boosterShotError ? '2px solid red' : '2px solid #1b1717'}}>
              {years.map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        : null}
        <text style={{fontSize: 20, fontFamily: 'Archivo', color: 'red', marginTop: 20}}>{errorMsg}</text>
      </div>
    )
  }

  const renderThirdStep = () => {
    return(
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Have you tested positive for Covid-19 during the pandemic?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setCovid(val); setErrorMsg(''); setRecoveryError(false)}} checked={covid} />
        </div>
        {covid ? 
          <div style={{marginTop: 20, width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
            <text style={{fontSize: 20, fontFamily: 'Archivo'}}>If so, when is your estimated date of recovery?</text> 
            <text style={{fontSize: 17, fontFamily: 'Archivo', marginTop: 10, color: '#474747'}}>It is ok to estimate your date of recovery as long as it is within a month of your actual recovery date.</text> 
            <div style={{display: 'flex', marginTop: 10, flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'center'}}>
              <select value={recoveryMonthDisplayed} onChange={handleRecoveryMonthChange} style={{height: 50, width: '32%', borderRadius: 5, border: recoveryError ? '2px solid red' : '2px solid #1b1717'}}>
                {Months.map((month) => (
                  <option value={month}>{month}</option>
                ))}
              </select>
              <select value={recoveryYear} onChange={handleRecoveryYearChange} style={{height: 50, width: '32%', borderRadius: 5, border: recoveryError ? '2px solid red' : '2px solid #1b1717', marginLeft: 10}}>
                {years.map((year) => (
                  <option value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        : null}
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you suffer from any respiratory diseases?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setRespiratory(val)}} checked={respiratory} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you suffer from diabetes?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setDiabetes(val)}} checked={diabetes} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you have a history of cardiovascular diseases?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setCardio(val)}} checked={cardio} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Did you have an organ transplant?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setTransplant(val)}} checked={transplant} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you suffer from any immunosuppressive diseases?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setImmunoD(val)}} checked={immunoD} />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <text style={{fontSize: 20, fontFamily: 'Archivo', paddingRight: 10}}>Do you take any immunosuppressive medication?</text>
          <Switch uncheckedIcon={false} checkedIcon={false} onChange={(val) => {setImmunoM(val)}} checked={immunoM} />
        </div>
        <text style={{fontSize: 20, fontFamily: 'Archivo', color: 'red', marginTop: 20}}>{errorMsg}</text>
      </div>
    )
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Header firstName={user.displayName}/>
      <label style={{fontFamily: 'Archivo', fontSize: 14, marginTop: 50, textAlign: 'center'}}>A P P N A M E</label>
      <label style={{fontFamily: 'Archivo', fontSize: 37, marginTop: 10, textAlign: 'center'}}>Complete Your Profile</label>
      <label style={{textAlign: 'center', fontFamily: 'Archivo', fontSize: 14, marginTop: 10}}>Fill out information about your medical history to help us get a better understanding of your condition.</label>
      <div style={{boxShadow: '0px 1px 5px  0.35px #000', width: '80%', marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '80%', marginTop: 20, justifyContent: 'space-between'}}>
            <div style={{width: '32%', height: 5, backgroundColor: '#CE1212'}}/>
            <div style={{width: '32%', height: 5, backgroundColor:  step > 1 ? '#CE1212' : 'grey'}}/>
            <div style={{width: '32%', height: 5, backgroundColor:  step > 2 ? '#CE1212' : 'grey'}}/>
          </div>
          {step === 1 ? renderFirstStep() : (step === 2 ? renderSecondStep() : renderThirdStep())}
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 20}}>
            <RedButton disabled={step === 1} onClick={() => handleBack()} style={{width: 150, height: 40, marginLeft: 30}} title={'Back'}/>
            <RedButton onClick={() => handleNext()} loading={loading} style={{width: 150, height: 40, marginRight: 30}} title={'Next'}/>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default Complete;