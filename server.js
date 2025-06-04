const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 7077;

// 미들웨어 등록
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname));

// MySQL 연결
const db = mysql.createConnection({
    host: 'localhost',
    user: 'cloud',
    password: 'cloud',
    database: 'cloud'
});

db.connect(err => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        process.exit(1);
    }
    console.log('MySQL 연결 성공');
});

// RackML 조회 API
app.get('/api/rackml', (req, res) => {
    const zone_id = req.query.zone_id;
    const name = req.query.name || 'default';

    if (!zone_id) {
        return res.status(400).send('zone_id is required');
    }

    const sql = 'SELECT content FROM rackml_config WHERE zone_id = ? AND name = ?';
    db.query(sql, [zone_id, name], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Not found');
        res.send(results[0].content);
    });
});

// RackML 저장 API
app.post('/api/rackml', (req, res) => {
    const { zone_id, name, content } = req.body;
    if (!zone_id || !name || !content) {
        return res.status(400).send('zone_id, name, and content are required');
    }

    const sql = `
    INSERT INTO rackml_config (zone_id, name, content)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE content = VALUES(content), updated_at = CURRENT_TIMESTAMP
  `;

    db.query(sql, [zone_id, name, content], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Saved');
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`RackML API 서버 실행 중: http://localhost:${port}`);
});
