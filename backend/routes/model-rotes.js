const modelController = require('../controllers/model-controllers');

module.exports = function(app) { 
    // Retrieve all Users
    app.post('/api/', modelController.findLessons);
    app.post('/api/lessons', modelController.createLessons);
}