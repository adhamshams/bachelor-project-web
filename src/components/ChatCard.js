import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";

function ChatCard(props) {

    const [time, setTime] = useState('')
    const [text, setText] = useState('')
    const [background, setBackground] = useState('white')

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if(props.lastText){
          const currentDate = new Date()
  
          const diffTime = Math.abs(currentDate - props.lastText.createdAt);
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
          else if(diffSeconds > 1){
            setTime(diffSeconds + 's')
          }
          if(props.lastText.author.id === user.uid){
            setText('You: ' + props.lastText.text)
          } 
          else{
            setText(props.lastText.text)
          }
        }
      }, [props.lastText, user.uid])

  return (
    <div onClick={props.onClick} onMouseEnter={() => setBackground('lightgrey')} onMouseLeave={() => setBackground('white')} style={{display: 'flex', flexDirection: 'column', width: 350, height: 70, backgroundColor: background, cursor: 'pointer'}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Image src={props.chat.doctor.profileImageUrl} style={{width: 50, height: 50, borderRadius: 500, marginLeft: 10}}/>
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 20}}>
          <text style={{fontFamily: 'roboto-700'}}>{props.chat.doctor.firstName} {props.chat.doctor.lastName}</text>
          <text style={{fontFamily: 'Archivo'}}>{text}</text>
        </div>
        <text style={{fontFamily: 'Archivo', marginLeft: 'auto', marginRight: 10, fontSize: 13}}>{time}</text>
      </div>
    </div>
  );
}

const Image = styled.img`
`;

export default ChatCard;
