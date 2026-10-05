import { useState, useEffect } from "react";
import ParkingForm from "./components/ParkingForm";
import ParkingList from "./components/ParkingList";
import "./App.css";

// PARENT component: holds all the data and the CRUD functions,
// then passes them down to the two children through props.
function App() {
  const [vehicles, setVehicles] = useState([]);       // list of parked vehicles
  const [editing, setEditing] = useState(null);       // vehicle being edited (or null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // READ: load the JSON file once, when the app first shows
  useEffect(() => {
    fetch("/parking.json")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load parking.json");
        return res.json();
      })
      .then((data) => setVehicles(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // CREATE
  const addVehicle = (vehicle) => {
    setVehicles([...vehicles, { ...vehicle, id: Date.now() }]);
  };

  // UPDATE
  const updateVehicle = (updated) => {
    setVehicles(vehicles.map((v) => (v.id === updated.id ? updated : v)));
    setEditing(null);
  };

  // DELETE
  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
    if (editing && editing.id === id) setEditing(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="p-sign">P</div>
        <div>
          <h1>Parking System</h1>
          <p>{vehicles.length} vehicle{vehicles.length === 1 ? "" : "s"} parked right now</p>
        </div>
      </header>

      <main className="layout">
        {/* Child 1: the form (create + update) */}
        <ParkingForm
          vehicles={vehicles}
          editing={editing}
          onAdd={addVehicle}
          onUpdate={updateVehicle}
          onCancel={() => setEditing(null)}
        />

        {/* Child 2: the list (read + delete, and picks which one to edit) */}
        {loading ? (
          <p className="notice">Loading parked vehicles…</p>
        ) : error ? (
          <p className="notice error">{error}. Check that parking.json is inside the public folder.</p>
        ) : (
          <ParkingList
            vehicles={vehicles}
            onEdit={setEditing}
            onDelete={deleteVehicle}
          />
        )}
      </main>
    </div>
  );
}

export default App;
