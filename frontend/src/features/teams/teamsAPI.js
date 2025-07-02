import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMyTeams = async (token) => {
  const res = await axios.get(`${BASE_URL}/teams/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createTeam = async (token, teamData) => {
  const res = await axios.post(`${BASE_URL}/teams/create`, teamData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchTeamById = async (token, teamId) => {
  const res = await axios.get(`${BASE_URL}/teams/${teamId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};