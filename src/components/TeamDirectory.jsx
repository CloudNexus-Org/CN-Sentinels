import React from 'react'
import { Link } from 'react-router-dom'
import { employees } from '../data/employees'
 
function getPhoto(emp) {
  return emp.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=15151f&color=0cf&size=128&font-size=0.4&bold=true`
}
 
const sdeIds = ['Prateeksha-Patel', 'Bhumika-Kori','Sherry-Khosla']
 
const internIds = [
  'Shivnandan-Verma', 'Atharva-Karade',
  'Ankit-Kumar-Singh', 'Sanjana-Chourey', 'Deepak-Mandloi',
  'Rishabh-Raj-Dubey', 'Suryansh-Chouhan'
]
 
const traineeIds = [
  'Sanskar-Namdeo', 'Priyanshi-Shrivastava', 'Abhay-Kumar-Gupta','Khushboo-Padmakar'
]
 
function shortRole(title) {
  if (title.includes('Trainee')) return 'Trainee'
  if (title.includes('Intern')) return 'Intern'
  if (title.includes('(SDE-1)')) return 'SDE-1'
  if (title.includes('Lead')) return 'Team Lead'
  if (title.includes('RevOps') || title.includes('Revenue')) return 'Revenue Operations (...'
  if (title.includes('Software Development')) return 'Software Developme...'
  return title.length > 22 ? title.slice(0, 20) + '...' : title
}
 
const TeamDirectory = () => {
  const ceo = employees.find(e => e.id === 'kaustubh-singh')
  const cto = employees.find(e => e.id === 'yash-singh')
  const techHead = employees.find(e => e.id === 'shoaib-akhtar')
  const tl = employees.find(e => e.id === 'harshit-vanya')
  const revOps = employees.find(e => e.id === 'ritu-waghmare')
 
  const sdeGroup = sdeIds.map(id => employees.find(e => e.id === id)).filter(Boolean)
  const internGroup = internIds.map(id => employees.find(e => e.id === id)).filter(Boolean)
  const traineeGroup = traineeIds.map(id => employees.find(e => e.id === id)).filter(Boolean)
 
  return (
    <div className="main-page">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="logo">
          <div className="logo-icon">CN</div>
          <span>CloudNexus</span>
        </div>
        <div className="nav-links">
          <a href="#team" className="active">Team</a>
          <a href="#about">About</a>
          <a href="#vision">Vision</a>
        </div>
      </div>
 
      {/* Hero */}
      <div className="hero" id="team">
        <h1>Know Your Team – CN Sentinels</h1>
        <p>People, roles and how to connect.</p>
      </div>
 
      {/* ========== ORG TREE (exact hierarchy) ========== */}
      <div className="org-tree-container">
        <ul className="org-tree">
          {/* Level 1: CEO */}
          {ceo && (
            <li>
              <Link to={`/profile/${ceo.id}`} className="node ceo-node">
                <div className="node-photo"><img src={getPhoto(ceo)} alt={ceo.name} /></div>
                <div className="node-name">{ceo.name}</div>
                <div className="node-role">Founder & CEO</div>
              </Link>
 
              <ul>
                {/* Level 2: CTO */}
                {cto && (
                  <li>
                    <Link to={`/profile/${cto.id}`} className="node cto-node">
                      <div className="node-photo"><img src={getPhoto(cto)} alt={cto.name} /></div>
                      <div className="node-name">{cto.name}</div>
                      <div className="node-role">CTO</div>
                    </Link>
 
                    <ul>
                      {/* Level 3: Tech Head */}
                      {techHead && (
                        <li>
                          <Link to={`/profile/${techHead.id}`} className="node cto-node">
                            <div className="node-photo"><img src={getPhoto(techHead)} alt={techHead.name} /></div>
                            <div className="node-name">{techHead.name}</div>
                            <div className="node-role">Technical Head</div>
                          </Link>
 
                          <ul>
                            {/* Level 4: TL & RevOps */}
                            <li>
                              <div className="prachi-h-line" />
                              <div className="trunk-nodes">
                                {/* Sub-level trunk: Arhan (Team Lead) */}
                                {tl && (
                                  <Link to={`/profile/${tl.id}`} className="node tl-node">
                                    <div className="node-photo"><img src={getPhoto(tl)} alt={tl.name} /></div>
                                    <div className="node-name">{tl.name}</div>
                                    <div className="node-role">Team Lead</div>
                                  </Link>
                                )}
 
                                {/* Asymmetric branch: Ritu (RevOps) */}
                                {revOps && (
                                  <div className="prachi-branch">
                                    {/* <div className="prachi-h-line" /> */}
                                    {/* <div className="prachi-v-line" /> */}
                                    <Link to={`/profile/${revOps.id}`} className="node revops-node">
                                      <div className="node-photo"><img src={getPhoto(revOps)} alt={revOps.name} /></div>
                                      <div className="node-name">{revOps.name}</div>
                                      <div className="node-role">Revenue Operations (...</div>
                                    </Link>
                                  </div>
                                )}
                              </div>
 
                              {/* Level 5: The 3 team groups (SDE, Interns, Trainees) */}
                              <ul className="teams-row">
                                <li>
                                  <div className="team-group group-sde">
                                    {/* <div className="team-group-label">FULL-TIME EMPLOYEES</div> */}
                                    <div className="team-group-grid">
                                      {sdeGroup.map(m => (
                                        <Link key={m.id} to={`/profile/${m.id}`} className="team-member">
                                          <div className="tm-photo">
                                            <img src={getPhoto(m)} alt={m.name} />
                                          </div>
                                          <div className="tm-name">{m.name}</div>
                                          <div className="tm-role">{shortRole(m.jobTitle)}</div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="team-group group-intern">
                                    {/* <div className="team-group-label">INTERNS</div> */}
                                    <div className="team-group-grid">
                                      {internGroup.map(m => (
                                        <Link key={m.id} to={`/profile/${m.id}`} className="team-member">
                                          <div className="tm-photo">
                                            <img src={getPhoto(m)} alt={m.name} />
                                          </div>
                                          <div className="tm-name">{m.name}</div>
                                          <div className="tm-role">{shortRole(m.jobTitle)}</div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div className="team-group group-trainee">
                                    {/* <div className="team-group-label">TRAINEES</div> */}
                                    <div className="team-group-grid">
                                      {traineeGroup.map(m => (
                                        <Link key={m.id} to={`/profile/${m.id}`} className="team-member">
                                          <div className="tm-photo">
                                            <img src={getPhoto(m)} alt={m.name} />
                                          </div>
                                          <div className="tm-name">{m.name}</div>
                                          <div className="tm-role">{shortRole(m.jobTitle)}</div>
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
 
      {/* DIVIDER */}
      <div className="divider" />
 
      {/* WHO WE ARE */}
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
 
      {/* WHY CLOUDNEXUS */}
      <div className="section">
        <h2 className="section-title">Why <span>CloudNexus?</span></h2>
        <p className="section-body" style={{ marginTop: 10 }}>
          Choosing the right technology partner is crucial for business success. At CloudNexus, we do not just offer IT solutions—
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
 
      {/* VISION & MISSION */}
      <div className="section" id="vision">
        <h2 className="section-title">Our <span>vision & mission</span></h2>
        <div className="vm-grid">
          <div className="vm-card">
            <h4><span className="vm-dot" style={{ background: '#0cf' }} /> VISION</h4>
            <p>
              To be the global leader in IT solutions and digital product innovation, empowering businesses with
              cutting-edge technology that enhances efficiency, scalability, and growth. At CloudNexus, we envision
              a future where every business thrives by leveraging modern, sustainable, and future-ready solutions.
            </p>
          </div>
          <div className="vm-card">
            <h4><span className="vm-dot" style={{ background: '#f44' }} /> MISSION</h4>
            <ul>
              <li>Developing innovative, meaningful products and solutions that enable businesses to operate efficiently, delivering real value in today's evolving digital world.</li>
              <li>Fostering continuous collaboration by building reliable, scalable systems—creating intelligent and adaptable solutions tailored to each client's needs.</li>
              <li>Driving digital innovation through AI, cloud computing, and advanced analytics, seamlessly integrating transformative technology into daily business operations.</li>
              <li>Empowering businesses of all sizes with accessibility, ease, and intelligent methodologies that foster productive and long-term success.</li>
            </ul>
          </div>
        </div>
      </div>
 
      {/* FOOTER */}
      <div className="site-footer">
        <div className="footer-logo">CLOUDNEXUS</div>
        <div className="footer-link">Know Your Team</div>
        <div className="footer-socials">
          <a href="#" title="LinkedIn">in</a>
          <a href="#" title="Twitter">𝕏</a>
          <a href="#" title="Instagram">ig</a>
        </div>
      </div>
    </div>
  )
}
 
export default TeamDirectory
 