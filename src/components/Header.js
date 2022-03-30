import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function Header(props) {
    
  const history = useHistory();

  const [hover1, setHover1] = useState('#2D31FA');
  const [hover2, setHover2] = useState('#2D31FA');
  const [hover3, setHover3] = useState('#2D31FA');

  return (
    <div style={{height: 58, backgroundColor: '#2D31FA', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
      <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 20}} onClick={() => history.push('/')}>
        <label style={{color: '#fff', fontFamily: 'Helvetica Bold', marginLeft: 10, fontSize: 20, cursor: 'pointer'}}>Coligo Challenge</label>
      </div>

      <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 20, height: '100%'}}>
        <div onMouseOver={() => setHover1('#051367')} onMouseLeave={() => setHover1('#2D31FA')} style={{height: '100%', width: 120, cursor: 'pointer', backgroundColor: hover1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onClick={() => history.push('/challenge/first')}>
            <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 16, cursor: 'pointer'}}>Challenge 1</label>
            {props.selected === 'first' ? <div style={{position: 'absolute', top: 0, width: 120, height: 5, backgroundColor: '#fff'}} /> : null}
        </div>
        <div onMouseOver={() => setHover2('#051367')} onMouseLeave={() => setHover2('#2D31FA')} style={{height: '100%', width: 120, cursor: 'pointer', backgroundColor: hover2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onClick={() => history.push('/challenge/second')}>
            <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 16, cursor: 'pointer'}}>Challenge 2</label>
            {props.selected === 'second' ? <div style={{position: 'absolute', top: 0, width: 120, height: 5, backgroundColor: '#fff'}} /> : null}
        </div>
        <div onMouseOver={() => setHover3('#051367')} onMouseLeave={() => setHover3('#2D31FA')} style={{height: '100%', width: 120, cursor: 'pointer', backgroundColor: hover3, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onClick={() => history.push('/challenge/third')}>
            <label style={{color: '#fff', fontFamily: 'Helvetica Bold', fontSize: 16, cursor: 'pointer'}}>Challenge 3</label>
            {props.selected === 'third' ? <div style={{position: 'absolute', top: 0, width: 120, height: 5, backgroundColor: '#fff'}} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
