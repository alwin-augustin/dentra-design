// Dentium UI Kit — Appointments screen

const { useState: useApptState } = React;
const D_APPT = window.DENTIUM_DATA;

function AppointmentsScreen({ onOpenNewAppointment, onOpenPatient }) {
  const [view, setView] = useApptState('list');
  const [filter, setFilter] = useApptState('today');

  return (
    <>
      <PageHeader
        title="Appointments"
        subtitle="Sunday, 17 May 2026"
        actions={<>
          <div className="segmented-control" style={{ width: 220 }}>
            <button className={`segmented-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>≡ List</button>
            <button className={`segmented-btn ${view === 'day'  ? 'active' : ''}`} onClick={() => setView('day')}>▦ Day</button>
            <button className={`segmented-btn ${view === 'week' ? 'active' : ''}`} onClick={() => setView('week')}>▤ Week</button>
          </div>
          <Button variant="primary" icon="plus" onClick={onOpenNewAppointment}>New Appointment</Button>
        </>}
      />

      <div className="dash-filter-bar" style={{ width: 'fit-content', marginBottom: 16 }}>
        {[['today','Today'],['tomorrow','Tomorrow'],['week','This Week'],['month','This Month'],['all','All']].map(([k, l]) =>
          <button key={k} className={`dash-filter-btn ${filter === k ? 'dash-filter-btn--active' : ''}`} onClick={() => setFilter(k)}>{l}</button>
        )}
        <div style={{ width: 1, height: 18, background: 'var(--color-divider)', margin: '0 6px' }}></div>
        <button className="dash-filter-btn">Doctor ▾</button>
        <button className="dash-filter-btn">Department ▾</button>
        <button className="dash-filter-btn">Status ▾</button>
      </div>

      {view === 'list' && <AppointmentsList onOpenPatient={onOpenPatient} />}
      {view === 'day'  && <AppointmentsDay />}
      {view === 'week' && <EmptyState title="Week view" message="Drag-to-schedule on a 7-day grid. Drops would normally land here." />}
    </>
  );
}

function AppointmentsList({ onOpenPatient }) {
  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>DATE &amp; TIME</th>
            <th>PATIENT</th>
            <th>DOCTOR</th>
            <th>DEPARTMENT</th>
            <th>PURPOSE</th>
            <th>STATUS</th>
            <th>DURATION</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {D_APPT.APPOINTMENTS.map(appt => {
            const p = D_APPT.getPatient(appt.patient);
            const d = D_APPT.getDoctor(appt.doctor);
            return (
              <tr key={appt.id} onClick={() => onOpenPatient(p.id)}>
                <td><div style={{ fontWeight: 500 }}>17 May</div><div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{appt.time}</div></td>
                <td><div className="table-patient-cell">
                  <Avatar initials={p.initials} color={p.color} size="sm" />
                  <div className="table-patient-info">
                    <div className="table-patient-name">{p.name} {p.allergies.length > 0 && <span style={{ color: 'var(--color-allergy-dot)' }}>●</span>}</div>
                    <div className="table-patient-pid">{p.id}</div>
                  </div>
                </div></td>
                <td>{d.name}</td>
                <td>{appt.dept}</td>
                <td style={{ maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{appt.purpose}</td>
                <td><StatusBadge status={appt.status} /></td>
                <td>{appt.duration} min</td>
                <td><div className="table-action-cell"><button className="btn-icon-sm btn btn-ghost-neutral"><Icon name="eye" size={14} /></button><button className="btn-icon-sm btn btn-ghost-neutral"><Icon name="edit" size={14} /></button></div></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="table-pagination">
        <div className="pagination-info">Showing {D_APPT.APPOINTMENTS.length} appointments</div>
        <div className="pagination-controls">
          <button className="page-chip">‹</button>
          <button className="page-chip active">1</button>
          <button className="page-chip">›</button>
        </div>
      </div>
    </div>
  );
}

function AppointmentsDay() {
  // A simplified day-view: time axis 8 → 17, plus a few blocks.
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const blocks = D_APPT.APPOINTMENTS.slice(0, 8).map((a, i) => {
    const [_, hStr, mStr, ampm] = a.time.match(/(\d+):(\d+)\s*(AM|PM)/) || [];
    let h = parseInt(hStr, 10) + (ampm === 'PM' && h !== 12 ? 12 : 0);
    if (ampm === 'PM' && parseInt(hStr, 10) !== 12) h = parseInt(hStr, 10) + 12;
    else h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    const top = (h - 8) * 64 + (m / 60) * 64;
    const height = (a.duration / 60) * 64 - 4;
    const p = D_APPT.getPatient(a.patient);
    return { ...a, top, height, p };
  });
  const colors = {
    'completed': '#C6FFD2', 'in-progress': '#EEF0FE', 'checked-in': '#E8F5E9',
    'scheduled': '#FFE8C6', 'missed': '#FFE4E4', 'billing-pending': '#FFF8E1',
  };
  return (
    <div className="apt-day-container">
      <div className="apt-day-nav">
        <button className="btn-icon-sm btn btn-ghost-neutral"><Icon name="chevron-right" size={14} /></button>
        <div className="apt-day-label">Sunday, 17 May 2026</div>
        <button className="btn btn-secondary btn-sm">Today</button>
        <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--fg-muted)' }}>{D_APPT.APPOINTMENTS.length} appointments · 5 doctors</div>
      </div>
      <div className="apt-day-grid">
        <div className="apt-day-axis" style={{ height: hours.length * 64 }}>
          {hours.map((h, i) => <div key={h} className="apt-day-hour-tick" style={{ top: i * 64 }}>{h > 12 ? `${h - 12} PM` : `${h} AM`}</div>)}
        </div>
        <div className="apt-day-col" style={{ height: hours.length * 64 }}>
          {hours.map((_, i) => <div key={i} className="apt-day-hour-bg" style={{ top: i * 64 }}></div>)}
          {blocks.map(b => (
            <div key={b.id} className="apt-day-block"
                 style={{ top: b.top, height: b.height, left: 8, right: 8, background: colors[b.status] || '#EEF0FE', borderLeftColor: b.p.color }}>
              <div style={{ fontSize: 11, fontWeight: 500 }}>{b.time} · {b.p.name}</div>
              <div style={{ fontSize: 10, color: 'var(--fg-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.purpose}</div>
            </div>
          ))}
          {/* Now-line at 10:45 */}
          <div className="apt-day-now-line" style={{ top: (10 - 8) * 64 + 48 }}><div className="apt-day-now-dot"></div></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AppointmentsScreen });
