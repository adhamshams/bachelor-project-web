import React, {useState, useEffect} from "react";
import styled from "styled-components";

function DoctorChatCard(props) {

    const [time, setTime] = useState('')
    const [text, setText] = useState('')
    const [background, setBackground] = useState('white')

    useEffect(() => {
        if(props.chat.messages.length > 0){
          const currentDate = new Date()
  
          const diffTime = Math.abs(currentDate - props.chat.messages[props.chat.messages.length - 1].createdAt);
          const diffSeconds = Math.ceil(diffTime / (1000)); 
          const diffMinutes = Math.ceil(diffTime / (1000 * 60));
          const diffHours =  Math.ceil(diffTime / (1000 * 60 * 60));
          const diffDays =  Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
          if(diffDays > 1){
            setTime(diffDays + 'd')
          }
          else if(diffHours > 1){
            setTime(diffHours + 'h')
          }
          else if(diffMinutes > 1){
            setTime(diffMinutes + 'm')
          }
          else if(diffSeconds >= 0){
            setTime(diffSeconds + 's')
          }
          setText(props.chat.messages[props.chat.messages.length - 1].text)
        }
      }, [props.chat])

  return (
    <div onClick={props.onClick} onMouseEnter={() => setBackground('lightgrey')} onMouseLeave={() => setBackground('white')} style={{display: 'flex', flexDirection: 'column', width: 350, height: 70, backgroundColor: background, cursor: 'pointer'}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Image src={require('../assets/images/profileicon.png')} style={{width: 50, height: 50, borderRadius: 500, marginLeft: 10}}/>
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 20}}>
          <text style={{fontFamily: 'roboto-700'}}>{props.chat.user.firstName} {props.chat.user.lastName}</text>
          <text style={{fontFamily: 'Archivo'}}>{text}</text>
        </div>
        <text style={{fontFamily: 'Archivo', marginLeft: 'auto', marginRight: 10, fontSize: 13}}>{time}</text>
      </div>
    </div>
  );
}

const Image = styled.img`
`;

export default DoctorChatCard;
