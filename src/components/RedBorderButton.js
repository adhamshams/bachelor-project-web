import React, { useState } from "react";
import ReactLoading from 'react-loading';

function RedBorderButton(props) {
  const [hover, setHover] = useState('transparent');

  return (
    <div
      onMouseEnter={() => setHover('#810000')} 
      onMouseLeave={() => setHover('transparent')}
      onClick={props.disabled ? null : props.onClick}
      style={{...props.style, background: props.disabled ? 'rgba(220,220,220,1)' : hover, cursor: props.disabled? 'default': 'pointer', borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: hover === '#810000' ? '2px #810000 solid' : '2px #CE1212 solid'}}
    >
      {props.loading ? <ReactLoading type={"spin"} color={"#f4f4f4"} height={27} width={27}/> : <label style={{fontFamily: 'roboto-regular', fontSize: 17, color: hover === '#810000' ? '#eeebdd' : '#CE1212' , cursor: props.disabled ? 'default': 'pointer'}}>{props.title}</label>}
    </div>
  );
}

export default RedBorderButton;