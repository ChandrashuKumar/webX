import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksByTeamThunk } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import CreateTaskModal from "../features/tasks/CreateTaskModal";
import TaskCard from "../features/tasks/TaskCard";

export default function Dashboard() {
  const { currentTeam } = useSelector((state) => state.team);
  const { tasks} = useSelector((state) => state.task);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentTeam?._id) {
      dispatch(fetchTasksByTeamThunk({ token: localStorage.getItem("token"), teamId: currentTeam._id }));
    }
  }, [currentTeam, dispatch]);

  const tasksByStatus = {
    "To Do": [],
    "In Progress": [],
    "Done": [],
  };

  tasks?.forEach((task) => {
    tasksByStatus[task.status]?.push(task);
  });

  if (!currentTeam) return <p className="text-white p-4">No team selected</p>;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
          <div>
            <h1 className="text-xl font-bold">{currentTeam.name}</h1>
            <p className="text-sm text-gray-400">Team dashboard</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
            >
              + Create Task
            </button>
            <button
              onClick={() => navigate(`/teams/${currentTeam._id}`)}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm"
            >
              Manage Team
            </button>
          </div>
        </div>

        {/* Kanban Columns */}
        <div className="flex-1 overflow-y-auto p-6 flex gap-6">
          {["To Do", "In Progress", "Done"].map((status) => (
            <div key={status} className="w-1/3">
              <h2 className="text-lg font-semibold mb-3">{status}</h2>
              <div className="space-y-4">
                {tasksByStatus[status].length > 0 ? (
                  tasksByStatus[status].map((task) => <TaskCard key={task._id} task={task} />)
                ) : (
                  <p className="text-sm text-gray-500">No tasks</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && <CreateTaskModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}
