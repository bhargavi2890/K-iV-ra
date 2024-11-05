let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)
document.addEventListener('DOMContentLoaded', () => {
    // Sign Up Form Submission
    document.querySelector('.sign-up button').addEventListener('click', async () => {
        const username = document.querySelector('.sign-up input[name="username"]').value;
        const email = document.querySelector('.sign-up input[name="email"]').value;
        const password = document.querySelector('.sign-up input[name="password"]').value;
        const confirmPassword = document.querySelector('.sign-up input[name="confirmPassword"]').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            const result = await response.json();
            if (result.success) {
                window.location.href = 'home.html';
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });

    // Sign In Form Submission
    document.querySelector('.sign-in button').addEventListener('click', async () => {
        const username = document.querySelector('.sign-in input[name="username"]').value;
        const password = document.querySelector('.sign-in input[name="password"]').value;

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json();
            if (result.success) {
                window.location.href = 'home.html';
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });
});
// scripts.js

async function handleSignUp(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const response = await fetch('/signup', {
        method: 'POST',
        body: data
    });

    const result = await response.json();
    if (result.success) {
        window.location.href = '/home';  // Redirect to home page
    } else {
        document.getElementById('signUpError').textContent = result.message;
    }
}

async function handleSignIn(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const response = await fetch('/signin', {
        method: 'POST',
        body: data
    });

    const result = await response.json();
    if (result.success) {
        window.location.href = '/home';  // Redirect to home page
    } else {
        document.getElementById('signInError').textContent = result.message;
    }
}

// Attach the form submit event handlers
document.getElementById('signUpForm').onsubmit = handleSignUp;
document.getElementById('signInForm').onsubmit = handleSignIn;
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
            return res.json({ success: false, message: 'Error creating user.' });
        }
        res.json({ success: true });
    });
});

app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.json({ success: false, message: 'User not found.' });
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ success: false, message: 'Incorrect password.' });
        }

        res.json({ success: true });
    });
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
