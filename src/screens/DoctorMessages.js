import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import DoctorHeader from "../components/DoctorHeader";
import Footer from "../components/Footer";
import ReactLoading from 'react-loading';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot, collection, where, query, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import DoctorChatCard from "../components/DoctorChatCard";

function DoctorMessages(props) {

  const history = useHistory();

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  const [hover1, setHover1] = useState('#1b1717');
  const [hover2, setHover2] = useState('#5463FF');
  const [hover3, setHover3] = useState('#1b1717');

  const [selectedChat, setSelectedChat] = useState('');
  const [message, setMessage] = useState('')

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

  const [chats, setChats] = useState([])

  useEffect(() => {
    async function fetchData() {
        const q = query(collection(db, "chats"), where("doctorID", "==", user.uid));
        onSnapshot(q, (querySnapshot) => {
            let arr = []
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
                if(selectedChat !== '' && doc.data().id === selectedChat.id){
                    selectedChat.messages = doc.data().messages
                }
            });
            setChats(arr)
            setLoading(false)
        });
    }
    fetchData()
  }, [selectedChat, user]);

  const handleSend = async () => {
      if(message !== ''){
        let arr = selectedChat.messages
        const messageData = {
            author: {id: user.uid},
            createdAt: Date.now(),
            text: message,
            id: uuidv4(),
            type: 'text',
        }
        arr.push(messageData)
        setMessage('')
        await updateDoc(doc(db, "chats", selectedChat.id), {
          messages: arr,
          lastModified: Date.now()
        });
      }
  }

  const render = () => {
    return(
      (
        chats.length === 0 ?
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
                <Image src={require('../assets/images/connect.png')} style={{height: 300, alignSelf: 'center', marginRight: 120}}/>
                <label style={{fontSize: 30, fontFamily: 'Archivo', fontWeight: 'bold', color: '#1b1717', alignSelf: 'center', marginTop: 20, marginRight: 120}}>No Chats Available</label>
                <label style={{fontSize: 20, fontFamily: 'Archivo', color: '#1b1717', textAlign: 'center', marginTop: 20, marginRight: 120}}>It looks like you do not have any ongoing chats with any of the patients.</label>
            </div>
              :  
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: 50, width: window.innerWidth-200, marginRight: 120, height: 600, marginBottom: -15}}>  
                <div style={{display: 'flex', flexDirection: 'column', overflowY: 'scroll', marginTop: 20, height: 600}}>
                    {chats.map((chat, index) => (
                        <DoctorChatCard onClick={() => setSelectedChat(chat)} chat={chat} key={index}/>
                    ))} 
                </div> 
                <div style={{display: 'flex', flexDirection: 'column', flex: 1, marginTop: 20, height: 600}}>
                    {selectedChat === '' ?
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <text style={{fontFamily: 'roboto-700', fontSize: 35, marginLeft: '25%'}}>You don’t have a <br/>chat selected</text>
                        <text style={{fontFamily: 'Archivo', fontSize: 18, marginLeft: '25%', marginTop: 10}}>Choose one from your existing messages, or start a new one.</text>
                    </div>
                    :
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                        <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Image src={require('../assets/images/profileicon.png')} style={{width: 30, height: 28, borderRadius: 500, marginLeft: 10}}/>
                            <text style={{fontFamily: 'roboto-700', fontSize: 15, marginLeft: 10}}>{selectedChat.user.firstName} {selectedChat.user.lastName}</text>
                            <Image src={require('../assets/images/info.png')} style={{width: 33, marginLeft: 'auto', cursor: 'pointer', marginRight: 20}}/>
                        </div>
                        <div id="chat" style={{height: 500, display: 'flex', flexDirection: 'column', overflowY: 'scroll'}}>
                            {selectedChat.messages.map((message, index) => (
                                <div key={index} style={{backgroundColor: message.author.id === user.uid ? '#5463FF' : '#1B1717', borderRadius: 20, maxWidth: 200, display: 'flex', marginTop: 5, marginLeft: message.author.id === user.uid ? "auto" : 10, marginRight: 10}}>
                                    <label style={{color: '#eeebdd', fontSize: 18, fontFamily: 'Archivo', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10}}>{message.text}</label>
                                </div>
                            ))} 
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 'auto', marginBottom: 20, paddingTop: 10}}>
                            <input style={{height: 30, paddingLeft: 10, width: '80%', fontSize: 15, borderRadius: 25, marginLeft: 10, border: '2px solid grey'}} placeholder="Start a new message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                            <Image onClick={() => handleSend()} src={require('../assets/images/send.png')} style={{width: 25, marginLeft: 'auto', cursor: 'pointer'}}/>
                        </div>
                    </div>
                    }
                </div>       
            </div>
      )
    )
  }

  return (
    <Container style={{display: "flex", flexDirection: 'column'}}>
        <DoctorHeader user={user}/>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 80, width: 200}}>
                <text onMouseEnter={() => setHover1('#11468F')} onMouseLeave={() => setHover1('#1b1717')} style={{color: hover1, fontFamily: 'Archivo', cursor: 'pointer', marginTop: 20, fontSize: 15, marginRight: 'auto'}} onClick={() => history.push('/doctor/home')}>Home</text>
                <text onMouseEnter={() => setHover2('#11468F')} onMouseLeave={() => setHover2('#5463FF')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover2, marginRight: 'auto'}} onClick={() => history.push('/doctor/messages')}>Messages</text>
                <div style={{height: 3, width: 60, backgroundColor: '#5463FF', marginTop: 10}}/>
                <text onMouseEnter={() => setHover3('#11468F')} onMouseLeave={() => setHover3('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover3, marginRight: 'auto'}} onClick={() => {signOut(auth).then(() => {history.push('/');})}}>Log Out</text>
            </div>
          {loading ?
            <div div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200, alignItems: 'center', marginRight: 120, justifyContent: 'center', height: 400}}>
              <ReactLoading type={"spin"} color={"#5463FF"} height={50} width={50}/>
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

export default DoctorMessages;