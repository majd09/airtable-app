import React, { useState } from "react";

export default function NewProjectForm({ onCreate }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Not Started");

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    await onCreate({
      "Project Name": name,
      "Project Description": desc,
      "Project Status": status,
    });
    setName("");
    setDesc("");
    setStatus("Not Started");
  }

  return (
    <form className="new-form" onSubmit={submit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
      />
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Not Started</option>
        <option>In Progress</option>
        <option>Blocked</option>
        <option>Done</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
