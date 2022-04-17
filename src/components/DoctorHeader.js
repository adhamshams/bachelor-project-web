import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

function DoctorHeader(props) {
    
  const history = useHistory();

  const [hover6, setHover6] = useState('#eeebdd');

  return (
      <div style={{height: 70, backgroundColor: '#1B1717', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
        <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 80}} onClick={() => history.push('/')}>
          <text style={{color: '#eeebdd', fontFamily: 'roboto-700', fontSize: 25, cursor: 'pointer'}}>Appname For Doctors</text>
        </div>
        {props.user ? 
        <div onMouseOver={() => setHover6('#40DFEF')} onMouseLeave={() => setHover6('#eeebdd')}  onClick={() => history.push('/doctor/home')} style={{marginRight: 80, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer', marginLeft: 'auto'}}>
          <Image src={props.user.photoURL} style={{height: 30, width: 30, borderRadius: 1000}}/>
          <text style={{color: hover6, fontFamily: 'roboto-700', fontSize: 18, marginLeft: 10}}>{props.user.displayName}</text> 
        </div>
        : 
        <Button onClick={() => history.push('/login')} title={'Login'} style={{height: 30, width: 100, marginLeft: 'auto', marginRight: 80}}/>
        }
      </div>
  );
}

const Image = styled.img`
`;

export default DoctorHeader;
