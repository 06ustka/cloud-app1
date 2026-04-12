# Projekt Cloud-App1 - System Zarządzania Zadaniami

Projekt zrealizowany w ramach zajęć z aplikacji chmurowych. Architektura oparta na kontenerach Docker, backendzie .NET 8, bazie SQL Server oraz frontendzie w React (Vite).

---
# Artefakt 7

## Zabezpieczenia (Security)
W projekcie wdrożono architekturę **Zero Trust** dla bazy danych.
Zgodnie z dobrymi praktykami bezpieczeństwa w chmurze (Cloud Security):
* Usunięto poświadczenia (Connection String) z kodu źródłowego.
* Zastosowano **Azure Key Vault** jako bezpieczny magazyn wpisów tajnych.
* Aplikacja uwierzytelnia się do magazynu kluczy bezhasłowo, wykorzystując **Tożsamość Zarządzaną (Managed Identity)** w usługach Azure App Service.
# Artefakt 6 

Projekt aplikacji typu Backend API do zarządzania zadaniami, stworzony w technologii .NET 8.0 i wdrożony w chmurze Microsoft Azure.

## Architektura Rozwiązania
* **App Service (Linux):** Hostowanie aplikacji API (Azure App Service).
* **Azure SQL Database:** Relacyjna baza danych w chmurze.
* **ORM Entity Framework Core:** Zarządzanie schematem bazy danych i migracjami.

## Konfiguracja
Aplikacja została skonfigurowana do pracy z bazą Azure SQL poprzez ConnectionString w pliku `appsettings.json`:
- **Server:** `sql-server-juliawr.database.windows.net`
- **Database:** `TaskDatabase`

## Funkcje
- Automatyczne tworzenie schematu bazy danych (Migrations) przy starcie aplikacji.
- Interfejs Swagger UI do testowania endpointów API (dostępny pod adresem `/swagger`).
## 🚀 Status Realizacji (Checklista)

### Artefakt 4: Fundamenty Backend i Konteneryzacja
- [x] **4.1. Działające REST API:** Uruchomione w kontenerze na porcie 8081. Pełna obsługa CRUD dla encji zadań.
- [x] **4.2. Połączenie z DB:** API poprawnie łączy się z kontenerem bazy danych MSSQL (Konfiguracja w `Program.cs`).
- [x] **4.3. Implementacja Kontrolera:** Logika biznesowa zawarta w `TasksController.cs`.
- [x] **4.4. Walidacja i błędy:** Obsługa statusów HTTP (200, 201, 400, 404). Frontend (`Dashboard.tsx`) poprawnie komunikuje się z API.
- [x] **4.5. Dokumentacja i Git:** Projekt wypchnięty na repozytorium GitHub.

### Artefakt 5: Zaawansowane Funkcje i Trwałość (Zadanie Nieśmiertelne)
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

