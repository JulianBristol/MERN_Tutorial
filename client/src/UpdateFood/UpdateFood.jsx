import React, { useState } from 'react'
import './updateFood.css'

const UpdateFood = (props) => {

    const [foodName, setFoodName] = useState(props.foodName);
    const [days, setDays] = useState(0);

  return (
    <div>
      <div className="divFloat">
        <h1>Update {props.foodName}</h1>
        <button id="clsBtn" onClick={() =>{
            props.setDisplayEdit(false);}
        }>x</button>
        <div className='test'>
      <label>Food Name</label>
      <input
        type="text"
        placeholder={props.foodName}
        value={props.foodName}
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      </div>
        <div className='test'>
      <label>Days Since You Ate It</label>
      <input
        type="number"
        placeholder={props.days}
        value={props.days}
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
        </div>
      <button className="upBtn" onClick={() =>{
            props.setDisplayEdit(false);}
        }>Update</button>
      </div>
    </div>
  )
}

export default UpdateFood
