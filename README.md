# Interactive Storybook (Full-Stack)

**Interactive Storybook** is a kid-friendly reading app where parents and children can browse short stories, open them in a clean, distraction-free reader. It’s built as a pragmatic full-stack project: a Spring Boot REST API powers story/review CRUD, while a modern React + Vite frontend (dev server on `http://localhost:5175`) delivers a fast, app-like experience.

---

## Tech Stack

- **Frontend:** React + Vite, React Router, fetch
- **Backend:** Java (Spring Boot, Spring Web, Spring Data JPA)
- **Database:** MySQL
- **API:** REST (JSON)
- **Build/Tooling:** Maven, Node.js 18+ with npm (frontend)
- **Dev Notes:** CORS enabled for the Vite dev origin (`http://localhost:5175`)

---

## Project Structure

Interactivestorybook_Fullstack/
├─ Backend/ # Spring Boot app (controllers, models, repositories, resources)
└─ Frontend/ # React + Vite app (routes, components, API client)

## Getting Started

### Prerequisites
- **Java 17+**
- **Node.js 18+** and **npm**
- **Maven**
- MySQL

### 1) Clone the repository
```bash
git clone https://github.com/Anushap976/Interactivestorybook_Fullstack.git

From the Backend/ folder:

Create/update src/main/resources/application.properties
# spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
# spring.datasource.username=your_username
# spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
run the backend server:
```bash
# Maven
mvn spring-boot:run

The API will be available at http://localhost:8080.

From the Frontend/ folder:
### Install dependencies
npm install
npm run dev

The app will be available at http://localhost:5175.

Design Docs
Wireframes: https://miro.com/app/board/uXjVIzMtF3c=/?share_link_id=187996876855
ERD Diagram: https://miro.com/app/board/uXjVJeQVEIY=/?share_link_id=598451637398




