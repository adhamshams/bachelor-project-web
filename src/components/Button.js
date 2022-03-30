import React, { useState } from "react";
import ReactLoading from 'react-loading';

function Button(props) {
  const [hover, setHover] = useState('#eeebdd');

  return (
    <div
      onMouseEnter={() => setHover('#aaa799')} 
      onMouseLeave={() => setHover('#eeebdd')}
      onClick={props.disabled ? null : props.onClick}
      style={{...props.style, background: props.disabled ? 'rgba(220,220,220,1)' : hover, cursor: props.disabled ? 'default': 'pointer', borderRadius: props.style.borderRadius || 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
    >
      {props.loading ? <ReactLoading type={"spin"} color={"#000"} height={27} width={27}/> : <label style={{fontFamily: 'Archivo', fontSize: props.style.fontSize||17, color: props.style.color||'#1B1717', cursor: props.disabled? 'default': 'pointer'}}>{props.title}</label>}
    </div>
  );
}

export default Button;
