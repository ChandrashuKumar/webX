import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TeamSidebar from '../features/teams/TeamSideBar';
import CreateTeamModal from '../features/teams/CreateTeamModal';
import { fetchMyTeamsThunk } from '../features/teams/teamSlice';
import { ToastContainer } from 'react-toastify';

export default function ProtectedLayout({ children }) {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const handleTeamCreated = () => {
    dispatch(fetchMyTeamsThunk(token));
    setShowCreateTeamModal(false);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-900 text-white">
      <ToastContainer theme="dark" />

      {/* Sidebar */}
      <div className="sm:w-64 w-full border-b sm:border-b-0 sm:border-r border-gray-800">
        <TeamSidebar
          onCreateClick={() => setShowCreateTeamModal(true)}
          onAddPeopleClick={() => setShowInviteModal(true)}
        />
      </div>

      {/* Right content area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>

      {/* Create Team Modal */}
      {showCreateTeamModal && (
        <CreateTeamModal
          onClose={() => setShowCreateTeamModal(false)}
          onSuccess={handleTeamCreated}
        />
      )}

      {/* Invite Members Modal (placeholder) */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-md shadow-xl w-full max-w-md mx-4">
            <h2 className="text-lg font-bold mb-4">Add People</h2>
            <p>Coming soon...</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-600 px-4 py-2 rounded-md"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </button>
              <button className="bg-blue-600 px-4 py-2 rounded-md">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
