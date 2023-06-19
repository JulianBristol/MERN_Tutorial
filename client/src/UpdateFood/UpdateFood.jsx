import React from "react";
import "./updateFood.css";

const UpdateFood = (props) => {
  return (
    <>
      <div className="divFloat">
        <h1>Update {props.initialName}</h1>

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
              props.setUpdateFood(props.capitalize(e.target.value));
            }}
          />
        </div>

        <div className="field bottom"
            style={{ position: 'relative' }}>
          <label>Quantity</label>
          <input
            type="number"
            placeholder={props.days}
            value={props.days}
            min={1}
            onChange={(e) => {
              props.setUpdateDays(e.target.value);
            }}
          />
          {/* <span>days ago</span> */}
        </div>

        <button
          className="upBtn float"
          onClick={() => {
            props.update(props.id);
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
