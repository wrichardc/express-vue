const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle Production
if (process.env.NODE_ENV === 'production') {
  // Handle Static
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.use(/.*/, (req, res) => res.sendfile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Servidor iniciado na porta: ${port}`));
