// Dentium UI Kit — atomic components
// Avatar, StatusBadge, Button, Icon, KPI, EmptyState, AlertBanner, AllergyAlert

const { useState } = React;

// ─── Icon ─────────────────────────────────────────────────────
// Reusable inline-SVG icons. 1.5px stroke, currentColor. The
// internals are minified Lucide-style paths so a) we don't load
// the whole lucide library, b) we control sizing per-call.
const ICON_PATHS = {
  'layout-grid':   '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  'activity':      '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  'calendar':      '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  'users':         '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'mail':          '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
  'bar-chart-3':   '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  'settings':      '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  'search':        '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'bell':          '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  'plus':          '<path d="M12 5v14M5 12h14"/>',
  'more-horizontal':'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-down':  '<path d="m6 9 6 6 6-6"/>',
  'alert-triangle':'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'check-circle':  '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  'x':             '<path d="M18 6 6 18M6 6l12 12"/>',
  'eye':           '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  'file-text':     '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  'trending-up':   '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  'trending-down': '<path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/>',
  'phone':         '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'pill':          '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
  'credit-card':   '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  'clock':         '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'check':         '<polyline points="20 6 9 17 4 12"/>',
  'edit':          '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  'filter':        '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  'download':      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'arrow-right':   '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  'arrow-up':      '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
};

function Icon({ name, size = 16, color }) {
  const body = ICON_PATHS[name] || '';
  return (
    <span style={{ display: 'inline-flex', color: color || 'currentColor', width: size, height: size, flexShrink: 0 }}
          dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${body}</svg>` }} />
  );
}

// ─── Avatar ───────────────────────────────────────────────────
function Avatar({ initials, color, size = 'md' }) {
  return <div className={`avatar avatar-${size}`} style={{ background: color }}>{initials}</div>;
}

// ─── StatusBadge ──────────────────────────────────────────────
// Maps Dentium's data statuses to the production .badge-* classes.
const STATUS_LABEL = {
  'scheduled': 'Scheduled', 'confirmed': 'Confirmed', 'in-progress': 'In Progress',
  'completed': 'Completed', 'cancelled': 'Cancelled', 'no-show': 'No Show',
  'waiting': 'Waiting', 'checked-in': 'Checked In', 'billing-pending': 'Billing Pending',
  'missed': 'Missed', 'unpaid': 'Unpaid',
  'draft': 'Draft', 'issued': 'Issued', 'paid': 'Paid', 'partial': 'Partial', 'void': 'Void',
  'active': 'Active', 'inactive': 'Inactive',
};
function StatusBadge({ status, children }) {
  return <span className={`badge badge-${status}`}>{children || STATUS_LABEL[status] || status}</span>;
}

// ─── Button ───────────────────────────────────────────────────
function Button({ variant = 'primary', size, icon, onClick, children, disabled, type = 'button', className = '' }) {
  const cls = ['btn', `btn-${variant}`, size ? `btn-${size}` : '', className].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </button>
  );
}

// ─── KPI ──────────────────────────────────────────────────────
function KPI({ label, value, denom, sub, danger, trend, onClick, pills }) {
  return (
    <div className="kpi-card" onClick={onClick}
         style={danger ? { border: '1px solid var(--color-danger-border)' } : undefined}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value" style={danger ? { color: 'var(--color-danger-text)' } : undefined}>
        {value}
        {denom && <span style={{ fontSize: 18, color: 'var(--fg-muted)', fontWeight: 400 }}>{denom}</span>}
      </div>
      {pills ? (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>{pills}</div>
      ) : (
        <div className={trend ? `kpi-trend ${trend}` : 'kpi-sub'} style={danger ? { color: 'var(--color-danger-text)' } : undefined}>{sub}</div>
      )}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────
function EmptyState({ title, message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-illustration float-y">
        <Icon name="file-text" size={56} />
      </div>
      <div className="empty-state-title">{title}</div>
      <div className="empty-state-message">{message}</div>
      {action}
    </div>
  );
}

// ─── AlertBanner ──────────────────────────────────────────────
function AlertBanner({ variant = 'warning', children, action }) {
  return (
    <div className={`alert-banner alert-banner-${variant}`}>
      <Icon name={variant === 'error' ? 'alert-triangle' : variant === 'info' ? 'check-circle' : 'alert-triangle'} size={16} />
      <div style={{ flex: 1 }}>{children}</div>
      {action}
    </div>
  );
}

// ─── AllergyAlert ─────────────────────────────────────────────
function AllergyAlert({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="allergy-alert pulse-twice">
      <span className="allergy-alert-icon"><Icon name="alert-triangle" size={16} /></span>
      <div>
        <div className="allergy-alert-title">Known allergies</div>
        <div className="allergy-alert-items">{items.map((it, i) => <span key={i}>● {it}</span>)}</div>
      </div>
    </div>
  );
}

// ─── PageHeader ───────────────────────────────────────────────
function PageHeader({ title, subtitle, actions, breadcrumb }) {
  return (
    <>
      {breadcrumb}
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">{title}</div>
          {subtitle && <div className="page-subtitle">{subtitle}</div>}
        </div>
        {actions && <div className="page-actions">{actions}</div>}
      </div>
    </>
  );
}

// Export to window so other Babel scripts can pick them up.
Object.assign(window, {
  Icon, Avatar, StatusBadge, Button, KPI, EmptyState, AlertBanner, AllergyAlert,
  PageHeader, STATUS_LABEL,
});
