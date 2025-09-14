# Supabase Secure API Layer

This project provides a secure, deployable API layer for any Supabase Postgres database. It allows a user to input their database credentials into a web UI, which then generates a secure, token-based API to interact with the database tables.

This application is built with React for the frontend and Node.js/TypeScript for the backend, designed to be deployed as serverless functions on Vercel.

## How It Works

1.  **Connect**: You provide your Supabase Project URL and your `anon public` API key in the web interface.
2.  **Authenticate**: The application backend verifies these credentials by attempting a connection.
3.  **Generate Token**: Upon successful connection, the backend generates a short-lived JSON Web Token (JWT) that securely encodes your connection details. This token is returned to your browser.
4.  **Use API**: The UI displays the generated JWT and the API endpoints. You can then use this token to make secure requests from your other applications (Node.js, Python, etc.) to read from or write to your database.

The user's database credentials are not stored on the server. They are only held in memory temporarily to generate the JWT.

## Deployment

You can deploy this project to Vercel with one click.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fstorage-api-layer-example)

### Environment Variables

You must configure the following environment variable in your Vercel project settings:

-   `JWT_SECRET`: A long, random, and secret string used to sign the authentication tokens. You can generate one using `openssl rand -hex 32` in your terminal.

## API Reference

### Authentication

All API requests must include an `Authorization` header with the JWT provided by the UI.

**Header Format:**
`Authorization: Bearer <YOUR_JWT_TOKEN>`

---

### Get Records

Fetch multiple records from a table.

-   **Endpoint**: `GET /api/v1/data/{table_name}`
-   **Method**: `GET`

**Query Parameters:**

-   `select`: (Optional) A comma-separated list of columns to retrieve. Defaults to `*` (all columns).
-   `limit`: (Optional) The maximum number of records to return. Defaults to `100`.

**Example (cURL):**

```bash
curl "https://<your-deployment-url>/api/v1/data/users?select=id,name&limit=10" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

**Example (Node.js):**
```javascript
const fetch = require('node-fetch');

const API_URL = 'https://<your-deployment-url>';
const TOKEN = '<YOUR_JWT_TOKEN>';

async function getUsers() {
  const response = await fetch(`${API_URL}/api/v1/data/users?limit=5`, {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  });
  const data = await response.json();
  console.log(data);
}

getUsers();
```

**Example (Python):**
```python
import requests

API_URL = "https://<your-deployment-url>"
TOKEN = "<YOUR_JWT_TOKEN>"

def get_users():
    headers = {"Authorization": f"Bearer {TOKEN}"}
    response = requests.get(f"{API_URL}/api/v1/data/users?limit=5", headers=headers)
    print(response.json())

get_users()
```

---

### Insert Record

Insert a new record into a table.

-   **Endpoint**: `POST /api/v1/data/{table_name}`
-   **Method**: `POST`

**Request Body:**

A JSON object representing the row to insert.

**Example (cURL):**

```bash
curl -X POST "https://<your-deployment-url>/api/v1/data/users" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane.doe@example.com"}'
```

**Example (Node.js):**
```javascript
const fetch = require('node-fetch');

const API_URL = 'https://<your-deployment-url>';
const TOKEN = '<YOUR_JWT_TOKEN>';

async function createUser(userData) {
  const response = await fetch(`${API_URL}/api/v1/data/users`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  console.log(data);
}

createUser({ name: 'John Doe', email: 'john.doe@example.com' });
```

**Example (Python):**
```python
import requests
import json

API_URL = "https://<your-deployment-url>"
TOKEN = "<YOUR_JWT_TOKEN>"

def create_user(user_data):
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    }
    response = requests.post(f"{API_URL}/api/v1/data/users", headers=headers, data=json.dumps(user_data))
    print(response.json())

create_user({"name": "Jane Doe", "email": "jane.doe@example.com"})
```
