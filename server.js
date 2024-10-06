require('dotenv').config(); 
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
  


   
// Question 1 goes here
app.get('/patients', async (req, res) => {
try {
    const [patients] = await db.execute('SELECT patient_id, first_name, last_name, date_of_birth FROM patients');
    res.status(200).json(patients);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});


// Question 2 goes here
app.get('/providers', async (req, res) => {
try {
    const [providers] = await db.execute('SELECT first_name, last_name, provider_specialty FROM providers');
    res.status(200).json(providers);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});


// Question 3 goes here
app.get('/patients/:first_name', async (req, res) => {
const { first_name } = req.params;
try {
    const [patients] = await db.execute('SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?', [first_name]);
    res.status(200).json(patients);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});


// Question 4 goes here
app.get('/providers/:specialty', async (req, res) => {
const { specialty } = req.params;
try {
    const [providers] = await db.execute('SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?', [specialty]);
    res.status(200).json(providers);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

   

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});