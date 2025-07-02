// src/features/teams/AddPeopleModal.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMemberThunk, fetchTeamByIdThunk } from "./teamSlice";
import { toast } from "react-toastify";

export default function AddPeopleModal({ onClose }) {
  const [email, setEmail] = useState("");
  const { currentTeam } = useSelector((state) => state.team);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAdd = async () => {
  if (!email) return toast.error("Please enter an email.");

  // Simple email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return toast.error("Please enter a valid email address.");
  }

  try {
    await dispatch(
      addMemberThunk({
        token,
        teamId: currentTeam._id,
        email,
      })
    ).unwrap();
    toast.success("Member added!");
    dispatch(fetchTeamByIdThunk({ token, teamId: currentTeam._id }));
    onClose();
  } catch (err) {
    //console.log(err);
    
    toast.error(err);
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-900 text-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add People to Team</h2>
        <input
          type="email"
          placeholder="Enter user's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded mb-4"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="bg-gray-700 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleAdd} className="bg-blue-600 px-4 py-2 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
