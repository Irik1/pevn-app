const modelController = require('../controllers/model-controllers');

module.exports = function(app) { 
    app.get('/api/', modelController.findLessons);
    app.post('/api/lessons', modelController.createLessons);
}