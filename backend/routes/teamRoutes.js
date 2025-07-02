const express = require('express');
const router = express.Router();
const {
  createTeam,
  addMemberToTeam,
  getMyTeams,
} = require('../controllers/teamController');

router.post('/create', createTeam);
router.post('/:teamId/add-member', addMemberToTeam);
router.get('/my', getMyTeams);

module.exports = router;
