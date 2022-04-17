import React, {useState} from "react";
import styled from "styled-components";

function DoctorCard(props) {

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 350, height: 150, backgroundColor: 'white', borderRadius: 10, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 20}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 30}}>
          <text style={{fontFamily: 'roboto-700'}}>{props.doctor.firstName} {props.doctor.lastName}</text>
          <text style={{fontFamily: 'Archivo'}}>{props.doctor.specialty}</text>
        </div>
        <Image src={props.doctor.profileImageUrl} style={{width: 50, height: 50, borderRadius: 500, marginRight: 30}}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 'auto', height: 60}}>
        <div style={{display: 'flex', flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid black', borderRight: '1px solid black', cursor: 'pointer'}}>
          <Image src={require('../assets/images/email.png')} style={{height: 20, width: 30}}/>
          <text style={{marginLeft: 10, fontFamily: 'Archivo'}}>Email</text>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid black', cursor: 'pointer'}}>
          <Image src={require('../assets/images/chat.png')} style={{height: 20, width: 30}}/>
          <text style={{marginLeft: 10, fontFamily: 'Archivo'}}>Chat</text>
        </div>
      </div>
    </div>
  );
}

const Image = styled.img`
`;

export default DoctorCard;
