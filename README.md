# 📧 Mail Parser API 📨

A **NestJS-based API** that parses email content and extracts attached JSON files or JSON links from the email body.

---

## 🚀 **Technologies Used**

- **NestJS 10** (Backend framework)
- **TypeScript** (Static typing)
- **Mailparser** (Email parsing)
- **Axios** (Fetching JSON files from URLs)
- **Jest + Supertest** (Unit and integration testing)
- **ESLint + Prettier** (Code formatting and linting)
- **Swagger (OpenAPI)** (API documentation)
- **Docker** (Containerized)

---

## 📖 **Project Structure**

```
📂 src/
 ├── modules/
 │   ├── email-parser/  # Email processing module
 │   │   ├── controllers/  # API controllers
 │   │   ├── services/  # Business logic
 │   │   ├── dto/  # Data Transfer Objects
 ├── main.ts  # Main entry point
 ├── app.module.ts  # Main NestJS module
📂 test/  # Contains test data and E2E tests
📄 Dockerfile  # Docker configuration
📄 .github/workflows/ci.yml  # GitHub Actions (CI/CD)
📄 README.md  # This file
```

---

## 🛠️ **How to Run the Project**

### **1️⃣ Running Locally (Without Docker)**

Ensure you have **Node.js 20+** installed. Then, run:

```sh
# Install dependencies
npm install

# Run the application
npm run start

# Open API documentation (Swagger)
http://localhost:3000/api/docs
```

**Running in watch mode (Hot Reload):**

```sh
npm run start:dev
```

---

### **2️⃣ Running with Docker**

You can run the project inside a **Docker container**:

```sh
# Build the Docker image
docker build -t mail-parser-api .

# Run the container
docker run -p 3000:3000 --name mail-parser-api-container mail-parser-api
```

**Access the API:**

- **Health Check:** [`http://localhost:3000/status`](http://localhost:3000/status)
- **Swagger Documentation:** [`http://localhost:3000/api/docs`](http://localhost:3000/api/docs)

To stop the container:

```sh
docker stop mail-parser-api-container && docker rm mail-parser-api-container
```

## ✅ **Testing**

### **1️⃣ Run Unit Tests**

```sh
npm run test
```

### **2️⃣ Run End-to-End (E2E) Tests**

```sh
npm run test:e2e
```

### **3️⃣ Run Linter**

```sh
npm run lint
```

## 📜 **API Endpoints**

### **1️⃣ Health Check**

| Method | Endpoint  | Description                 |
| ------ | --------- | --------------------------- |
| `GET`  | `/status` | Check if the API is running |

### **2️⃣ Email Parsing**

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| `POST` | `/email-parser/parse` | Parses an email and extracts JSON |

**Example request:**

```sh
curl -X POST http://localhost:3000/email-parser/parse \
  -H "Content-Type: application/json" \
  -d '{"emailPath": "https://example.com/email.eml"}'
```

## 🎯 **Continuous Integration (CI/CD)**

This project uses **GitHub Actions** to run:
✅ **ESLint checks** (`npm run lint`)  
✅ **Unit and E2E tests** (`npm run test`, `npm run test:e2e`)

Every time you **push code** or create a **pull request**, GitHub Actions automatically verifies your changes.
