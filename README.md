# MojaTema

MojaTema is an advanced platform designed to simplify the management of graduation topics for students and professors. This system integrates modern technologies to provide high performance, scalability, and ease of use. It allows seamless communication in real-time, stores large amounts of data, and ensures fast response times to user requests.

## Tech Stack

- **Frontend:**
  - **Vue.js** (JavaScript framework) with **TypeScript** for building dynamic user interfaces.
  - **CSS Modules** for component-scoped styling, preventing class conflicts.
  - **Vite** for fast build times and production optimization.
  - **Pinia** for state management in Vue.js applications.
  - **Jest** for testing TypeScript components.
  - **NPM** for managing project dependencies.

- **Backend:**
  - **PHP** with **Laravel** for building a REST API.
  - **Go** for the socket service handling real-time communication.
  - **Redis** for backend caching, ensuring faster responses and reduced database load.
  
- **Databases:**
  - **MySQL** for relational data storage.
  - **MongoDB** for storing unstructured data, used for real-time communication.

## Features

- **For Students:**
  - Apply for topics and monitor progress.
  
- **For Professors:**
  - Efficiently manage graduation topics and student applications.

- **Real-time Communication:**
  - A socket service implemented with Go, allowing instant message exchanges.
  - Mongo ensures quick access to frequently requested data, enhancing real-time performance.

- **Database Management:**
  - **MySQL** is used for structured data, while **MongoDB** stores real-time communication messages.
  
## Architecture Overview

### Frontend

- Built using **Vue.js** and **TypeScript**, the platform provides an interactive and responsive user interface.
- **CSS Modules** are used to scope styles to individual components, avoiding conflicts and making the codebase more maintainable.
- The application is optimized for mobile devices and desktops through the use of **media queries**.
- **Vite** provides rapid build times and production optimization.
- **Pinia** is used for state management, facilitating data synchronization across components.
- **Jest** ensures frontend stability by providing unit and integration tests.

### Backend

- **Laravel** is used for building the backend API with **REST** architecture, ensuring clear separation between business logic (models), request handling (controllers), and responses (JSON).
- **Redis** serves as the caching system to improve performance and reduce database load by caching frequently requested data.
- **Go** handles the socket service, providing efficient real-time communication with high concurrency.
- **NGINX** is used as a reverse proxy, optimizing request handling and ensuring high performance under heavy loads.

### Databases

- **MySQL** is used to manage relational data, leveraging **Eloquent ORM** for easy data manipulation.
- **MongoDB** handles real-time communication data and supports scalability for large message volumes, integrating smoothly with the Go socket service.