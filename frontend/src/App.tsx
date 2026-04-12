import { useEffect, useState } from 'react'
import './App.css'

interface Task {
  id: number;
  title: string;
  description: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch('https://api-task-juliawr-d8d6ara7fygcekdk.polandcentral-01.azurewebsites.net/api/Tasks')
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Błąd połączenia z API:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header style={{ backgroundColor: '#1a1a1a', padding: '20px', color: 'white', borderRadius: '10px' }}>
        <h1>Cloud App Dashboard</h1>
        <p>Zadanie Nieśmiertelne - Zarządzanie zadaniami w chmurze</p>
      </header>

      <main style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {loading ? (
          <p>Ładowanie zadań...</p>
        ) : (
          <div style={{ width: '100%', maxWidth: '600px' }}>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <div key={task.id} style={{
                  background: '#f4f4f4',
                  margin: '10px 0',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'left',
                  borderLeft: '5px solid #646cff'
                }}>
                  <h3 style={{ margin: '0 0 5px 0', color: '#213547' }}>{task.title}</h3>
                  <p style={{ margin: 0, color: '#555' }}>{task.description}</p>
                </div>
              ))
            ) : (
              <div style={{ padding: '40px', border: '2px dashed #ccc', borderRadius: '10px' }}>
                <p>Brak zadań w bazie danych.</p>
                <small>Dodaj nowe zadanie przez Swaggera na porcie 8081!</small>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App