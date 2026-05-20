// Dentium UI Kit — app chrome (sidebar + top header)

const { useState: useChromeState } = React;

// ─── Sidebar ──────────────────────────────────────────────────
function Sidebar({ current, onNavigate, user }) {
  const navItems = [
    { id: 'dashboard',    label: 'Dashboard',    icon: 'layout-grid' },
    { id: 'live-clinic',  label: 'Live Clinic',  icon: 'activity' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar' },
    { id: 'patients',     label: 'Patients',     icon: 'users' },
    { id: 'billing',      label: 'Billing',      icon: 'mail' },
    { id: 'reports',      label: 'Reports',      icon: 'bar-chart-3' },
    { id: 'settings',     label: 'Settings',     icon: 'settings' },
  ];
  return (
    <div id="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-den">Den</span><span className="sidebar-logo-tium">tium</span>
        </div>
        <div className="sidebar-logo-sub">DENTAL MANAGEMENT</div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <a key={item.id}
             className={`nav-item ${current === item.id ? 'active' : ''}`}
             onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}>
            <span className="nav-item-icon"><Icon name={item.icon} size={16} /></span>
            <span className="nav-item-label">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <Avatar initials={user.initials} color="#622244" size="sm" />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--fg-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div className="sidebar-role-badge">{user.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TopHeader ────────────────────────────────────────────────
function TopHeader({ title }) {
  return (
    <div id="top-header">
      <div className="header-left">
        <div id="page-title">{title}</div>
      </div>
      <div className="header-right">
        <button className="header-icon-btn" title="Search"><Icon name="search" size={18} /></button>
        <button className="header-icon-btn" title="Notifications">
          <Icon name="bell" size={18} />
          <span className="header-notification-dot"></span>
        </button>
        <button className="header-avatar-btn">
          <Avatar initials="KM" color="#622244" size="sm" />
        </button>
      </div>
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────
function Breadcrumb({ items, onNavigate }) {
  return (
    <div className="breadcrumb">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="breadcrumb-sep">›</span>}
          {item.onClick ? (
            <span className="breadcrumb-link" onClick={item.onClick}>{item.label}</span>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────
function SectionHeader({ title, action }) {
  return (
    <div className="section-header">
      <div className="section-title">{title}</div>
      {action}
    </div>
  );
}

Object.assign(window, { Sidebar, TopHeader, Breadcrumb, SectionHeader });
