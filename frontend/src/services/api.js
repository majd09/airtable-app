const BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function fetchProjects() {
  const res = await fetch(`${BASE}/api/projects`);
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.records || [];
}

export async function createProject(fields) {
  const res = await fetch(`${BASE}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateProject(id, fields) {
  const res = await fetch(`${BASE}/api/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
