import React, { useState } from "react";
import { updateProject } from "../services/api";

const STATUS_COLORS = {
  "Not Started": "#6b7280",
  "In Progress": "#0ea5e9",
  Blocked: "#ef4444",
  Done: "#10b981",
};

export default function ProjectCard({ record, onUpdated }) {
  const f = record.fields || {};
  const name = f["Project Name"] || "Untitled";
  const desc = f["Project Description"] || "";
  const status = f["Project Status"] || "Not Started";
  const [editing, setEditing] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  async function save() {
    await updateProject(record.id, { "Project Status": localStatus });
    setEditing(false);
    onUpdated?.();
  }

  return (
    <article className="card">
      <div className="card-head">
        <h3>{name}</h3>
        <span
          className="badge"
          style={{ background: STATUS_COLORS[status] || "#999" }}
        >
          {status}
        </span>
      </div>
      <p>{desc}</p>
      {editing ? (
        <>
          <select
            value={localStatus}
            onChange={(e) => setLocalStatus(e.target.value)}
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Blocked</option>
            <option>Done</option>
          </select>
          <button onClick={save}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setEditing(true)}>Edit Status</button>
      )}
    </article>
  );
}
