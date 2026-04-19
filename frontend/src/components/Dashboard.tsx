import React, { useEffect, useState } from 'react';

interface TaskItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

// --- WERSJA PANCERNA: Brak importów z innych folderów. Wbudowane API! ---
const BASE_URL = 'https://api-task-juliawr-d8d6ara7fygcekdk.polandcentral-01.azurewebsites.net/api';

const api = {
  get: async (url: string) => {
    const res = await fetch(BASE_URL + url);
    return { data: await res.json() };
  },
  post: async (url: string, body: any) => {
    const res = await fetch(BASE_URL + url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    return { data: await res.json() };
  },
  put: async (url: string, body: any) => {
    const res = await fetch(BASE_URL + url, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    return { data: await res.json() };
  },
  delete: async (url: string) => {
    await fetch(BASE_URL + url, { method: 'DELETE' });
  }
};

const Dashboard = () => {
  const [items, setItems] = useState<TaskItem[]>([]);
  const [error, setError] = useState("");
  const [newTaskName, setNewTaskName] = useState("");

  const fetchTasks = () => {
    api.get('/tasks')
      .then((res: any) => setItems(res.data))
      .catch((err: any) => {
        console.error(err);
        setError("Błąd połączenia z API.");
      });
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (err: any) {
      console.error(err);
      setError("Nie udało się usunąć zadania.");
    }
  };

  const handleToggle = async (item: TaskItem) => {
    try {
      const updated = { ...item, isCompleted: !item.isCompleted };
      await api.put(`/tasks/${item.id}`, updated);
      setItems(items.map(t => t.id === item.id ? updated : t));
    } catch (err: any) {
      console.error(err);
      setError("Nie udało się zaktualizować zadania.");
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;
    try {
      await api.post('/tasks', { title: newTaskName });
      setNewTaskName("");
      fetchTasks();
    } catch (err: any) {
      console.error(err);
      setError("Błąd podczas dodawania.");
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>☁️ Cloud App Dashboard</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleAddTask} style={{ marginBottom: '30px' }}>
        <input type="text" placeholder="Wpisz nowe zadanie..." value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} style={{ padding: '10px', width: '250px' }} />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px' }}>Dodaj</button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li key={item.id} style={{ background: '#f8f9fa', margin: '10px', padding: '15px', width: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <input type="checkbox" checked={item.isCompleted} onChange={() => handleToggle(item)} />
                <span style={{ textDecoration: item.isCompleted ? 'line-through' : 'none', marginLeft: '10px' }}>{item.title}</span>
              </div>
              <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2em' }}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Dashboard;