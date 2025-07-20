const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { pool } = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const settingsRoutes = require('./routes/settings');
const systemRoutes = require('./routes/system');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/system', systemRoutes);

// Dynamically load modules
const modulesDir = path.join(__dirname, 'modules');
fs.readdirSync(modulesDir).forEach(file => {
    const modulePath = path.join(modulesDir, file);
    if (fs.statSync(modulePath).isDirectory()) {
        const routesPath = path.join(modulePath, 'routes.js');
        if (fs.existsSync(routesPath)) {
            const moduleRoutes = require(routesPath);
            app.use('/api/modules', moduleRoutes);
        }
    }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
