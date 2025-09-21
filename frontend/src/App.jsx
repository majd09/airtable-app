import React, { useEffect, useState } from "react";
import { fetchProjects, createProject } from "./services/api";
import ProjectCard from "./components/ProjectCard";
import NewProjectForm from "./components/NewProjectForm";
import "./styles.css";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const recs = await fetchProjects();
      setProjects(recs || []);
      setError(null);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  async function handleCreate(fields) {
    try {
      await createProject(fields);
      await load();
    } catch (err) {
      alert("Create failed: " + err.message);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Projects</h1>
        <button onClick={load}>Refresh</button>
      </header>

      <NewProjectForm onCreate={handleCreate} />

      {loading && <p>Loading…</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="grid">
        {projects.map((r) => (
          <ProjectCard key={r.id} record={r} onUpdated={load} />
        ))}
      </div>
    </div>
  );
}
