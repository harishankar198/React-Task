import { BASE_URL, APP_ID, API_ENDPOINTS } from "./constants";

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}${API_ENDPOINTS.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        APPID: APP_ID,
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, msg: "Network error. Please try again." };
  }
};

export const fetchDoctors = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}${API_ENDPOINTS.doctorList}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        APPID: APP_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    if (response.ok && Array.isArray(data.data)) {
      return data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching doctor list:", error);
    return [];
  }
};

