import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { employees } from '../data/employees'

function getPhoto(emp) {
  if (emp.photo) {
    return emp.photo.startsWith('/asset/')
      ? `${import.meta.env.BASE_URL}${emp.photo.slice(1)}`
      : emp.photo
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=15151f&color=0cf&size=128&font-size=0.4&bold=true`
}

const ProfileDetail = () => {
  const { id } = useParams()
  const employee = employees.find(emp => emp.id === id)

  if (!employee) {
    return (
      <div className="profile-page">
        <div className="profile-topbar">
          <Link to="/" className="back-btn">← Back to Org Tree</Link>
        </div>
        <div className="profile-section" style={{ textAlign: 'center', padding: 60 }}>
          <p style={{ color: '#555', fontSize: 16 }}>Profile not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      {/* Top bar */}
      <div className="profile-topbar">
        <Link to="/" className="back-btn">← Back to Org Tree</Link>
        <div className="profile-view-label">PROFILE VIEW</div>
      </div>

      {/* Member Profile */}
      <div className="profile-section">
        <div className="profile-section-label">MEMBER PROFILE</div>
        <div className="member-header">
          <div className="member-info-row">
            <div className="member-avatar">
              <img src={getPhoto(employee)} alt={employee.name} />
            </div>
            <div className="member-text">
              <h2>{employee.name}</h2>
              <div className="member-title">{employee.jobTitle}</div>
              <div className="member-dept">{employee.department}</div>
            </div>
          </div>
          <div className="member-header-actions">
            <div className="member-chain-icon">🔗</div>
          </div>
        </div>
        <div className="member-meta-divider" />
        <div className="member-meta-grid">
          <div className="member-meta-item"><strong>Location:</strong>&nbsp; {employee.location}</div>
          <div className="member-meta-item"><strong>Contact details:</strong>&nbsp; {employee.contact}</div>
          <div className="member-meta-item"><strong>Date of joining:</strong>&nbsp; {employee.dateOfJoining}</div>
          <div className="member-meta-item"><strong>Time zone shift:</strong>&nbsp; {employee.timeZone}</div>
        </div>
      </div>

      {/* Key Skills */}
      <div className="profile-section">
        <div className="profile-section-label">KEY SKILLS</div>
        <div className="skills-tags">
          {employee.keySkills.map((skill, i) => (
            <span key={i} className="skill-pill">{skill}</span>
          ))}
        </div>
      </div>

      {/* Technical Development Skills */}
      {employee.technicalSkills && employee.technicalSkills.length > 0 && (
        <div className="profile-section">
          <div className="tech-skills-title">Technical Development Skills</div>
          <ul className="tech-skills-list">
            {employee.technicalSkills.map((ts, i) => (
              <li key={i}><strong>{ts.category}:</strong> {ts.skills}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Bio */}
      <div className="profile-section">
        <div className="profile-section-label">SHORT PROFESSIONAL INTRODUCTION / BIO</div>
        <div className="bio-text">{employee.professionalIntro}</div>
      </div>

      {/* Social Links */}
      <div className="profile-section">
        <div className="profile-section-label">SOCIAL LINKS</div>
        <div className="social-links-row">
          <button className="social-btn">LinkedIn</button>
          <button className="social-btn">GitHub</button>
          <span className="social-not-provided">Portfolio: Not provided</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail
