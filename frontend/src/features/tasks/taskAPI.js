import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createTask = async (token, taskData) => {
  const res = await axios.post(`${BASE_URL}/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateTask = async (token, taskId, taskData) => {
  const res = await axios.patch(`${BASE_URL}/tasks/${taskId}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


export const fetchTasksByTeam = async (token, teamId) => {
  const res = await axios.get(`${BASE_URL}/tasks/team/${teamId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


