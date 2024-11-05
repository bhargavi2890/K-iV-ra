const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Mock database
let userProfile = {
    username: 'john_doe',
    email: 'john@example.com',
    bio: 'Hello! I am John.'
};

app.post('/api/profile', (req, res) => {
    const { username, email, bio } = req.body;
    
    // Update the profile
    userProfile = { username, email, bio };
    
    // Respond with updated profile
    res.json({ success: true, profile: userProfile });
});

// Serve the static HTML page
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
