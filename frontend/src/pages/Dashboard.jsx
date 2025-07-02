import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateTaskModal from "../features/tasks/CreateTaskModal";

export default function Dashboard() {
  const { currentTeam } = useSelector((state) => state.team);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  if (!currentTeam) return <p className="text-white p-4">No team selected</p>;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
          <div>
            <h1 className="text-xl font-bold">
              {currentTeam ? currentTeam.name : "No team selected"}
            </h1>
            <p className="text-sm text-gray-400">Team dashboard</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
          >
            + Create Task
          </button>
          <button
            onClick={() => navigate(`/teams/${currentTeam._id}`)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
          >
            Manage Team
          </button>
        </div>

        {/* Task content area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="border border-dashed border-gray-700 rounded-lg p-8 text-center text-gray-400">
            Your tasks will appear here.
            <br />
            (Kanban board and filters coming soon)
          </div>
        </div>
      </div>

      {/* Modal */}
      {showCreateModal && (
        <CreateTaskModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
