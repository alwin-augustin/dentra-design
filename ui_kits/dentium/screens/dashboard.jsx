// Dentium UI Kit — Dashboard screen

const D = window.DENTIUM_DATA;

function DashboardScreen({ onOpenNewAppointment, onOpenPatient, user }) {
  const morning = D.APPOINTMENTS.filter(a => a.time.includes('AM'));
  const afternoon = D.APPOINTMENTS.filter(a => a.time.includes('PM'));
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div className="t-display" style={{ fontSize: 22, fontWeight: 600, color: 'var(--fg-dark)', lineHeight: 1.2 }}>
            {greeting}, {user.firstName}
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 4 }}>Sunday, 17 May 2026</div>
        </div>
        <div className="dash-filter-bar">
          <button className="dash-filter-btn dash-filter-btn--active">Today</button>
          <button className="dash-filter-btn">Yesterday</button>
          <button className="dash-filter-btn">This Week</button>
          <button className="dash-filter-btn">Last Week</button>
          <button className="dash-filter-btn">This Month</button>
        </div>
      </div>

      <AlertBanner variant="warning"
        action={<span style={{ marginLeft: 'auto', fontWeight: 500, cursor: 'pointer', color: 'inherit' }}>View invoices →</span>}>
        <strong style={{ fontWeight: 600 }}>10 invoices pending</strong>
        <span style={{ opacity: 0.6, margin: '0 6px' }}>·</span>
        <span>₹56,200 outstanding</span>
      </AlertBanner>

      <div style={{ display: 'flex', gap: 8, padding: '10px 0 14px', borderBottom: '1px solid var(--color-divider)', marginBottom: 18 }}>
        <Button variant="ghost-neutral" icon="plus" onClick={() => onOpenNewAppointment()}>New Patient</Button>
        <Button variant="ghost-neutral" icon="plus" onClick={() => onOpenNewAppointment()}>New Appointment</Button>
        <Button variant="ghost-neutral" icon="credit-card">Record Payment</Button>
        <Button variant="ghost-neutral" icon="arrow-right">View Reports</Button>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <KPI label="Collections" value={D.KPIS_TODAY.collections.value} sub={D.KPIS_TODAY.collections.sub} />
        <KPI label="Patients" value={D.KPIS_TODAY.patients.value} sub={<>
          <span className="kpi-method-pill kpi-method-returning">↺ 10 Returning</span>
          <span className="kpi-method-pill kpi-method-new" style={{ marginLeft: 4 }}>+1 New</span>
        </>} />
        <KPI danger label="No-shows" value={D.KPIS_TODAY.noShows.value} sub={`▼ ${D.KPIS_TODAY.noShows.sub}`} />
        <KPI label="Occupancy" value={D.KPIS_TODAY.occupancy.value} denom={D.KPIS_TODAY.occupancy.denom}
             pills={<>
               <span className="kpi-method-pill kpi-method-occupied">3 Occupied</span>
               <span className="kpi-method-pill kpi-method-available">2 Free</span>
             </>}/>
      </div>

      <div className="data-table-wrapper" style={{ marginBottom: 24 }}>
        <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-divider)' }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Today's Clinic Flow</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div className="dash-filter-bar" style={{ padding: 2 }}>
              <button className="dash-filter-btn dash-filter-btn--active">All Doctors</button>
              {D.DOCTORS.slice(0, 5).map(d => <button key={d.id} className="dash-filter-btn">{d.name.replace('Dr. ','')}</button>)}
            </div>
            <Button variant="secondary" size="sm">Open Live Clinic</Button>
          </div>
        </div>
        <div className="cf-time-group-header">Morning · {morning.length}</div>
        {morning.slice(0, 5).map(a => <ClinicFlowRow key={a.id} appt={a} onOpenPatient={onOpenPatient} />)}
        <div className="cf-time-group-header">Afternoon · {afternoon.length}</div>
        {afternoon.slice(0, 2).map(a => <ClinicFlowRow key={a.id} appt={a} onOpenPatient={onOpenPatient} />)}
      </div>

      <SectionHeader title="Doctor Overview — Today"
        action={<a className="breadcrumb-link" style={{ fontSize: 12 }}>View All Appointments →</a>} />
      <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        {D.DOCTORS.map((doc, i) => <DoctorChairCard key={doc.id} doctor={doc} index={i} />)}
      </div>
    </>
  );
}

function ClinicFlowRow({ appt, onOpenPatient }) {
  const patient = D.getPatient(appt.patient);
  const doctor = D.getDoctor(appt.doctor);
  return (
    <div className="cf-row" onClick={() => onOpenPatient(patient.id)}>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)', width: 70, flexShrink: 0 }}>{appt.time}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
        <Avatar initials={patient.initials} color={patient.color} size="sm" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{patient.name}</div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{patient.id}</div>
        </div>
      </div>
      <div style={{ fontSize: 13, width: 160, flexShrink: 0 }}>{doctor.name}</div>
      <div style={{ fontSize: 13, color: 'var(--fg-secondary)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{appt.purpose}</div>
      <StatusBadge status={appt.status} />
      {(appt.status === 'checked-in' || appt.status === 'in-progress' || appt.status === 'billing-pending') &&
        <Button variant="secondary" size="sm">Gen. Invoice</Button>}
      <button className="btn-icon-sm btn btn-ghost-neutral" style={{ marginLeft: 4 }}><Icon name="more-horizontal" size={14} /></button>
    </div>
  );
}

function DoctorChairCard({ doctor, index }) {
  // First 2 doctors are "occupied"; rest are available — matches the screenshot.
  const occupied = index < 2;
  const occupiedPatient = index === 0 ? D.getPatient('PAT-00008') : index === 1 ? D.getPatient('PAT-00006') : null;
  const stateLabel = index === 0 ? 'Checked In · 10:30 AM' : index === 1 ? 'In Progress · 10:00 AM' : 'Chair available';
  const completed = [1, 0, 1, 0, 0][index];
  const total = [4, 2, 2, 2, 1][index];
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="doc-chair-card">
      <div className={`doc-chair-strip doc-chair-strip--${occupied ? 'occupied' : 'free'}`}></div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar initials={doctor.initials} color={doctor.color} size="sm" />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doctor.name}</div>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{doctor.dept} · {doctor.chair}</div>
          </div>
        </div>
        {occupied ? (
          <div style={{ marginTop: 10, background: 'rgba(72,69,240,0.05)', border: '1px solid rgba(72,69,240,0.2)', borderRadius: 6, padding: '8px 10px' }}>
            <div style={{ fontSize: 10, color: 'var(--fg-muted)' }}>● {stateLabel}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-dark)', marginTop: 2 }}>{occupiedPatient.name}</div>
          </div>
        ) : (
          <div style={{ marginTop: 10, fontSize: 12, color: 'var(--fg-muted)', height: 42, display: 'flex', alignItems: 'center' }}>● Chair available</div>
        )}
        <div style={{ marginTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--fg-muted)', letterSpacing: 0.5 }}>
            <span>{completed}/{total} COMPLETED</span><span>{pct}%</span>
          </div>
          <div style={{ height: 4, background: 'var(--color-divider)', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'var(--color-primary)' }}></div>
          </div>
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
          {index === 0 && <span className="doc-stat-pill doc-stat-pill--active">2 Active</span>}
          {index === 1 && <><span className="doc-stat-pill doc-stat-pill--active">1 Active</span><span className="doc-stat-pill doc-stat-pill--scheduled">1 Upcoming</span></>}
          {index === 2 && <span className="doc-stat-pill doc-stat-pill--scheduled">1 Upcoming</span>}
          {index === 3 && <><span className="doc-stat-pill doc-stat-pill--scheduled">1 Upcoming</span><span className="doc-stat-pill doc-stat-pill--billing">1 Billing</span></>}
          {index === 4 && <span className="doc-stat-pill doc-stat-pill--scheduled">1 Upcoming</span>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardScreen });
