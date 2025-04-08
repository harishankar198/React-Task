import React, { useEffect, useState } from "react";
import { fetchDoctors } from "../lib/api";
import { DEFAULT_PROFILE_PIC } from "../lib/constants";
import "../styles/DoctorList.css";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [fullName, setFullName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Load patient profile
    const profile = localStorage.getItem("patientProfile");
    if (profile) {
      try {
        const parsed = JSON.parse(profile);
        const firstName = parsed.first_name || "";
        const lastName = parsed.last_name || "";
        setFullName(`${firstName} ${lastName}`.trim() || "User");
      } catch (err) {
        console.error("Failed to parse patient profile:", err);
        setFullName("User");
      }
    } else {
      setFullName("User");
    }

    if (token) {
      fetchDoctors(token).then((data) => setDoctors(data));
    } else {
      console.warn("No token found in localStorage.");
    }
  }, [token]);

  const getProfilePic = (url) => {
    if (!url) return DEFAULT_PROFILE_PIC;
    return url.startsWith("http")
      ? url
      : `https://qa-uaesaas-api.instapract.ae${url}`;
  };

  return (
    <div>
      <div className="top-bar">
        <div className="right-section">
          <h2 className="doc-logo">
            <span>Insta</span>pract
          </h2>
          <h5 className="doc-subtitle">HealthTech IT Solution</h5>
        </div>
        <div className="left-section">
          <img
            src={getProfilePic("")}
            alt="User"
            className="user-profile-pic"
          />
          <span className="user-name">Hi, {fullName}</span>
        </div>
      </div>

      <div className="container">
        <h2 className="title">List of Available Doctors</h2>

        {doctors.length === 0 ? (
          <p className="no-data">No doctors found.</p>
        ) : (
          <div className="doctor-list">
            {doctors.map((doc, index) => (
              <div key={index} className="doctor-card">
                <div className="profile-section">
                  <img
                    src={getProfilePic(doc.profile_picture)}
                    alt={doc.name}
                    className="profile-pic"
                  />
                  <div className="doctor-info">
                    <h3>{doc.name}</h3>
                    <p>{doc.specialty?.[0]?.name || "No Specialty"}</p>
                  </div>
                </div>
                <button className="connect-button">Connect</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;

