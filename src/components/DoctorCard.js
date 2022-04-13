import React, {useState} from "react";
import styled from "styled-components";

function DoctorCard(props) {

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 350, height: 150, backgroundColor: 'white', borderRadius: 10, boxShadow: '0px 1px 5px  0.35px #000', cursor: 'pointer'}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 30}}>
          <text style={{fontFamily: 'Helvetica Bold'}}>{props.doctor.firstName} {props.doctor.lastName}</text>
          <text style={{fontFamily: 'Helvetica'}}>Software Engineer</text>
        </div>
        <div style={{width: 50, height: 50, borderRadius: 500, backgroundColor: 'lightgrey', marginRight: 30}}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 'auto', height: 60}}>
        <div style={{display: 'flex', flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid black', borderRight: '1px solid black'}}>
          <Image src={require('../assets/images/email.png')} style={{height: 20}}/>
          <text>Email</text>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black'}}>
          <Image src={require('../assets/images/chat.png')} style={{height: 20}}/>
          <text style={{marginLeft: 10}}>Chat</text>
        </div>
      </div>
    </div>
  );
}

const Image = styled.img`
`;

export default DoctorCard;
