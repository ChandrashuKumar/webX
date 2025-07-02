import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksByTeamThunk } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import CreateTaskModal from "../features/tasks/CreateTaskModal";
import TaskCard from "../features/tasks/TaskCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-toastify";

const FILTERS = [
  "All",
  "To Do",
  "In Progress",
  "Done",
  "Deadline Approaching",
  "Assigned to Me",
  "Created by Me",
];

function Dashboard() {
  const { currentTeam } = useSelector((state) => state.team);
  const { tasks } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentTeam?._id) {
      dispatch(
        fetchTasksByTeamThunk({
          token: localStorage.getItem("token"),
          teamId: currentTeam._id,
        })
      );
    }
  }, [currentTeam, dispatch]);

  const isApproachingDeadline = (dueDate) => {
    if (!dueDate) return false;
    const now = new Date();
    const diff = new Date(dueDate) - now;
    return diff > 0 && diff <= 3 * 24 * 60 * 60 * 1000;
  };

  const filterTask = (task) => {
    const userId = user?._id || user?.id;
    if (activeFilter === "All") return true;
    if (activeFilter === "Deadline Approaching")
      return isApproachingDeadline(task.dueDate);
    if (activeFilter === "Assigned to Me")
      return task.assignee?._id === userId;
    if (activeFilter === "Created by Me") return task.reporter?._id === userId;
    return task.status === activeFilter;
  };

  const filteredTasks = tasks?.filter(filterTask) || [];

  const tasksByStatus = {
    "To Do": [],
    "In Progress": [],
    "Done": [],
  };

  filteredTasks.forEach((task) => {
    if (tasksByStatus[task.status]) {
      tasksByStatus[task.status].push(task);
    }
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  if (!currentTeam)
    return <p className="text-white p-4">No team selected</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950 sticky top-0 z-10">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">{currentTeam.name}</h1>
              <p className="text-sm text-gray-400">Team dashboard</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm shadow-md"
              >
                + Create Task
              </button>
              <button
                onClick={() => navigate(`/teams/${currentTeam._id}`)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm"
              >
                Manage Team
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-2 bg-gray-950 border-b border-gray-800 flex flex-wrap gap-2 sticky top-[72px] z-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-sm px-3 py-1 rounded-full font-medium transition-all duration-200 shadow-sm ${
                  activeFilter === f
                    ? "bg-blue-600 text-white scale-105"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Kanban Columns */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-6 custom-scrollbar">
            {["To Do", "In Progress", "Done"]
              .filter((status) =>
                activeFilter === "All" || activeFilter === status
                  ? true
                  : tasksByStatus[status].length > 0
              )
              .map((status) => (
                <div
                  key={status}
                  className="w-full sm:w-1/2 lg:w-1/3 bg-gray-800 rounded-xl shadow-xl p-4 flex flex-col max-h-[80vh] overflow-y-auto custom-scrollbar"
                >
                  <h2 className="text-lg font-bold mb-4 text-white border-b border-gray-600 pb-1">{status}</h2>
                  <div className="flex flex-col gap-4">
                    {tasksByStatus[status].length > 0 ? (
                      tasksByStatus[status].map((task) => (
                        <div
                          key={task._id}
                          className="cursor-grab transition-all duration-200 transform hover:scale-[1.02]"
                        >
                          <TaskCard task={task} />
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">No tasks</p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Modal */}
        {showCreateModal && (
          <CreateTaskModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              dispatch(
                fetchTasksByTeamThunk({
                  token: localStorage.getItem("token"),
                  teamId: currentTeam._id,
                })
              );
            }}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default Dashboard;
