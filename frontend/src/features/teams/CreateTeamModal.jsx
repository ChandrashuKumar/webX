import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createTeam } from "./teamsAPI";
import { toast } from "react-toastify";

export default function CreateTeamModal({ onClose, onSuccess }) {
  const { token, user } = useSelector((state) => state.auth);
  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([user]); // include self by default
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAllUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, [token]);

  const handleToggleMember = (member) => {
    if (selectedMembers.find((m) => m._id === member._id)) {
      setSelectedMembers(selectedMembers.filter((m) => m._id !== member._id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) return toast.error("Team name is required");

    try {
      const teamData = {
        name: teamName,
        members: selectedMembers.map((m) => m._id),
      };
      const created = await createTeam(token, teamData);
      toast.success(`Team "${created.name}" created`);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create team");
    }
  };

  // Combine current user with other users (remove duplicates)
  const members = [user, ...allUsers.filter((u) => u._id !== user._id)];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Create Team</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Team Name *</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-600"
              placeholder="Enter team name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Add Members *
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-700 rounded bg-gray-800 p-2 space-y-1">
              {members.map((member) => (
                <div
                  key={member._id || member.email || member.name} // ✅ Safe, unique key
                  className="flex items-center justify-between hover:bg-gray-700 px-2 py-1 rounded"
                >
                  <span
                    title={
                      member._id === user._id ? "You are always a member" : ""
                    }
                  >
                    {member.name} {member._id === user._id && "(you)"}
                  </span>
                  <input
                    type="checkbox"
                    checked={
                      !!selectedMembers.find((m) => m._id === member._id)
                    }
                    onChange={() => {
                      if (member._id !== user._id) handleToggleMember(member);
                    }}
                    disabled={member._id === user._id}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
