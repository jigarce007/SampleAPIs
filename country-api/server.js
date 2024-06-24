const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// URL of the JSON file hosted on GitHub Pages
const jsonUrl = 'https://your-username.github.io/your-repo-name/countries.json';

// Endpoint to get data for a specific country
app.get('/api/country/:name', async (req, res) => {
  try {
    const response = await axios.get(jsonUrl);
    const countries = response.data.countries;
    const countryName = req.params.name.toLowerCase();

    const country = countries.find(c => c.name.toLowerCase() === countryName);

    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
