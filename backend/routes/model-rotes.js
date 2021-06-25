const modelController = require('../controllers/model-controllers');

module.exports = function(app) { 
    app.post('/api/', modelController.findLessons);
    app.post('/api/lessons', modelController.createLessons);
}