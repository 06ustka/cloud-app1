\# Cloud Task Manager - Książka Azure w Praktyce by Julia Wrona
# Projekt Cloud-App1 - System Zarządzania Zadaniami

Projekt zrealizowany w ramach zajęć z aplikacji chmurowych. Architektura oparta na kontenerach Docker, backendzie .NET 8, bazie SQL Server oraz frontendzie w React (Vite).

---

## 🚀 Status Realizacji (Checklista)

### Zadanie 4: Fundamenty Backend i Konteneryzacja
- [x] **4.1. Działające REST API:** Uruchomione w kontenerze na porcie 8081. Pełna obsługa CRUD dla encji zadań.
- [x] **4.2. Połączenie z DB:** API poprawnie łączy się z kontenerem bazy danych MSSQL (Konfiguracja w `Program.cs`).
- [x] **4.3. Implementacja Kontrolera:** Logika biznesowa zawarta w `TasksController.cs`.
- [x] **4.4. Walidacja i błędy:** Obsługa statusów HTTP (200, 201, 400, 404). Frontend (`Dashboard.tsx`) poprawnie komunikuje się z API.
- [x] **4.5. Dokumentacja i Git:** Projekt wypchnięty na repozytorium GitHub.

### Zadanie 5: Zaawansowane Funkcje i Trwałość (Zadanie Nieśmiertelne)
- [x] **5.1. Obsługa DTO:** Wprowadzono `TaskReadDto` z nowym polem `Description`. Separacja warstwy bazy danych od API.
- [x] **5.2. Trwałość danych:** Zastosowano **Named Volumes** (`my_db_data`), dzięki czemu dane nie znikają po komendzie `docker compose down`.
- [x] **5.3. Migracje bazy danych:** Pełna historia schematu bazy w folderze `backend/Migrations` (Entity Framework Core).
- [x] **5.4. Interfejs Użytkownika (UI):** Rozbudowany Dashboard w React wyświetlający listę zadań wraz z opisami.
- [x] **5.5. Zaaktualizowana dokumentacja:** Scalone README i finalny `git push`.

---

## 🛠️ Architektura Systemu

- **Backend:** .NET 8 (C#)
- **Frontend:** React + Vite (Port 3000)
- **Baza Danych:** Microsoft SQL Server 2022 (Port 1433)
- **Orkiestracja:** Docker Compose
 
- Adresy usług:

Frontend: http://localhost:3000

Swagger (API): http://localhost:8081/swagger

&nbsp;

Projekt natywnej aplikacji chmurowej realizowany w architekturze 3-warstwowej.

&nbsp;

\## Deklaracja Architektury (Mapowanie Azure)

Ten projekt został zaplanowany z myślą o usługach PaaS (Platform as a Service) w chmurze Azure.

&nbsp;

| Warstwa | Komponent Lokalny | Usługa Azure |

| :--- | :--- | :--- |

| \*\*Presentation\*\* | React 19 (Vite) | Azure Static Web Apps |

| \*\*Application\*\* | API (.NET 9 / Node 24) | Azure App Service |

| \*\*Data\*\* | SQL Server (Dev) | Azure SQL Database (Serverless) |

&nbsp;

\## 🏗 Status Projektu i Dokumentacja

\* \[x] \*\*Artefakt 1:\*\* Zaplanowano strukturę folderów i diagram C4 (dostępny w `/docs`).

\* \[x] \*\*Artefakt 2:\*\* Konfiguracja środowiska Docker (w trakcie...).

&nbsp;

