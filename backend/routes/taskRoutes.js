const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByTeam,
} = require('../controllers/taskController');

router.post('/', createTask);
router.get('/team/:teamId', getTasksByTeam);

module.exports = router;
