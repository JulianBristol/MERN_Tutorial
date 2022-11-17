import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);

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

      <hr />
      <h1>Food List</h1>
      <table>
        <tbody>
          <tr>
            <th>
              <h1>Food Name</h1>
            </th>
            <th>
              <h1>Days Since Consumed</h1>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
