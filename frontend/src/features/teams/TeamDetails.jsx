import React from "react";
import { useEffect } from "react";
import { useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTeamByIdThunk } from "./teamSlice";

export default function TeamDetails() {
  const currentTeam = useSelector((state) => state.team.currentTeam);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentTeam?._id) {
      dispatch(fetchTeamByIdThunk({ token, teamId: currentTeam._id }));
    }
  }, [dispatch, token, currentTeam?._id]);

  if (!currentTeam) {
    return (
      <div className="text-white p-8">
        <h2 className="text-xl font-semibold">No team selected</h2>
        <p>Please select a team from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-white w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-red-600 text-white p-2 rounded-md text-lg">
            👥
          </span>
          {currentTeam.name}
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Add people
        </button>
      </div>

      {/* Members */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">
          Members ({currentTeam.members?.length || 0})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {currentTeam.members?.map((member) => (
            <div
              key={member._id}
              className="bg-gray-800 p-4 rounded-md flex items-center gap-4"
            >
              <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold uppercase">
                {member.name?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder for future sections */}
      <div className="bg-gray-800 rounded-md p-6 mt-6">
        <p className="text-gray-400 italic">
          Team activity section coming soon...
        </p>
      </div>
    </div>
  );
}
