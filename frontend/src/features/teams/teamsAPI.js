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
