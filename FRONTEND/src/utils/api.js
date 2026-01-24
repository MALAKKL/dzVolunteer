export const API_BASE_URL = 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api`;

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });
};

// Auth API
export const authAPI = {
  registerVolunteer: async (data) => {
    const response = await fetch(`${API_URL}/auth/register/volunteer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  registerOrganization: async (data) => {
    const response = await fetch(`${API_URL}/auth/register/organization`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  login: async (data) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    return result;
  },

  googleAuth: async (data) => {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.token) {
      localStorage.setItem('token', result.token);
    }
    return result;
  },

  getProfile: async () => {
    const response = await authFetch('/auth/profile');
    return response.json();
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

// Missions API
export const missionsAPI = {
  getAllMissions: async () => {
    const response = await fetch(`${API_URL}/missions`);
    return response.json();
  },

  getMissionById: async (id) => {
    const response = await fetch(`${API_URL}/missions/${id}`);
    return response.json();
  },

  searchMissions: async (query, city) => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (city) params.append('city', city);
    const response = await authFetch(`/missions/search?${params}`);
    return response.json();
  },

  createMission: async (data) => {
    const response = await authFetch('/organization/missions', {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
    return response.json();
  },

  updateMission: async (id, data) => {
    const response = await authFetch(`/organization/missions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteMission: async (id) => {
    const response = await authFetch(`/organization/missions/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  getMissionApplicants: async (id) => {
    const response = await authFetch(`/organization/missions/${id}/applicants`);
    return response.json();
  },

  updateApplicationStatus: async (applicationId, status) => {
    const response = await authFetch(`/organization/missions/applications/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  applyToMission: async (missionId, message) => {
    const response = await authFetch(`/applications/missions/${missionId}/apply`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    return response.json();
  },

  archiveMission: async (id) => {
    const response = await authFetch(`/missions/archive/${id}`, {
      method: 'PUT',
    });
    return response.json();
  },
};

// Organizations API
export const organizationsAPI = {
  getAllOrganizations: async (search, limit, offset) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (limit) params.append('limit', limit);
    if (offset) params.append('offset', offset);
    const response = await fetch(`${API_URL}/organizations?${params}`);
    return response.json();
  },

  getOrganizationById: async (id) => {
    const response = await fetch(`${API_URL}/organizations/${id}`);
    return response.json();
  },

  updateOrganization: async (id, data) => {
    const response = await authFetch(`/organizations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  uploadOrganizationProfilePhoto: async (formData) => {
    const response = await authFetch('/organizations/profile/photo', {
      method: 'PUT',
      body: formData,
    });
    return response.json();
  },
};

// Volunteers API
export const volunteersAPI = {
  getAllVolunteers: async () => {
    const response = await fetch(`${API_URL}/volunteers`);
    return response.json();
  },

  getMyProfile: async () => {
    const response = await authFetch('/volunteers/me');
    return response.json();
  },

  updateMyProfile: async (data) => {
    const response = await authFetch('/volunteers/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteMyAccount: async () => {
    const response = await authFetch('/volunteers/me', {
      method: 'DELETE',
    });
    return response.json();
  },

  getMyApplications: async () => {
    const response = await authFetch('/applications/my-applications');
    return response.json();
  },

  getMyParticipations: async () => {
    const response = await authFetch('/applications/my-participations');
    return response.json();
  },
};

// SDGs API
export const sdgsAPI = {
  getMissionsBySDG: async (sdgId) => {
    const response = await fetch(`${API_URL}/sdgs/missions?sdgId=${sdgId}`);
    return response.json();
  },
};

// Admin API
export const adminAPI = {
  verifySkill: async (data) => {
    const response = await authFetch('/admin/skills/verify', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteUser: async (userId) => {
    const response = await authFetch(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};