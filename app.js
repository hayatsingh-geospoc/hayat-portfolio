const express = require('express');
const app = express();
const path = require('path');

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Dynamic profile data
const profile = {
  name: "John Doe",
  role: "Backend Software Engineer",
  experience: "3 years",
  bio: "Experienced in building scalable backend solutions with Node.js, Redis, and cloud platforms like AWS and GCS.",
  skills: ["Node.js", "Express.js", "MongoDB", "Redis", "TypeORM", "AWS", "GCS", "Docker"],
  projects: [
    {
      name: "Insurance Portal",
      description: "Developed API integrations for premium calculations and KYC processing.",
      technologies: ["Node.js", "Redis", "Azure"],
    },
    {
      name: "GIS Platform",
      description: "Worked on geospatial data processing and mapping APIs.",
      technologies: ["Node.js", "PostGIS", "AWS"],
    },
  ],
  contact: {
    email: "johndoe@example.com",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
};

// Routes
app.get('/', (req, res) => {
  res.render('index', { profile });
});

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
