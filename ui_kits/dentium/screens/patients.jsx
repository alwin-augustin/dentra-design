// Dentium UI Kit — Patients list + Patient detail

const { useState: usePatState } = React;
const D_PAT = window.DENTIUM_DATA;

function PatientsScreen({ onOpenPatient }) {
  const [q, setQ] = usePatState('');
  const filtered = D_PAT.PATIENTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase()) || p.phone.includes(q));

  return (
    <>
      <PageHeader
        title="Patients"
        subtitle={`${D_PAT.PATIENTS.length} active patients`}
        actions={<>
          <Button variant="secondary" icon="filter">Filters</Button>
          <Button variant="primary" icon="plus">New Patient</Button>
        </>}
      />

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <div className="search-wrapper" style={{ flex: 1, maxWidth: 380 }}>
          <span className="search-icon"><Icon name="search" size={14} /></span>
          <input className="input" placeholder="Search by name, PID, or phone…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="filter-bar" style={{ marginBottom: 0 }}>
          <div className="filter-chip">Department ▾</div>
          <div className="filter-chip">Last visit ▾</div>
          <div className="filter-chip">Has allergies</div>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>PATIENT</th><th>SEX · AGE</th><th>PHONE</th><th>EMAIL</th>
              <th>ALLERGIES</th><th>CONDITIONS</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} onClick={() => onOpenPatient(p.id)}>
                <td><div className="table-patient-cell">
                  <Avatar initials={p.initials} color={p.color} size="sm" />
                  <div className="table-patient-info">
                    <div className="table-patient-name">{p.name}</div>
                    <div className="table-patient-pid">{p.id}</div>
                  </div>
                </div></td>
                <td>{p.sex} · {p.age}</td>
                <td>{p.phone}</td>
                <td style={{ color: 'var(--fg-secondary)' }}>{p.email}</td>
                <td>{p.allergies.length > 0 ? <span style={{ color: 'var(--color-allergy-dot)' }}>● {p.allergies.length}</span> : <span style={{ color: 'var(--fg-muted)' }}>—</span>}</td>
                <td>{p.conditions.length > 0 ? p.conditions.map(c => c.name).join(', ') : <span style={{ color: 'var(--fg-muted)' }}>—</span>}</td>
                <td><div className="table-action-cell"><button className="btn-icon-sm btn btn-ghost-neutral"><Icon name="eye" size={14} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-pagination">
          <div className="pagination-info">Showing {filtered.length} of {D_PAT.PATIENTS.length}</div>
          <div className="pagination-controls">
            <button className="page-chip active">1</button>
            <button className="page-chip">2</button>
          </div>
        </div>
      </div>
    </>
  );
}

function PatientDetailScreen({ patientId, onBack }) {
  const [tab, setTab] = usePatState('timeline');
  const p = D_PAT.getPatient(patientId);
  if (!p) return null;
  const timeline = (D_PAT.TIMELINE.find(t => t.patientId === patientId) || { items: [] }).items;
  const treatmentPlan = D_PAT.TREATMENT_PLANS.find(t => t.patientId === patientId);
  const prescriptions = D_PAT.PRESCRIPTIONS.filter(r => r.patientId === patientId);
  const invoices = D_PAT.INVOICES.filter(i => i.patient === patientId);

  return (
    <>
      <Breadcrumb items={[
        { label: 'Patients', onClick: onBack },
        { label: p.name },
      ]} />

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>
        {/* ─── Left rail ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="aptd-patient-card">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Avatar initials={p.initials} color={p.color} size="xl" />
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>{p.name}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
                <span className="pill" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{p.id}</span>
                <span className="badge badge-active">Active</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 8 }}>
                {p.sex} · {p.age} yrs · {p.blood}
              </div>
            </div>
          </div>

          <AllergyAlert items={p.allergies} />

          {p.conditions.length > 0 && (
            <div className="aptd-meta-card">
              <div className="t-eyebrow" style={{ marginBottom: 8 }}>Medical conditions</div>
              {p.conditions.map((c, i) => (
                <div key={i} style={{ paddingTop: i > 0 ? 10 : 0, paddingBottom: 10, borderBottom: i < p.conditions.length - 1 ? '1px solid var(--color-divider)' : 'none' }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name} <span className="badge badge-confirmed" style={{ marginLeft: 4, fontSize: 10 }}>Active</span></div>
                  <div style={{ fontSize: 12, color: 'var(--fg-secondary)', marginTop: 2 }}>{c.note}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>Since {c.since}</div>
                </div>
              ))}
            </div>
          )}

          <div className="aptd-meta-card">
            <div className="t-eyebrow" style={{ marginBottom: 10 }}>Contact</div>
            <div style={{ fontSize: 13, marginBottom: 10 }}>{p.phone}</div>
            <div className="t-eyebrow" style={{ marginBottom: 6 }}>Email</div>
            <div style={{ fontSize: 13, color: 'var(--fg-secondary)', wordBreak: 'break-all' }}>{p.email}</div>
          </div>
        </div>

        {/* ─── Right content ─── */}
        <div>
          {treatmentPlan && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div className="t-eyebrow">Active treatment plans · <span style={{ color: 'var(--color-success-text)', textTransform: 'none', letterSpacing: 0 }}>1 active</span></div>
                <a className="breadcrumb-link" style={{ fontSize: 12, fontWeight: 500 }}>+ New Plan</a>
              </div>
              <div className="tp-card">
                <div className="tp-card-header">
                  <div>
                    <div className="tp-title">{treatmentPlan.title}</div>
                    <div className="tp-doctor">{treatmentPlan.doctor} · {treatmentPlan.procedures.length} sessions</div>
                  </div>
                  <span className="badge badge-confirmed">{treatmentPlan.status}</span>
                </div>
                <div className="tp-procedures">
                  {treatmentPlan.procedures.map((proc, i) => (
                    <span key={i} className={`tp-procedure-chip ${proc.done ? 'done' : ''}`}>{proc.name}</span>
                  ))}
                </div>
                <div className="tp-progress-bar">
                  <div className="tp-progress-fill" style={{ width: `${(treatmentPlan.procedures.filter(p => p.done).length / treatmentPlan.procedures.length) * 100}%` }}></div>
                </div>
                <div className="tp-financials">
                  <div className="tp-financial-row">
                    <span>Est. ₹{treatmentPlan.est.toLocaleString('en-IN')}</span>
                    <span>Paid ₹{treatmentPlan.paid.toLocaleString('en-IN')}</span>
                    <span className="tp-outstanding">Due ₹{treatmentPlan.balance.toLocaleString('en-IN')}</span>
                  </div>
                  <a className="breadcrumb-link" style={{ fontSize: 12, fontWeight: 500 }}>Book Next Session →</a>
                </div>
              </div>
            </div>
          )}

          <div className="tab-bar">
            {[
              ['timeline','Visit Timeline', timeline.length],
              ['rx','Prescriptions', prescriptions.length],
              ['invoices','Invoices', invoices.length],
              ['files','Files', 1],
            ].map(([k, l, c]) => (
              <button key={k} className={`tab-btn ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>
                {l} <span className="tab-count">{c}</span>
              </button>
            ))}
          </div>

          <div style={{ padding: '18px 0' }}>
            {tab === 'timeline' && <PatientTimeline items={timeline} />}
            {tab === 'rx'       && <PatientPrescriptions items={prescriptions} />}
            {tab === 'invoices' && <PatientInvoices items={invoices} />}
            {tab === 'files'    && <EmptyState title="No files yet" message="Upload X-rays, OPGs, and consent forms. Drag a PDF or image here." action={<Button variant="primary" icon="plus">Upload file</Button>} />}
          </div>
        </div>
      </div>
    </>
  );
}

function PatientTimeline({ items }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>2026</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} className="aptd-meta-card" style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div className="status-dot" style={{ marginTop: 6, background: it.status === 'completed' ? '#10973E' : it.status === 'missed' ? '#CC1414' : '#9B9DA3' }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{it.title}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 4 }}>{it.date} · {it.doctor}</div>
              </div>
              <StatusBadge status={it.status} />
              <button className="btn-icon-sm btn btn-ghost-neutral"><Icon name="chevron-down" size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientPrescriptions({ items }) {
  if (items.length === 0) return <EmptyState title="No prescriptions yet" message="Prescriptions you write during visits will show up here." />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {items.map(rx => (
        <div key={rx.id} className="aptd-rx-card">
          <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-divider)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{rx.diagnosis}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{rx.date} · {rx.doctor}</div>
            </div>
            <Button variant="secondary" size="sm" icon="eye">View</Button>
          </div>
          <table className="aptd-treatment-table">
            <thead><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th><th>Instructions</th></tr></thead>
            <tbody>
              {rx.items.map((item, i) => (
                <tr key={i}><td>{item.medicine}</td><td>{item.dosage}</td><td>{item.frequency}</td><td>{item.duration}</td><td style={{ color: 'var(--fg-secondary)' }}>{item.instructions}</td></tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '12px 16px', fontSize: 12, color: 'var(--fg-secondary)' }}>
            <strong style={{ fontWeight: 600, color: 'var(--fg-primary)' }}>Notes:</strong> {rx.notes}
          </div>
        </div>
      ))}
    </div>
  );
}

function PatientInvoices({ items }) {
  if (items.length === 0) return <EmptyState title="No invoices" message="Invoices generated for this patient will show up here." />;
  return (
    <div className="data-table-wrapper" style={{ boxShadow: 'none', border: '1px solid var(--color-divider)' }}>
      <table className="data-table">
        <thead><tr><th>INVOICE #</th><th>DATE</th><th>TREATMENTS</th><th>BILLED</th><th>PAID</th><th>BALANCE</th><th>STATUS</th></tr></thead>
        <tbody>
          {items.map(inv => (
            <tr key={inv.id}>
              <td style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{inv.id}</td>
              <td>{inv.date}</td>
              <td>{inv.items}</td>
              <td>₹{inv.billed.toLocaleString('en-IN')}</td>
              <td style={{ color: 'var(--color-success-text)' }}>₹{inv.paid.toLocaleString('en-IN')}</td>
              <td>{inv.balance > 0 ? `₹${inv.balance.toLocaleString('en-IN')}` : <span style={{ color: 'var(--fg-muted)' }}>—</span>}</td>
              <td><StatusBadge status={inv.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Object.assign(window, { PatientsScreen, PatientDetailScreen });
