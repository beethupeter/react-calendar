import React, { useState } from 'react';

function PopUp(props){
    const [item, setItem] = useState('');
    return (
        <div className="popup-container">
            <span className="popup-close" onClick={props.onClose}>X</span>
            <div className="list-box">
                <ul className="list">
                    {props.events.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div class="button-box">
               <input
                    className="popup-text"
                    type="text"
                    placeholder="Event Name"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />
               <input
                    className="popup-button"
                    type="button"
                    value="Add"
                    onClick={() => {
                        props.onAdd(item);
                        setItem('');
                    }}
                />
            </div>
        </div>
    )
}
export default PopUp;