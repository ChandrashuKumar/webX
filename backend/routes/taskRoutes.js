const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByTeam,
  updateTask
} = require('../controllers/taskController');

router.post('/', createTask);
router.get('/team/:teamId', getTasksByTeam);
router.patch('/:taskId', updateTask);


module.exports = router;
