import React from "react";
import "./updateFood.css";

const UpdateFood = (props) => {
  return (
    <>
      <div className="divFloat">
        <h1>Update {props.foodName}</h1>

        <button
          id="clsBtn"
          onClick={() => {
            props.setDisplayEdit(false);
          }}
        >
          x
        </button>

        <div className="field top">
          <label>Update Food Name</label>
          <input
            type="text"
            placeholder={props.foodName}
            value={props.foodName}
            onChange={(e) => {
              props.setUpdateFood(e.target.value);
            }}
          />
        </div>

        <div className="field bottom"
            style={{ position: 'relative' }}>
          <label>Comsumed</label>
          <input
            type="number"
            placeholder={props.days}
            value={props.days}
            onChange={(e) => {
              props.setUpdateDays(e.target.value);
            }}
          />
          <span>days ago</span>
        </div>

        <button
          className="upBtn float"
          onClick={() => {
            props.update();
            props.setDisplayEdit(false);
          }}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default UpdateFood;
