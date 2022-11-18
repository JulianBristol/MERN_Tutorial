import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import UpdateFood from "./UpdateFood/UpdateFood";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [updateFood, setUpdateFood] = useState("");
  const [updateNum, setUpdateNum] = useState(0);
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToDatabase = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Food Name</label>
      <input
        type="text"
        placeholder={foodName}
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <label>Days Since You Ate It</label>
      <input
        type="number"
        placeholder={days}
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
      <button onClick={addToDatabase}>Add to List</button>

      <div
        className="divAnchor"
        style={{ display: displayEdit ? "block" : "none" }}
      >
        <UpdateFood
          foodName={updateFood}
          days={updateNum}
          key={updateKey}
          setDisplayEdit={setDisplayEdit}
        />
      </div>

      <hr />
      <h1>Food List</h1>
      <table>
        <tbody>
          <tr>
            <th>
              <h2>Food Name</h2>
            </th>
            <th>
              <h2>Last Consumed</h2>
            </th>
            <th>
              <h2>Options</h2>
            </th>
          </tr>
          {foodList.map((val, key) => {
            return (
              <tr key={key}>
                <td>
                  <h3>{val.foodName}</h3>
                </td>
                <td>
                  <h3>{val.daysSinceConsumed}</h3>
                </td>
                <td>
                  <button
                    className="upBtn"
                    onClick={(e) => {
                      setUpdateFood(val.foodName);
                      setUpdateNum(val.daysSinceConsumed);
                      setUpdateKey(key);
                      setDisplayEdit(true);
                    }}
                  >
                    Update
                  </button>
                  <button className="delBtn">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
