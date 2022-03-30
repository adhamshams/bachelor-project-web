import React, { useState } from "react";
import ReactLoading from 'react-loading';

function RedButton(props) {
  const [hover, setHover] = useState('#CE1212');

  return (
    <div
      onMouseEnter={() => setHover('#810000')} 
      onMouseLeave={() => setHover('#CE1212')}
      onClick={props.disabled ? null : props.onClick}
      style={{...props.style, background: props.disabled ? 'rgba(220,220,220,1)' : hover, cursor: props.disabled ? 'default': 'pointer', borderRadius: props.style.borderRadius || 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
    >
      {props.loading ? <ReactLoading type={"spin"} color={"#eeebdd"} height={27} width={27}/> : <label style={{fontFamily: 'roboto-regular', fontSize: props.style.fontSize||17, color: props.style.color||'#eeebdd', cursor: props.disabled? 'default': 'pointer'}}>{props.title}</label>}
    </div>
  );
}

export default RedButton;
