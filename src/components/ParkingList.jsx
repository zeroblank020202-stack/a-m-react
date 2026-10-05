import { useState } from "react";

// CHILD 2: shows the parked vehicles.
// Receives the data (vehicles) and the functions (onEdit, onDelete) as props.
function ParkingList({ vehicles, onEdit, onDelete }) {
  const [search, setSearch] = useState("");

  const term = search.trim().toLowerCase();
  const shown = vehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(term) ||
      v.owner.toLowerCase().includes(term) ||
      v.slot.toLowerCase().includes(term)
  );

  return (
    <section className="panel list">
      <div className="list-head">
        <h2>Parked vehicles</h2>
        <input
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plate, owner, or slot"
          aria-label="Search parked vehicles"
        />
      </div>

      {vehicles.length === 0 ? (
        <p className="notice">The lot is empty. Park a vehicle using the form.</p>
      ) : shown.length === 0 ? (
        <p className="notice">No vehicle matches "{search}".</p>
      ) : (
        <ul className="slots">
          {shown.map((v) => (
            <li key={v.id} className="slot">
              <span className="slot-code">{v.slot}</span>
              <div className="slot-info">
                <strong>{v.plate}</strong>
                <span>{v.owner}</span>
                <span className="muted">{v.type}, in at {v.timeIn}</span>
              </div>
              <div className="slot-actions">
                <button className="btn" onClick={() => onEdit(v)}>Edit</button>
                <button className="btn danger" onClick={() => onDelete(v.id)}>Check out</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ParkingList;
