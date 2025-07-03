import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentTeam, fetchMyTeamsThunk } from "./teamSlice";
import { fetchTasksByTeamThunk } from "../tasks/taskSlice";

export default function TeamSidebar({ onCreateClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user } = useSelector((state) => state.auth);
  const { teams, currentTeam } = useSelector((state) => state.team);

  useEffect(() => {
    if (token) {
      dispatch(fetchMyTeamsThunk(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white px-3 py-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed sm:static top-0 left-0 h-full z-40 bg-gray-900 text-white flex flex-col border-r border-gray-800 px-4 py-6 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        {/* Close button for mobile */}
        <div className="flex sm:hidden justify-end mb-4">
          <button
            className="text-white text-xl px-2 py-1"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* 👤 User Profile */}
        <div className="flex items-center mb-6 space-x-3">
          <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold uppercase">
            {user?.name?.[0] || "U"}
          </div>
          <p className="text-base font-semibold">{user?.name || "User"}</p>
        </div>

        {/* 🧩 Teams Section */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-300">Teams</h2>
          <div className="relative" ref={dropdownRef}>
            <button
              className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-md text-base"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              +
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    onCreateClick();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
                >
                  Create a team
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 📋 Team List */}
        <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          {teams.map((team) => (
            <div
              key={team._id}
              onClick={() => {
                dispatch(setCurrentTeam(team));
                dispatch(
                  fetchTasksByTeamThunk({
                    token,
                    teamId: team._id,
                  })
                );
                navigate("/dashboard");
                setSidebarOpen(false); // close sidebar on mobile
              }}
              className={`px-3 py-2 rounded-md cursor-pointer transition text-sm font-medium ${
                currentTeam?._id === team._id
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {team.name}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
