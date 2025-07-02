const express = require('express');
const router = express.Router();
const {
  createTeam,
  addMemberToTeam,
  getMyTeams,
  getTeamById
} = require('../controllers/teamController');

router.post('/create', createTeam);
router.post('/:teamId/add-member', addMemberToTeam);
router.get('/my', getMyTeams);
router.get('/:teamId', getTeamById);


module.exports = router;
