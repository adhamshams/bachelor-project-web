import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactLoading from 'react-loading';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc, onSnapshot, collection, where, query, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import RedButton from "../components/RedButton";
import ChatCard from "../components/ChatCard";

function Messages(props) {

  const history = useHistory();

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})
  const [user, setUser] = useState({})

  const [hover1, setHover1] = useState('#1b1717');
  const [hover2, setHover2] = useState('#1b1717');
  const [hover3, setHover3] = useState('#1b1717');
  const [hover4, setHover4] = useState('#1b1717');
  const [hover5, setHover5] = useState('#CE1212');
  const [hover6, setHover6] = useState('#1b1717');

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
        const q = query(collection(db, "chats"), where("userID", "==", user.uid));
        onSnapshot(q, (querySnapshot) => {
            let arr = []
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
                if(selectedChat !== '' && doc.data().id === selectedChat.id){
                    selectedChat.messages = doc.data().messages
                }
            });
            setChats(arr)
        });
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data())
        setLoading(false)
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
        userData.completedProfile ?
        (
            chats.length === 0 ?
            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
                <Image src={require('../assets/images/connect.png')} style={{height: 300, alignSelf: 'center', marginRight: 120}}/>
                <label style={{fontSize: 30, fontFamily: 'Archivo', fontWeight: 'bold', color: '#1b1717', alignSelf: 'center', marginTop: 20, marginRight: 120}}>No Chats Available</label>
                <label style={{fontSize: 20, fontFamily: 'Archivo', color: '#1b1717', textAlign: 'center', marginTop: 20, marginRight: 120}}>It looks like you do not have any ongoing chats with any of the doctors.</label>
            </div>
              :  
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: 50, width: window.innerWidth-200, marginRight: 120, height: 600, marginBottom: -15}}>  
                <div style={{display: 'flex', flexDirection: 'column', overflowY: 'scroll', marginTop: 20, height: 600}}>
                    {chats.map((chat, index) => (
                        <ChatCard onClick={() => setSelectedChat(chat)} chat={chat} key={index}/>
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
                            <Image src={selectedChat.doctor.profileImageUrl} style={{width: 30, height: 28, borderRadius: 500, marginLeft: 10}}/>
                            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                                <text style={{fontFamily: 'roboto-700', fontSize: 15, marginLeft: 10}}>{selectedChat.doctor.firstName} {selectedChat.doctor.lastName}</text>
                                <text style={{fontFamily: 'Archivo', fontSize: 15, marginLeft: 10}}>{selectedChat.doctor.specialty}</text>
                            </div>
                            <Image src={require('../assets/images/info.png')} style={{width: 33, marginLeft: 'auto', cursor: 'pointer', marginRight: 20}}/>
                        </div>
                        <div id="chat" style={{height: 500, display: 'flex', flexDirection: 'column', overflowY: 'scroll'}}>
                            {selectedChat.messages.map((message, index) => (
                                <div key={index} style={{backgroundColor: message.author.id === user.uid ? '#CE1212' : '#1B1717', borderRadius: 20, maxWidth: 200, display: 'flex', marginTop: 5, marginLeft: message.author.id === user.uid ? "auto" : 10, marginRight: message.author.id !== user.uid ? "auto" : 10}}>
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
        :
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200}}>
          <Image src={require('../assets/images/steps.png')} style={{height: 300, alignSelf: 'center', marginRight: 120, marginTop: 20}}/>
          <label style={{fontSize: 30, fontFamily: 'roboto-700', color: '#1b1717', alignSelf: 'center', marginTop: 20, marginRight: 120}}>Profile Not Complete</label>
          <label style={{fontSize: 20, fontFamily: 'Archivo', color: '#1b1717', textAlign: 'center', marginTop: 20, marginRight: 120}}>It looks like you have not completed your profile registration.</label>
          <RedButton onClick={() => history.push('/profile/complete')} style={{width: 200, height: 40, marginTop: 20, alignSelf: 'center', marginRight: 120}} title={'Complete Profile'}/>
        </div>
      )
    )
  }

  return (
    <Container style={{display: "flex", flexDirection: 'column'}}>
        <Header firstName={user.displayName}/>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', marginLeft: 80, width: 200}}>
            <label onMouseEnter={() => setHover1('#810000')} onMouseLeave={() => setHover1('#1b1717')} style={{color: hover1, fontFamily: 'Archivo', cursor: 'pointer', marginTop: 20, fontSize: 15, marginRight: 'auto'}} onClick={() => history.push('/profile/home')}>Home</label>
            <label onMouseEnter={() => setHover2('#810000')} onMouseLeave={() => setHover2('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover2, marginRight: 'auto'}} onClick={() => history.push('/profile/vitals')}>My Vitals</label>
            <label onMouseEnter={() => setHover3('#810000')} onMouseLeave={() => setHover3('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover3, marginRight: 'auto'}} onClick={() => history.push('/profile/symptoms')}>My Symptoms</label>
            <label onMouseEnter={() => setHover4('#810000')} onMouseLeave={() => setHover4('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover4, marginRight: 'auto'}} onClick={() => history.push('/profile/doctors')}>Doctors</label>
            <label onMouseEnter={() => setHover5('#810000')} onMouseLeave={() => setHover5('#CE1212')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover5, marginRight: 'auto'}} onClick={() => history.push('/profile/messages')}>Messages</label>
            <div style={{height: 3, width: 60, backgroundColor: '#CE1212', marginTop: 10}}/>
            <label onMouseEnter={() => setHover6('#810000')} onMouseLeave={() => setHover6('#1b1717')} style={{fontFamily: 'Archivo', cursor: 'pointer', marginTop: 10, fontSize: 15, color: hover6, marginRight: 'auto'}} onClick={() => {signOut(auth)}}>Log Out</label>
          </div>
          {loading ?
            <div div style={{display: 'flex', flexDirection: 'column', marginLeft: 50, width: window.innerWidth-200, alignItems: 'center', marginRight: 120, justifyContent: 'center', height: 400}}>
              <ReactLoading type={"spin"} color={"#CE1212"} height={50} width={50}/>
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

export default Messages;