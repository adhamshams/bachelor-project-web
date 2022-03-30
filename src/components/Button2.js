import React, { useState } from "react";
import ReactLoading from 'react-loading';

function Button2(props) {
  const [hover, setHover] = useState('transparent');

  return (
    <div
      onMouseEnter={() => setHover('#eeebdd')} 
      onMouseLeave={() => setHover('transparent')}
      onClick={props.disabled ? null : props.onClick}
      style={{...props.style, background: props.disabled ? 'rgba(220,220,220,1)' : hover, cursor: props.disabled? 'default': 'pointer', borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px #eeebdd solid'}}
    >
      {props.loading ? <ReactLoading type={"spin"} color={"#f4f4f4"} height={27} width={27}/> : <label style={{fontFamily: 'Archivo', fontSize: 17, color: hover === '#eeebdd' ? '#1b1717' : 'white' , cursor: props.disabled ? 'default': 'pointer'}}>{props.title}</label>}
    </div>
  );
}

export default Button2;