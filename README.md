# GraphQL CRUD API (Node.js + Express + TypeScript)

This is a simple GraphQL CRUD API built with Node.js, Express, and TypeScript. Basic user management operations: create, read, update, and delete.

---

##  Features

- Built with **TypeScript**
- **GraphQL API** with `express-graphql`
- In-memory data store (no DB required)
- Basic CRUD operations on `User` objects
- UUID for unique user IDs

---

##  Project Structure

```
src/
├── schema.ts       # GraphQL schema definition
├── resolvers.ts    # CRUD resolver functions
└── types.ts        # Type definitions (User interface)

index.ts            #Express server setup
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/elbrainz1759/graphql-crud-api.git
cd graphql-crud-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server (in dev mode)

```bash
npm run dev
```

Server runs at: [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

##  Example GraphQL Queries

### Create User

```graphql
mutation {
  createUser(name: "Jeremiah", email: "jeremiah@example.com") {
    id
    name
  }
}
```

### Get All Users

```graphql
{
  getUsers {
    id
    name
    email
  }
}
```

### Update User

```graphql
mutation {
  updateUser(id: "USER_ID", name: "New Name") {
    id
    name
  }
}
```

### Delete User

```graphql
mutation {
  deleteUser(id: "USER_ID") {
    id
    name
  }
}
```

---

##  Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [GraphQL](https://graphql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [uuid](https://www.npmjs.com/package/uuid)

---

##  License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

Made with ❤️ by [Jeremiah](https://github.com/elbrainz1759)
