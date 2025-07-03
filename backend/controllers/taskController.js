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

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.reporter.toString() !== userId) {
      return res.status(403).json({ message: 'Only reporter can edit this task' });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

