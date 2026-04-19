import React, { useState, useEffect } from 'react';

// Interfejs zgodny z Twoim DTO z C#
interface TaskItem {
    id: number;
    title: string;
    isCompleted: boolean;
}

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Dodany stan do wpisywania nowego zadania
    const [newTaskName, setNewTaskName] = useState("");

    // ZMIENIONO: Adres URL wskazuje teraz na Twój backend w Azure
    const API_URL = 'https://api-task-juliawr-d8d6ara7fygcekdk.polandcentral-01.azurewebsites.net/api/tasks';

    // Pobieranie danych (GET)
    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(API_URL);

            if (!response.ok) {
                if (response.status === 404) throw new Error('Nie znaleziono zadań (Błąd 404).');
                if (response.status === 500) throw new Error('Błąd serwera (Błąd 500).');
                throw new Error(`Wystąpił błąd: ${response.status}`);
            }

            const data = await response.json();
            setTasks(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Dodawanie nowego zadania (POST)
    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskName.trim()) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTaskName, isCompleted: false })
            });

            if (!response.ok) throw new Error('Nie udało się dodać zadania.');

            setNewTaskName(""); // Czyścimy pole
            fetchTasks();       // Odświeżamy listę
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Odznaczanie/Zaznaczanie jako gotowe (PUT)
    const handleToggle = async (item: TaskItem) => {
        try {
            const updatedItem = { ...item, isCompleted: !item.isCompleted };
            const response = await fetch(`${API_URL}/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem)
            });

            if (!response.ok) throw new Error('Nie udało się zaktualizować zadania.');

            // Aktualizujemy listę na ekranie
            setTasks(tasks.map(t => t.id === item.id ? updatedItem : t));
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Usuwanie z walidacją błędu (DELETE)
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

            if (!response.ok) {
                if (response.status === 404) throw new Error('Zadanie nie istnieje - nie można usunąć.');
                throw new Error('Nie udało się usunąć zadania.');
            }

            // Odśwież listę po udanym usunięciu (status 204)
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err: any) {
            alert(`Błąd: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            {/* Tutaj pojawi się "złoty napis" ze zmian z CSS! */}
            <h1>☁️ Cloud App Dashboard</h1>

            {/* Wyświetlanie błędów API */}
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            {/* Formularz do dodawania zadań */}
            <form onSubmit={handleAddTask} style={{ marginBottom: '30px' }}>
                <input
                    type="text"
                    placeholder="Wpisz nowe zadanie..."
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    style={{ padding: '10px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}>
                    Dodaj
                </button>
            </form>

            {isLoading ? (
                <p>Ładowanie zadań...</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {tasks.map((item) => (
                            <li key={item.id} style={{
                                background: '#f8f9fa', margin: '10px', padding: '15px', borderRadius: '8px',
                                borderLeft: item.isCompleted ? '5px solid #28a745' : '5px solid #6c757d',
                                width: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={item.isCompleted}
                                        onChange={() => handleToggle(item)}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <span style={{ textDecoration: item.isCompleted ? 'line-through' : 'none', color: '#333' }}>
                                        {item.title}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                                >
                                    🗑️
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;