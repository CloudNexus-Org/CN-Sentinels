import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { employees } from '../data/employees'

function resolvePublicAsset(path) {
  if (!path) return path

  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  return `${normalizedBase}${normalizedPath}`
}

const cloudNexusLogo = resolvePublicAsset('/asset/cloudnexus-logo.png')

function getPhoto(emp) {
  if (emp.photo) {
    return emp.photo.startsWith('/asset/')
      ? resolvePublicAsset(emp.photo)
      : emp.photo
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=15151f&color=0cf&size=128&font-size=0.4&bold=true`
}

const sdeIds = ['Prateeksha-Patel', 'Sherry-Khosla']

const internIds = [
  'Shivnandan-Verma',
  'Atharva-Karade',
  'Ankit-Kumar-Singh',
  'Sanjana-Chourey',
  'Deepak-Mandloi',
  'Rishabh-Raj-Dubey',
  'Suryansh-Chouhan'
]

const traineeIds = [
  'Sanskar-Namdeo',
  'Priyanshi-Shrivastava',
  'Khushboo-Padmakar'
]

function shortRole(title = '') {
  if (title.includes('Trainee')) return 'Trainee'
  if (title.includes('Intern')) return 'Intern'
  if (title.includes('(SDE-1)')) return 'SDE-1'
  if (title.includes('Lead')) return 'Team Lead'
  if (title.includes('RevOps') || title.includes('Revenue')) return 'Revenue Operations (...'
  if (title.includes('Software Development')) return 'Software Developme...'
  return title.length > 22 ? `${title.slice(0, 20)}...` : title
}

function normalizeSkills(skills = []) {
  const expanded = skills
    .flatMap((raw) => {
      const text = String(raw || '').replace(/\s+/g, ' ').trim()
      if (!text) return []

      const value = text.includes(':') ? text.split(':').slice(1).join(':').trim() : text
      return value
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
    })
    .map((skill) => skill.replace(/^[\-–•]\s*/, '').trim())
    .map((skill) => skill.replace(/\.$/, '').trim())
    .filter((skill) => skill.length > 1)

  const unique = []
  const seen = new Set()

  for (const skill of expanded) {
    const key = skill.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    unique.push(skill)
    if (unique.length >= 14) break
  }

  return unique
}

const TeamDirectory = () => {
  const navigate = useNavigate()
  const { id: selectedMemberId } = useParams()

  const ceo = employees.find((employee) => employee.id === 'kaustubh-singh')
  const cto = employees.find((employee) => employee.id === 'yash-singh')
  const techHead = employees.find((employee) => employee.id === 'shoaib-akhtar')
  const tl = employees.find((employee) => employee.id === 'harshit-vanya')
  const revOps = employees.find((employee) => employee.id === 'ritu-waghmare')

  const [query, setQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return []

    return employees.filter((employee) => {
      const haystack = [
        employee.name,
        employee.jobTitle,
        employee.department,
        employee.location,
        ...(employee.keySkills || [])
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    }).slice(0, 8)
  }, [query])

  const goToEmployee = (employee) => {
    if (!employee?.id) return
    setIsSearchOpen(false)
    setQuery('')
    navigate(`/profile/${employee.id}`)
  }

  const sdeGroup = sdeIds.map((id) => employees.find((employee) => employee.id === id)).filter(Boolean)
  const internGroup = internIds.map((id) => employees.find((employee) => employee.id === id)).filter(Boolean)
  const traineeGroup = traineeIds.map((id) => employees.find((employee) => employee.id === id)).filter(Boolean)

  const leadershipMembers = [ceo, cto].filter(Boolean)
  const technologyMembers = [techHead, tl].filter(Boolean)
  const revenueOpsMembers = [revOps].filter(Boolean)

  useEffect(() => {
    if (!selectedMemberId) return
    const target = document.querySelector(`[data-member-id="${selectedMemberId}"]`)
    if (!target) return

    window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 120)
  }, [selectedMemberId])

  const renderOrgCard = (member) => {
    const skills = normalizeSkills(Array.isArray(member.keySkills) ? member.keySkills : [])

    return (
      <Link
        key={member.id}
        to={`/profile/${member.id}`}
        data-member-id={member.id}
        className={`org-member-card${selectedMemberId === member.id ? ' is-active' : ''}`}
      >
        <div className="org-member-top">
          <div className="org-member-photo">
            <img src={getPhoto(member)} alt={member.name} />
          </div>
          <div>
            <div className="org-member-name">{member.name}</div>
            <div className="org-member-role-full">{member.jobTitle || 'Team Member'}</div>
            <div className="org-member-dept">{member.department || 'CloudNexus'}</div>
          </div>
        </div>

        <div className="org-member-divider" />

        <div className="org-member-facts">
          <div className="org-member-fact"><strong>Location</strong><span>{member.location || 'N/A'}</span></div>
          <div className="org-member-fact"><strong>Contact</strong><span>{member.contact || 'N/A'}</span></div>
          <div className="org-member-fact"><strong>Date of joining</strong><span>{member.dateOfJoining || 'N/A'}</span></div>
          <div className="org-member-fact"><strong>DOB</strong><span>{member.dateOfBirth || 'N/A'}</span></div>
          <div className="org-member-fact"><strong>Timezone</strong><span>{member.timeZone || 'N/A'}</span></div>
        </div>

        <div className="org-member-subtitle">Key Skills</div>
        <div className="org-member-skills">
          {skills.length ? skills.map((skill) => (
            <span key={skill} className="org-member-skill">{skill}</span>
          )) : (
            <span className="org-member-empty">Not listed</span>
          )}
        </div>

        <div className="org-member-subtitle">Introduction</div>
        <p className="org-member-intro">{member.professionalIntro || 'No introduction provided yet.'}</p>
      </Link>
    )
  }

  return (
    <div className="main-page">
      <header className="site-header" id="team">
        <div className="site-header-inner">
          <div className="brand-block">
            <div className="brand-logo">
              <img src={cloudNexusLogo} alt="CloudNexus logo" />
            </div>
            <div className="brand-meta">
              <div className="brand-kicker">CLOUDNEXUS</div>
              <div className="brand-title">Know Your Team - CN Sentinels</div>
              <div className="brand-subtitle">People, roles, and how to connect</div>
            </div>
          </div>

          <div className="header-actions">
            <a
              className="company-pill"
              href="https://www.cloudnexus.in/"
              target="_blank"
              rel="noreferrer"
              title="Visit cloudnexus.in"
            >
              Visit <span>cloudnexus.in</span>
            </a>

            <div className="employee-search">
              <div className="search-input-wrap">
                <span className="search-icon" aria-hidden="true">⌕</span>
                <input
                  className="search-input"
                  value={query}
                  placeholder="Search by name, role, department, or skills..."
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setIsSearchOpen(true)
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => {
                    window.setTimeout(() => setIsSearchOpen(false), 120)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      setIsSearchOpen(false)
                      event.currentTarget.blur()
                    }

                    if (event.key === 'Enter' && matches[0]) {
                      goToEmployee(matches[0])
                    }
                  }}
                />
              </div>

              {isSearchOpen && query.trim() && (
                <div className="search-dropdown" role="listbox" aria-label="Employee results">
                  {matches.length ? matches.map((employee) => (
                    <button
                      key={employee.id}
                      type="button"
                      className="search-item"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => goToEmployee(employee)}
                    >
                      <span className="search-item-avatar">
                        <img src={getPhoto(employee)} alt="" />
                      </span>
                      <span className="search-item-text">
                        <span className="search-item-name">{employee.name}</span>
                        <span className="search-item-role">{shortRole(employee.jobTitle || '')}</span>
                      </span>
                    </button>
                  )) : (
                    <div className="search-empty">No employees found.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="header-divider" />
      </header>

      <div className="org-tree-container">
        <ul className="org-tree">
          {ceo && (
            <li>
              <Link to={`/profile/${ceo.id}`} className="node ceo-node">
                <div className="node-photo"><img src={getPhoto(ceo)} alt={ceo.name} /></div>
                <div className="node-name">{ceo.name}</div>
                <div className="node-role">Founder & CEO</div>
              </Link>

              <ul>
                {cto && (
                  <li>
                    <Link to={`/profile/${cto.id}`} className="node cto-node">
                      <div className="node-photo"><img src={getPhoto(cto)} alt={cto.name} /></div>
                      <div className="node-name">{cto.name}</div>
                      <div className="node-role">CTO</div>
                    </Link>

                    <ul>
                      {techHead && (
                        <li>
                          <Link to={`/profile/${techHead.id}`} className="node cto-node">
                            <div className="node-photo"><img src={getPhoto(techHead)} alt={techHead.name} /></div>
                            <div className="node-name">{techHead.name}</div>
                            <div className="node-role">Technical Head</div>
                          </Link>

                          <ul>
                            <li>
                              <div className="trunk-nodes">
                                {tl && (
                                  <Link to={`/profile/${tl.id}`} className="node tl-node">
                                    <div className="node-photo"><img src={getPhoto(tl)} alt={tl.name} /></div>
                                    <div className="node-name">{tl.name}</div>
                                    <div className="node-role">Team Lead</div>
                                  </Link>
                                )}

                                {revOps && (
                                  <div className="prachi-branch">
                                    <div className="prachi-h-line" />
                                    <div className="prachi-v-line" />
                                    <Link to={`/profile/${revOps.id}`} className="node revops-node">
                                      <div className="node-photo"><img src={getPhoto(revOps)} alt={revOps.name} /></div>
                                      <div className="node-name">{revOps.name}</div>
                                      <div className="node-role">Revenue Operations (...</div>
                                    </Link>
                                  </div>
                                )}
                              </div>

                              <ul className="teams-row">
                                <li>
                                  <div className="team-group group-sde">
                                    <div className="team-group-grid">
                                      {sdeGroup.map((member) => (
                                        <Link key={member.id} to={`/profile/${member.id}`} className="team-member">
                                          <div className="tm-photo">
                                            <img src={getPhoto(member)} alt={member.name} />
                                          </div>
                                          <div className="tm-name">{member.name}</div>
                                          <div className="tm-role">{shortRole(member.jobTitle)}</div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </li>

                                <li>
                                  <div className="team-group group-intern">
                                    <div className="team-group-grid">
                                      {internGroup.map((member) => (
                                        <Link key={member.id} to={`/profile/${member.id}`} className="team-member">
                                          <div className="tm-photo">
                                            <img src={getPhoto(member)} alt={member.name} />
                                          </div>
                                          <div className="tm-name">{member.name}</div>
                                          <div className="tm-role">{shortRole(member.jobTitle)}</div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </li>

                                <li>
                                  <div className="team-group group-trainee">
                                    <div className="team-group-grid">
                                      {traineeGroup.map((member) => (
                                        <Link key={member.id} to={`/profile/${member.id}`} className="team-member">
                                          <div className="tm-photo">
                                            <img src={getPhoto(member)} alt={member.name} />
                                          </div>
                                          <div className="tm-name">{member.name}</div>
                                          <div className="tm-role">{shortRole(member.jobTitle)}</div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      )}
                    </ul>
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </div>

      <div className="org-cards-section">
        <div className="org-cards-header">
          <h3>Team directory</h3>
          <p>Showing all CloudNexus team members grouped by hierarchy.</p>
        </div>

        <div className="org-cards-group">
          <div className="org-cards-group-head">
            <h4>Leadership</h4>
            <span>{leadershipMembers.length} people</span>
          </div>
          <div className="org-cards-grid">
            {leadershipMembers.map(renderOrgCard)}
          </div>
        </div>

        <div className="org-cards-group">
          <div className="org-cards-group-head">
            <h4>Technology</h4>
            <span>{technologyMembers.length} people</span>
          </div>
          <div className="org-cards-grid">
            {technologyMembers.map(renderOrgCard)}
          </div>
        </div>

        <div className="org-cards-group">
          <div className="org-cards-group-head">
            <h4>Revenue Operations</h4>
            <span>{revenueOpsMembers.length} people</span>
          </div>
          <div className="org-cards-grid">
            {revenueOpsMembers.map(renderOrgCard)}
          </div>
        </div>

        <div className="org-cards-group">
          <div className="org-cards-group-head">
            <h4>SDE</h4>
            <span>{sdeGroup.length} people</span>
          </div>
          <div className="org-cards-grid">
            {sdeGroup.map(renderOrgCard)}
          </div>
        </div>

        <div className="org-cards-group">
          <div className="org-cards-group-head">
            <h4>Interns</h4>
            <span>{internGroup.length} people</span>
          </div>
          <div className="org-cards-grid">
            {internGroup.map(renderOrgCard)}
          </div>
        </div>

        <div className="org-cards-group">
          <div className="org-cards-group-head">
            <h4>Trainee</h4>
            <span>{traineeGroup.length} people</span>
          </div>
          <div className="org-cards-grid">
            {traineeGroup.map(renderOrgCard)}
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="section" id="about">
        <div className="section-label">ABOUT CLOUDNEXUS</div>
        <h2 className="section-title">Who <span>we are</span></h2>
        <div className="section-underline" />
        <p className="section-body">
          At CloudNexus, we are more than just an IT consulting company. We are innovators, problem-solvers, and architects
          of the digital future. We specialize in providing modern IT solutions that help businesses remain competitive,
          efficient, and secure in an era where technology is at the core of every business decision.
        </p>
        <p className="section-body" style={{ marginTop: 14 }}>
          Our team of technology experts, strategists, and problem solvers are here to collaborate closely with clients to deliver
          tailored solutions that enhance efficiency, drive growth, and accelerate innovation. Whether it's cloud migration,
          software development, automation, or cybersecurity, we ensure that your IT investments are safe, scalable,
          and optimized for success.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Why <span>CloudNexus?</span></h2>
        <p className="section-body" style={{ marginTop: 10 }}>
          Choosing the right technology partner is crucial for business success. At CloudNexus, we do not just offer IT solutions -
          we create transformative experiences that drive innovation, efficiency, and growth.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="fc-icon" style={{ background: '#0cf2' }}>🚀</div>
            <h4>Innovative & scalable solutions</h4>
            <p>We leverage the latest advancements in cloud computing, AI, and automation to build future-ready IT solutions.</p>
          </div>
          <div className="feature-card">
            <div className="fc-icon" style={{ background: '#f0f2' }}>❤️</div>
            <h4>Tailored approach</h4>
            <p>Every business is unique, and so are our solutions. We align digital solutions with specific business goals.</p>
          </div>
          <div className="feature-card">
            <div className="fc-icon" style={{ background: '#0f02' }}>💡</div>
            <h4>Product-driven innovation</h4>
            <p>By combining creative and analytical approaches, we build digital products that drive simplicity, innovation, efficiency, and scalability.</p>
          </div>
          <div className="feature-card">
            <div className="fc-icon" style={{ background: '#0cf2' }}>🔒</div>
            <h4>Security & reliability</h4>
            <p>Cybersecurity and data protection are at the core of everything we do. Our security-first approach protects your business.</p>
          </div>
          <div className="feature-card">
            <div className="fc-icon" style={{ background: '#ff02' }}>🌍</div>
            <h4>Expert team & global experience</h4>
            <p>We bring deep industry knowledge and extensive experience, helping enterprises navigate the global technology landscape.</p>
          </div>
          <div className="feature-card">
            <div className="fc-icon" style={{ background: '#f0f2' }}>📊</div>
            <h4>Business-centric results</h4>
            <p>Our focus is on delivering tangible business results, optimizing efficiency, improving productivity, and reducing costs.</p>
          </div>
        </div>
        <div style={{ maxWidth: 1000, margin: '20px auto 0' }}>
          <div className="feature-card" style={{ textAlign: 'center' }}>
            <div className="fc-icon" style={{ background: '#0cf2', margin: '0 auto 14px' }}>🤝</div>
            <h4>End-to-end support</h4>
            <p>From initial consultation to post-deployment support, we offer end-to-end services to ensure your IT ecosystem is running smoothly 24/7.</p>
          </div>
        </div>
      </div>

      <div className="section" id="vision">
        <h2 className="section-title">Our <span>vision & mission</span></h2>
        <div className="section-underline" />
        <div className="vm-grid">
          <div className="vm-card">
            <div className="vm-card-head vm-card-head-vision">
              <div className="vm-icon vm-icon-vision" aria-hidden="true">
                <span className="vm-icon-emoji">🌍</span>
              </div>
              <div className="vm-head-text">
                <div className="vm-kicker">VISION</div>
              </div>
            </div>
            <p>
              To be the global leader in IT solutions and digital product innovation, empowering businesses with
              cutting-edge technology that enhances efficiency, scalability, and growth. At CloudNexus, we envision
              a future where every business thrives by leveraging modern, sustainable, and future-ready solutions.
            </p>
          </div>
          <div className="vm-card">
            <div className="vm-card-head vm-card-head-mission">
              <div className="vm-icon vm-icon-mission" aria-hidden="true">
                <span className="vm-icon-emoji">🚀</span>
              </div>
              <div className="vm-head-text">
                <div className="vm-kicker">MISSION</div>
              </div>
            </div>
            <ul>
              <li>Developing innovative, meaningful products and solutions that enable businesses to operate efficiently, delivering real value in today's evolving digital world.</li>
              <li>Fostering continuous collaboration by building reliable, scalable systems, creating intelligent and adaptable solutions tailored to each client's needs.</li>
              <li>Driving digital innovation through AI, cloud computing, and advanced analytics, seamlessly integrating transformative technology into daily business operations.</li>
              <li>Empowering businesses of all sizes with accessibility, ease, and intelligent methodologies that foster productive and long-term success.</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="site-footer" aria-label="Footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-brand-logo" aria-hidden="true">
              <img src={cloudNexusLogo} alt="" />
            </div>
            <div className="footer-brand-text">
              <div className="footer-brand-name">CLOUDNEXUS</div>
              <div className="footer-brand-sub">Know Your Team - CN Sentinels</div>
            </div>
          </div>

          <div className="footer-mid">
            <a className="footer-pill" href="#team" title="Back to top">
              Know Your Team
            </a>
            <div className="footer-links" aria-label="Quick links">
              <a href="#about">About</a>
              <a href="#vision">Vision</a>
              <a href="https://www.cloudnexus.in/" target="_blank" rel="noreferrer">cloudnexus.in</a>
            </div>
          </div>

          <div className="footer-socials" aria-label="Social links">
            <a
              className="footer-social"
              href="https://www.linkedin.com/company/cloudnexusorg/?viewAsMember=true"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.2 23.8h4.6V7.9H.2v15.9ZM8.1 7.9h4.4v2.2h.1c.6-1.2 2.1-2.5 4.4-2.5 4.7 0 5.6 3.1 5.6 7.1v9.1h-4.6v-8.1c0-1.9 0-4.4-2.7-4.4-2.7 0-3.1 2.1-3.1 4.2v8.3H8.1V7.9Z" />
              </svg>
            </a>
            <a
              className="footer-social"
              href="https://www.instagram.com/cloudnexus.in/"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4A3.8 3.8 0 0 0 20 16.2V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm10.65 1.5a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TeamDirectory
