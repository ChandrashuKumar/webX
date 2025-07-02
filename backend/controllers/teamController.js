const Team = require('../models/Team');
const User = require('../models/User');

// Create a team
exports.createTeam = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id; // req.user must be set by JWT middleware

  try {
    const team = await Team.create({
      name,
      admin: userId,
      members: [userId],
    });
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add member to team
exports.addMemberToTeam = async (req, res) => {
  const { email } = req.body;
  const { teamId } = req.params;
  const userId = req.user.id;

  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    if (team.admin.toString() !== userId) {
      return res.status(403).json({ message: 'Only admin can add members' });
    }

    const userToAdd = await User.findOne({ email });
    if (!userToAdd) return res.status(404).json({ message: 'User not found' });

    if (team.members.includes(userToAdd._id)) {
      return res.status(400).json({ message: 'User already in team' });
    }

    team.members.push(userToAdd._id);
    await team.save();

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get teams user belongs to
exports.getMyTeams = async (req, res) => {
  const userId = req.user.id;
  try {
    const teams = await Team.find({ members: userId }).populate('admin', 'name email');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific team with populated members
exports.getTeamById = async (req, res) => {
  const { teamId } = req.params;
  const userId = req.user.id;

  try {
    const team = await Team.findById(teamId)
      .populate('admin', 'name email')
      .populate('members', 'name email');

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (!team.members.some(member => member._id.toString() === userId)) {
      return res.status(403).json({ message: 'Not a member of this team' });
    }

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
