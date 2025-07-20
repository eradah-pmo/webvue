const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

// Backup the database
router.get('/backup', (req, res) => {
    const dbConfig = {
        user: 'your_db_user',
        host: 'localhost',
        database: 'your_db_name',
        password: 'your_db_password',
        port: 5432,
    };
    const backupFile = `backup-${new Date().toISOString()}.sql`;

    const command = `PGPASSWORD=${dbConfig.password} pg_dump -U ${dbConfig.user} -h ${dbConfig.host} -p ${dbConfig.port} ${dbConfig.database} > ${backupFile}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Backup failed');
        }
        res.download(backupFile, (err) => {
            if (err) {
                console.error(err);
            }
            // Optionally, delete the file after download
            // fs.unlinkSync(backupFile);
        });
    });
});

module.exports = router;
