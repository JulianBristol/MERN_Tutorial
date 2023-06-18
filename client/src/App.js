import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import UpdateFood from "./UpdateFood/UpdateFood";

function App() {
  /* Add Data to the database */
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);

  /* Receive data from the database */
  const [foodList, setFoodList] = useState([]);

  /* Update element and send to the database */
  const [displayEdit, setDisplayEdit] = useState(false);
  const [updateFood, setUpdateFood] = useState("");
  const [initialName, setInitialName] = useState("");
  const [updateDays, setUpdateDays] = useState(0);
  const [updateId, setUpdateId] = useState("");

  /* Database Queries -- BEGIN --*/
  const readDatabase = () => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }
  /* Database Create/Write */
  const addToDatabase = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    })
    .then(() => {
      readDatabase();
    });
  };

  /* Database Read */
  useEffect(() => {
    readDatabase();
  }, []);

  /* Database Update */
  const update = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: updateFood,
      days: updateDays,
    })
    .then(() => {
      readDatabase();
    });
  };

  /* Database Delete */
  const deleteFromDatabase = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
    .then(() => {
      readDatabase();
    });
  }
  /* Database Queries -- END --*/

  /* Functions */
  /* Capitalize */
  const capitalize = (str) => {
    var strArray = str.split(' ');
    for (var i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].substring(1);
    }
    return strArray.join(' ');
  }

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>

      <label>Food Name</label>
      <input
        type="text"
        placeholder={foodName}
        onChange={(e) => {
          setFoodName(capitalize(e.target.value));
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

      {/* Alter Database Entry Window -- BEGIN -- */}
      <div
        className="divAnchor"
        style={{ display: displayEdit ? "block" : "none" }}
      >
        <UpdateFood
        initialName={initialName}
          foodName={updateFood}
          setUpdateFood={setUpdateFood}
          days={updateDays}
          setUpdateDays={setUpdateDays}
          id={updateId}
          setDisplayEdit={setDisplayEdit}
          update={update}
          capitalize={capitalize}
        />
      </div>
      {/* Alter Database Entry Window -- END -- */}

      <hr />

      {/* List Foods from Database -- BEGIN -- */}
      <h1>Food List</h1>
      <table>
        <tbody>
          <tr>
            <th>
              <h2>Name</h2>
            </th>
            <th>
              <h2>Consumed</h2>
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
                  <h3>{val.daysSinceConsumed} days ago</h3>
                </td>
                <td>

                  <button
                    className="upBtn"
                    onClick={(e) => {
                      setUpdateFood(val.foodName);
                      setInitialName(val.foodName)
                      setUpdateDays(val.daysSinceConsumed);
                      setUpdateId(val._id);
                      setDisplayEdit(true);
                    }}
                  >
                    Update
                  </button>

                  <button className="delBtn" onClick={() => {
                    deleteFromDatabase(val._id)
                  }}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* List Foods from Database -- END -- */}

    </div>
  );
}

export default App;
