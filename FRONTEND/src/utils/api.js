export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
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

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `Request failed (Status ${response.status})`;
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorData.errorMessage || errorMessage;
      } else {
        const textError = await response.text();
        if (textError.includes("<!DOCTYPE html>") || textError.includes("<html>")) {
          errorMessage = `Server Error (404/500). Please try again later.`;
        } else {
          errorMessage = textError.slice(0, 100) || errorMessage;
        }
      }
    } catch (e) {
      console.error("Error parsing error response", e);
    }
    console.error(`API Error [${url}]:`, errorMessage);
    throw new Error(errorMessage);
  }

  return response;
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

  validateParticipation: async (data) => {
    const response = await authFetch('/organizations/validate-participation', {
      method: 'POST',
      body: JSON.stringify(data),
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

  getTopVolunteers: async () => {
    const response = await fetch(`${API_URL}/volunteers/top`);
    return response.json();
  },

  uploadVolunteerProfilePhoto: async (formData) => {
    const response = await authFetch('/volunteers/profile/photo', {
      method: 'PUT',
      body: formData,
    });
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
  addSkillWithCertificate: async (formData) => {
    const response = await authFetch('/volunteers/skills', {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },
};

// Skills API (Catalog)
export const skillsAPI = {
  getAllSkills: async () => {
    try {
      const response = await fetch(`${API_URL}/skills`);
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      console.log("API: Fetched skill catalog ->", data.length, "items");
      return data;
    } catch (error) {
      console.error("API: Failed to fetch skills", error);
      return [];
    }
  }
}

// SDGs API
export const sdgsAPI = {
  getAllSDGs: async () => {
    const response = await fetch(`${API_URL}/sdgs`);
    return response.json();
  },
  getMissionsBySDG: async (sdgId) => {
    const response = await fetch(`${API_URL}/sdgs/missions?sdgId=${sdgId}`);
    return response.json();
  },
};

// Admin API
export const adminAPI = {
  getVolunteers: async () => {
    const response = await authFetch('/admin/volunteers');
    return response.json();
  },

  getOrganizations: async () => {
    const response = await authFetch('/admin/organizations');
    return response.json();
  },

  getPlatformUsers: async () => {
    const response = await authFetch('/admin/users');
    return response.json();
  },

  getPendingSkills: async () => {
    const response = await authFetch('/admin/skills/pending');
    return response.json();
  },

  verifySkill: async (id, status) => {
    const response = await authFetch(`/admin/skills/${id}/verify`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  deleteUser: async (userId) => {
    const response = await authFetch(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
  getSkillsCatalog: async () => {
    const response = await fetch(`${API_URL}/skills`);
    return response.json();
  }
};