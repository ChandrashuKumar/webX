const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  const {
    title,
    description,
    dueDate,
    priority,
    status,
    assignee,
    labels,
    team,
  } = req.body;

  const reporter = req.user.id;

  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      assignee,
      reporter,
      team,
      labels,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get tasks for a team
exports.getTasksByTeam = async (req, res) => {
  const { teamId } = req.params;

  try {
    const tasks = await Task.find({ team: teamId })
      .populate('assignee', 'name email')
      .populate('reporter', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
