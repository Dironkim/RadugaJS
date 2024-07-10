
const client = require('../database/postgres')

const uploadMultiple = (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.render('upload', { error: 'No files uploaded.' });
    }
  
    const queries = files.map(file => {
      const query = 'INSERT INTO files(name, path) VALUES($1, $2)';
      const values = [file.filename, file.path];
      return client.query(query, values);
    })
  
    Promise.all(queries)
      .then(() => {
        res.render('upload', { success: 'Files uploaded and saved to database.' });
      })
      .catch(err => {
        console.error('Error saving to database', err);
        res.render('upload', { error: 'Error saving to database.' });
      })
  }

module.exports = {uploadMultiple}