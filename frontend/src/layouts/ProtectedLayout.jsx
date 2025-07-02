import React, { useState } from 'react';
import TeamSidebar from '../features/teams/TeamSideBar'

export default function ProtectedLayout({ children }) {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <TeamSidebar
        onCreateClick={() => setShowCreateTeamModal(true)}
        onAddPeopleClick={() => setShowInviteModal(true)}
      />

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {children}
      </div>

      {/* Modals */}
      {showCreateTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-md shadow-xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Team</h2>
            {/* Replace with <CreateTeamForm /> */}
            <p>Coming soon...</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-600 px-4 py-2 rounded-md"
                onClick={() => setShowCreateTeamModal(false)}
              >
                Cancel
              </button>
              <button className="bg-blue-600 px-4 py-2 rounded-md">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-md shadow-xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add People</h2>
            {/* Replace with <InviteMemberForm /> */}
            <p>Coming soon...</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-600 px-4 py-2 rounded-md"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </button>
              <button className="bg-blue-600 px-4 py-2 rounded-md">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
