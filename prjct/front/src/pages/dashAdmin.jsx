'use client';

import React, { useState, useMemo } from "react";
import styles from '../components/dashAdmin.module.css';

// Mock Data
const mockSkills = [
  { id: 1, name: 'First Aid', verified: true, submittedDate: '2025-01-10' },
  { id: 2, name: 'CPR', verified: true, submittedDate: '2025-01-08' },
  { id: 3, name: 'Teaching', verified: false, submittedDate: '2025-01-20' },
  { id: 4, name: 'Environmental Conservation', verified: false, submittedDate: '2025-01-22' },
  { id: 5, name: 'Community Outreach', verified: true, submittedDate: '2025-01-05' },
];

const mockPendingValidations = [
  {
    id: 1,
    volunteerName: 'Ahmed Salem',
    skillName: 'First Aid',
    status: 'Pending',
    submittedDate: '2025-01-20',
  },
  {
    id: 2,
    volunteerName: 'Fatima Benali',
    skillName: 'Environmental Conservation',
    status: 'Pending',
    submittedDate: '2025-01-22',
  },
  {
    id: 3,
    volunteerName: 'Mohammed Hassan',
    skillName: 'Teaching',
    status: 'Pending',
    submittedDate: '2025-01-18',
  },
];

const mockVolunteers = [
  {
    id: 1,
    name: 'Ahmed Salem',
    email: 'ahmed.salem@email.com',
    totalHours: 125,
    skills: ['First Aid', 'CPR'],
    status: 'active',
  },
  {
    id: 2,
    name: 'Fatima Benali',
    email: 'fatima.benali@email.com',
    totalHours: 87,
    skills: ['Environmental Conservation'],
    status: 'active',
  },
  {
    id: 3,
    name: 'Mohammed Hassan',
    email: 'mohammed.hassan@email.com',
    totalHours: 156,
    skills: ['Teaching', 'Community Outreach'],
    status: 'active',
  },
];

const mockOrganizations = [
  {
    id: 1,
    name: 'Red Crescent',
    field: 'Health',
    creationDate: '2020-03-15',
    missions: 24,
    status: 'active',
  },
  {
    id: 2,
    name: 'Green Future',
    field: 'Environment',
    creationDate: '2021-06-20',
    missions: 18,
    status: 'active',
  },
  {
    id: 3,
    name: 'Education for All',
    field: 'Education',
    creationDate: '2019-11-10',
    missions: 31,
    status: 'active',
  },
];

const mockMissions = [
  {
    id: 1,
    title: 'Emergency Response Training',
    organization: 'Red Crescent',
    status: 'active',
    odd: 'ODD 3',
    requiredSkills: ['First Aid', 'CPR'],
    date: '2025-02-15',
  },
  {
    id: 2,
    title: 'Tree Planting Initiative',
    organization: 'Green Future',
    status: 'active',
    odd: 'ODD 13',
    requiredSkills: ['Environmental Conservation'],
    date: '2025-02-20',
  },
  {
    id: 3,
    title: 'Literacy Program',
    organization: 'Education for All',
    status: 'completed',
    odd: 'ODD 4',
    requiredSkills: ['Teaching'],
    date: '2025-01-10',
  },
];

const mockHoursAudit = [
  {
    id: 1,
    mission: 'Emergency Response Training',
    volunteer: 'Ahmed Salem',
    organization: 'Red Crescent',
    hours: 8,
    date: '2025-01-15',
  },
  {
    id: 2,
    mission: 'Tree Planting Initiative',
    volunteer: 'Fatima Benali',
    organization: 'Green Future',
    hours: 6,
    date: '2025-01-18',
  },
  {
    id: 3,
    mission: 'Literacy Program',
    volunteer: 'Mohammed Hassan',
    organization: 'Education for All',
    hours: 10,
    date: '2025-01-12',
  },
];

const odds = [
  { id: 1, number: 1, title: 'No Poverty', missions: 5 },
  { id: 2, number: 3, title: 'Good Health and Well-Being', missions: 12 },
  { id: 3, number: 4, title: 'Quality Education', missions: 8 },
  { id: 4, number: 13, title: 'Climate Action', missions: 6 },
  { id: 5, number: 16, title: 'Peace, Justice and Strong Institutions', missions: 3 },
];

// Components
function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarLogo}>
          🛡️ DZ Admin
        </div>
      </div>
      <ul className={styles.sidebarMenu}>
        <li>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={activeTab === 'dashboard' ? styles.active : ''}
          >
            📊 Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('skill-validation')}
            className={activeTab === 'skill-validation' ? styles.active : ''}
          >
            ✅ Skill Validation
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('skills-management')}
            className={activeTab === 'skills-management' ? styles.active : ''}
          >
            🎓 Skills Management
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('volunteers')}
            className={activeTab === 'volunteers' ? styles.active : ''}
          >
            👥 Volunteers
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('organizations')}
            className={activeTab === 'organizations' ? styles.active : ''}
          >
            🏢 Organizations
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('missions')}
            className={activeTab === 'missions' ? styles.active : ''}
          >
            🎯 Missions
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('hours-audit')}
            className={activeTab === 'hours-audit' ? styles.active : ''}
          >
            ⏱️ Hours Audit
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('odds')}
            className={activeTab === 'odds' ? styles.active : ''}
          >
            🌍 ODD Management
          </button>
        </li>
      </ul>
    </div>
  );
}

function Header({ title }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      <div className={styles.headerUser}>
        <div className={styles.userAvatar}>AD</div>
        <span>Admin</span>
      </div>
    </div>
  );
}

function DashboardView() {
  const totalVolunteers = mockVolunteers.length;
  const totalOrganizations = mockOrganizations.length;
  const activeMissions = mockMissions.filter((m) => m.status === 'active').length;
  const totalHours = mockVolunteers.reduce((sum, v) => sum + v.totalHours, 0);
  const pendingValidations = mockPendingValidations.length;

  return (
    <div>
      <div className={styles.statsPanel}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Volunteers</div>
          <div className={styles.statValue}>{totalVolunteers}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Organizations</div>
          <div className={styles.statValue}>{totalOrganizations}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Active Missions</div>
          <div className={styles.statValue}>{activeMissions}</div>
        </div>
        <div className={`${styles.statCard} ${styles.success}`}>
          <div className={styles.statLabel}>Total Hours Volunteered</div>
          <div className={styles.statValue}>{totalHours}</div>
        </div>
        <div className={`${styles.statCard} ${styles.warning}`}>
          <div className={styles.statLabel}>Pending Validations</div>
          <div className={styles.statValue}>{pendingValidations}</div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className={`${styles.badge} ${styles.pending}`}>Pending Validation</span>
                </td>
                <td>Mohammed Hassan - Teaching skill</td>
                <td>2025-01-18</td>
              </tr>
              <tr>
                <td>
                  <span className={`${styles.badge} ${styles.verified}`}>Verified</span>
                </td>
                <td>Fatima Benali - Environmental Conservation</td>
                <td>2025-01-22</td>
              </tr>
              <tr>
                <td>
                  <span className={`${styles.badge} ${styles.active}`}>Active Mission</span>
                </td>
                <td>Tree Planting Initiative - Green Future</td>
                <td>2025-02-20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SkillValidationView() {
  const [validations, setValidations] = useState(mockPendingValidations);
  const [showModal, setShowModal] = useState(false);
  const [selectedValidation, setSelectedValidation] = useState(null);
  const [action, setAction] = useState(null);

  const handleValidation = (id) => {
    setValidations(validations.filter((v) => v.id !== id));
    setShowModal(false);
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Pending Skill Validations</h2>

      {validations.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>✅</div>
          <p>All skills have been validated!</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Volunteer Name</th>
                <th>Skill Name</th>
                <th>Status</th>
                <th>Date Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {validations.map((v) => (
                <tr key={v.id}>
                  <td>{v.volunteerName}</td>
                  <td>{v.skillName}</td>
                  <td>
                    <span className={`${styles.badge} ${styles.pending}`}>⏳ {v.status}</span>
                  </td>
                  <td>{v.submittedDate}</td>
                  <td>
                    <div className={styles.btnGroup}>
                      <button
                        className={`${styles.btn} ${styles.btnSuccess} ${styles.btnSm}`}
                        onClick={() => {
                          setSelectedValidation(v);
                          setAction('approve');
                          setShowModal(true);
                        }}
                      >
                        ✅ Approve
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                        onClick={() => {
                          setSelectedValidation(v);
                          setAction('reject');
                          setShowModal(true);
                        }}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedValidation && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              {action === 'approve' ? 'Approve Skill' : 'Reject Skill'}
            </div>
            <div className={styles.modalBody}>
              <p>
                {action === 'approve'
                  ? `Are you sure you want to approve ${selectedValidation.skillName} for ${selectedValidation.volunteerName}?`
                  : `Are you sure you want to reject ${selectedValidation.skillName} for ${selectedValidation.volunteerName}?`}
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className={`${styles.btn} ${action === 'approve' ? styles.btnSuccess : styles.btnDanger}`}
                onClick={() => handleValidation(selectedValidation.id, action)}
              >
                {action === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillsManagementView() {
  const [skills, setSkills] = useState(mockSkills);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', verified: false });
  const [editingId, setEditingId] = useState(null);

  const handleAddSkill = () => {
    if (editingId) {
      setSkills(
        skills.map((s) =>
          s.id === editingId
            ? { ...s, name: formData.name, verified: formData.verified }
            : s,
        ),
      );
      setEditingId(null);
    } else {
      setSkills([
        ...skills,
        {
          id: Date.now(),
          name: formData.name,
          verified: formData.verified,
          submittedDate: new Date().toISOString().split('T')[0],
        },
      ]);
    }
    setFormData({ name: '', verified: false });
    setShowModal(false);
  };

  const handleEdit = (skill) => {
    setFormData({ name: skill.name, verified: skill.verified });
    setEditingId(skill.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.sectionTitle}>Skills Catalog</h2>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => {
          setFormData({ name: '', verified: false });
          setEditingId(null);
          setShowModal(true);
        }}>
          + Add Skill
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Verification Required</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td>
                  <span className={`${styles.badge} ${skill.verified ? styles.verified : styles.pending}`}>
                    {skill.verified ? '✔️ Yes' : '❌ No'}
                  </span>
                </td>
                <td>{skill.submittedDate}</td>
                <td>
                  <div className={styles.btnGroup}>
                    <button
                      className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}
                      onClick={() => handleEdit(skill)}
                    >
                      Edit
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                      onClick={() => handleDelete(skill.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              {editingId ? 'Edit Skill' : 'Add New Skill'}
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Skill Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter skill name"
                />
              </div>
              <div className={styles.formGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                  />
                  {' '}Verification Required
                </label>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={handleAddSkill}
                disabled={!formData.name}
              >
                {editingId ? 'Update' : 'Add'} Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VolunteersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredVolunteers = useMemo(
    () => mockVolunteers.filter(
      (v) => v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.email.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    [searchTerm],
  );

  return (
    <div>
      <h2 className={styles.sectionTitle}>Volunteers Management</h2>

      <div className={styles.filters}>
        <input
          type="text"
          className={styles.filterInput}
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Total Hours</th>
              <th>Skills</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVolunteers.map((volunteer) => (
              <tr key={volunteer.id}>
                <td>{volunteer.name}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.totalHours}h</td>
                <td>{volunteer.skills.join(', ')}</td>
                <td>
                  <span className={`${styles.badge} ${styles.active}`}>Active</span>
                </td>
                <td>
                  <div className={styles.btnGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}>View Profile</button>
                    <button className={`${styles.btn} ${styles.btnWarning} ${styles.btnSm}`}>Suspend</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrganizationsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredOrgs = useMemo(
    () => mockOrganizations.filter(
      (o) => o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.field.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    [searchTerm],
  );

  return (
    <div>
      <h2 className={styles.sectionTitle}>Organizations Management</h2>

      <div className={styles.filters}>
        <input
          type="text"
          className={styles.filterInput}
          placeholder="Search by name or field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Field</th>
              <th>Creation Date</th>
              <th>Missions</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrgs.map((org) => (
              <tr key={org.id}>
                <td>{org.name}</td>
                <td>{org.field}</td>
                <td>{org.creationDate}</td>
                <td>{org.missions}</td>
                <td>
                  <span className={`${styles.badge} ${styles.active}`}>Active</span>
                </td>
                <td>
                  <div className={styles.btnGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}>View Profile</button>
                    <button className={`${styles.btn} ${styles.btnWarning} ${styles.btnSm}`}>Suspend</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MissionsView() {
  const [statusFilter, setStatusFilter] = useState('all');
  const filteredMissions = useMemo(
    () => statusFilter === 'all'
      ? mockMissions
      : mockMissions.filter((m) => m.status === statusFilter),
    [statusFilter],
  );

  return (
    <div>
      <h2 className={styles.sectionTitle}>Missions Oversight</h2>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${statusFilter === 'all' ? styles.active : ''}`}
          onClick={() => setStatusFilter('all')}
        >
          All Missions
        </button>
        <button
          className={`${styles.tabButton} ${statusFilter === 'active' ? styles.active : ''}`}
          onClick={() => setStatusFilter('active')}
        >
          Active
        </button>
        <button
          className={`${styles.tabButton} ${statusFilter === 'completed' ? styles.active : ''}`}
          onClick={() => setStatusFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`${styles.tabButton} ${statusFilter === 'archived' ? styles.active : ''}`}
          onClick={() => setStatusFilter('archived')}
        >
          Archived
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Organization</th>
              <th>ODD</th>
              <th>Required Skills</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMissions.map((mission) => (
              <tr key={mission.id}>
                <td>{mission.title}</td>
                <td>{mission.organization}</td>
                <td>{mission.odd}</td>
                <td>{mission.requiredSkills.join(', ')}</td>
                <td>
                  <span className={`${styles.badge} ${mission.status === 'active' ? styles.active : styles.archived}`}>
                    {mission.status}
                  </span>
                </td>
                <td>
                  <div className={styles.btnGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}>View</button>
                    <button className={`${styles.btn} ${styles.btnWarning} ${styles.btnSm}`}>Archive</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HoursAuditView() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredAudit = useMemo(
    () => mockHoursAudit.filter(
      (a) => a.volunteer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.mission.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    [searchTerm],
  );

  return (
    <div>
      <h2 className={styles.sectionTitle}>Volunteering Hours Audit</h2>

      <div className={styles.filters}>
        <input
          type="text"
          className={styles.filterInput}
          placeholder="Search by volunteer or mission..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Mission</th>
              <th>Volunteer</th>
              <th>Organization Validator</th>
              <th>Hours Validated</th>
              <th>Validation Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAudit.map((audit) => (
              <tr key={audit.id}>
                <td>{audit.mission}</td>
                <td>{audit.volunteer}</td>
                <td>{audit.organization}</td>
                <td>{audit.hours}h</td>
                <td>{audit.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ODDManagementView() {
  return (
    <div>
      <h2 className={styles.sectionTitle}>ODD (SDG) Management</h2>
      <p className={styles.subtitle}>
        Read-only view of the 17 Sustainable Development Goals
      </p>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ODD #</th>
              <th>Title</th>
              <th>Description</th>
              <th>Missions</th>
            </tr>
          </thead>
          <tbody>
            {odds.map((odd) => (
              <tr key={odd.id}>
                <td>
                  <strong>ODD {odd.number}</strong>
                </td>
                <td>{odd.title}</td>
                <td>Sustainable Development Goal {odd.number}</td>
                <td>{odd.missions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main App Component
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getTitle = () => {
    const titles = {
      dashboard: 'Platform Overview',
      'skill-validation': 'Skill Validation Center',
      'skills-management': 'Skills Management',
      volunteers: 'Volunteers Management',
      organizations: 'Organizations Management',
      missions: 'Missions Oversight',
      'hours-audit': 'Volunteering Hours Audit',
      odds: 'ODD Management',
    };
    return titles[activeTab] || 'Admin Dashboard';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'skill-validation':
        return <SkillValidationView />;
      case 'skills-management':
        return <SkillsManagementView />;
      case 'volunteers':
        return <VolunteersView />;
      case 'organizations':
        return <OrganizationsView />;
      case 'missions':
        return <MissionsView />;
      case 'hours-audit':
        return <HoursAuditView />;
      case 'odds':
        return <ODDManagementView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.mainContent}>
        <Header title={getTitle()} />
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
}