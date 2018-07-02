import express from 'express';

const app = express();
app.listen(8000, () => {
    console.log('Server started, listening on port 8000');
});

app.route('/api/hello').get((req, res) => res.send('Hello world'));