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

    const API_URL = 'http://localhost:8081/api/tasks';

    // Pobieranie danych (List)
    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(API_URL);

            // Obsługa błędów na podstawie statusu HTTP z backendu
            if (!response.ok) {
                if (response.status === 404) throw new Error('Nie znaleziono zadań (Błąd 404).');
                if (response.status === 500) throw new Error('Błąd serwera (Błąd 500).');
                throw new Error(`Wystąpił błąd: ${response.status}`);
            }

            const data = await response.json();
            setTasks(data);
        } catch (err: any) {
            setError(err.message); // Ustawienie komunikatu błędu dla użytkownika
        } finally {
            setIsLoading(false);
        }
    };

    // Usuwanie z walidacją błędu
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
        <div style={{ padding: '20px' }}>
            <h2>Panel Zadań (Dashboard)</h2>

            {/* Wyświetlanie błędów API */}
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            {isLoading ? (
                <p>Ładowanie...</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} style={{ marginBottom: '10px' }}>
                            {task.title} - <strong>{task.isCompleted ? 'Zakończone' : 'W toku'}</strong>
                            <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                Usuń
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;