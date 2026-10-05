import { useState, useEffect } from "react";

const EMPTY = { plate: "", owner: "", type: "Car", slot: "", timeIn: "" };

// CHILD 1: form for adding a vehicle or editing an existing one.
// Receives data (vehicles, editing) and functions (onAdd, onUpdate, onCancel) as props.
function ParkingForm({ vehicles, editing, onAdd, onUpdate, onCancel }) {
  const [form, setForm] = useState(EMPTY);   // useState manages the form inputs
  const [message, setMessage] = useState("");

  // When the parent says "edit this vehicle", fill the form with its values
  useEffect(() => {
    setForm(editing ? editing : EMPTY);
    setMessage("");
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const plate = form.plate.trim().toUpperCase();
    const slot = form.slot.trim().toUpperCase();
    const owner = form.owner.trim();

    if (!plate || !owner || !slot || !form.timeIn) {
      setMessage("Fill in the plate number, owner, slot, and time in.");
      return;
    }

    // A slot can only hold one vehicle
    const slotTaken = vehicles.some(
      (v) => v.slot === slot && (!editing || v.id !== editing.id)
    );
    if (slotTaken) {
      setMessage(`Slot ${slot} is already taken. Choose another slot.`);
      return;
    }

    const vehicle = { ...form, plate, slot, owner };

    if (editing) {
      onUpdate(vehicle);
    } else {
      onAdd(vehicle);
      setForm(EMPTY);
    }
    setMessage("");
  };

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>{editing ? `Edit ${editing.plate}` : "Park a vehicle"}</h2>

      <label>
        Plate number
        <input name="plate" value={form.plate} onChange={handleChange} placeholder="ABC 1234" />
      </label>

      <label>
        Owner
        <input name="owner" value={form.owner} onChange={handleChange} placeholder="Full name" />
      </label>

      <label>
        Vehicle type
        <select name="type" value={form.type} onChange={handleChange}>
          <option>Car</option>
          <option>Motorcycle</option>
          <option>Van</option>
          <option>Truck</option>
        </select>
      </label>

      <div className="row">
        <label>
          Slot
          <input name="slot" value={form.slot} onChange={handleChange} placeholder="A1" />
        </label>
        <label>
          Time in
          <input type="time" name="timeIn" value={form.timeIn} onChange={handleChange} />
        </label>
      </div>

      {message && <p className="form-message">{message}</p>}

      <div className="actions">
        <button type="submit" className="btn primary">
          {editing ? "Save changes" : "Park vehicle"}
        </button>
        {editing && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ParkingForm;
