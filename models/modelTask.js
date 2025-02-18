async function createTaskTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            isComplete BOOLEAN DEFAULT false,
            userId INTEGER REFERENCES users(id)
        )`;
    await pool.query(query);
}

createTaskTable();
