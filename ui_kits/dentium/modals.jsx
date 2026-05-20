// Dentium UI Kit — modals & drawers

const { useState: useModalState, useEffect: useModalEffect } = React;
const D = window.DENTIUM_DATA;

// Generic modal scaffold
function Modal({ open, onClose, title, subtitle, size = '', children, footer }) {
  useModalEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
      <div className={`modal-container ${size ? `modal-container-${size}` : ''}`}>
        <div className="modal-header">
          <div>
            <div className="modal-title">{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>{subtitle}</div>}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// ─── New Appointment modal ────────────────────────────────────
function NewAppointmentModal({ open, onClose, onCreate }) {
  const [patient, setPatient] = useModalState('');
  const [doctor, setDoctor]   = useModalState(D.DOCTORS[0].id);
  const [dept,   setDept]     = useModalState('General Dentistry');
  const [date,   setDate]     = useModalState('17 May 2026');
  const [time,   setTime]     = useModalState('11:30 AM');
  const [duration, setDuration] = useModalState('30 min');
  const [purpose, setPurpose] = useModalState('');

  const submit = () => {
    onCreate && onCreate({ patient, doctor, dept, date, time, duration, purpose });
    onClose && onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="New appointment" subtitle="Fill in the details below" size="lg"
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={submit} disabled={!patient}>Create appointment</Button>
      </>}
    >
      <div className="form-field">
        <label className="field-label">Patient <span className="required">*</span></label>
        <div className="search-wrapper">
          <span className="search-icon"><Icon name="search" size={14} /></span>
          <input className="input" placeholder="Search by name, PID, or phone…" value={patient} onChange={(e) => setPatient(e.target.value)} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-primary)', marginTop: 6, cursor: 'pointer', fontWeight: 500 }}>+ Create new patient</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
        <div className="form-field">
          <label className="field-label">Doctor <span className="required">*</span></label>
          <select className="input" value={doctor} onChange={(e) => setDoctor(e.target.value)}>
            {D.DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name} · {d.dept}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="field-label">Department</label>
          <select className="input" value={dept} onChange={(e) => setDept(e.target.value)}>
            {['General Dentistry','Orthodontics','Endodontics','Periodontics','Oral Surgery','Pediatric Dentistry'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="field-label">Date <span className="required">*</span></label>
          <input className="input" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-field">
          <label className="field-label">Time <span className="required">*</span></label>
          <input className="input" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="form-field">
          <label className="field-label">Duration</label>
          <select className="input" value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option>15 min</option><option>30 min</option><option>45 min</option><option>60 min</option><option>90 min</option>
          </select>
        </div>
        <div className="form-field">
          <label className="field-label">Chair</label>
          <select className="input" defaultValue="Chair 1">
            {D.DOCTORS.map(d => <option key={d.id}>{d.chair}</option>)}
          </select>
        </div>
      </div>
      <div className="form-field" style={{ marginTop: 14 }}>
        <label className="field-label">Purpose</label>
        <input className="input" placeholder="e.g. Routine check-up, Wisdom tooth extraction" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
      </div>
    </Modal>
  );
}

// ─── Record Payment modal ─────────────────────────────────────
function RecordPaymentModal({ open, onClose, invoice }) {
  const [method, setMethod] = useModalState('upi');
  if (!invoice) return null;
  return (
    <Modal open={open} onClose={onClose} title="Record payment"
      subtitle={`${invoice.id} · Balance ₹${invoice.balance.toLocaleString('en-IN')}`}
      footer={<>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onClose}>Record payment</Button>
      </>}
    >
      <div className="form-field">
        <label className="field-label">Amount <span className="required">*</span></label>
        <input className="input" defaultValue={`₹${invoice.balance.toLocaleString('en-IN')}`} />
        <div className="field-hint">Outstanding balance auto-filled. Edit for a part-payment.</div>
      </div>
      <div className="form-field" style={{ marginTop: 14 }}>
        <label className="field-label">Method <span className="required">*</span></label>
        <div className="toggle-group">
          {['upi','cash','card','insurance'].map(m =>
            <button key={m} type="button" className={`toggle-btn ${method === m ? 'active' : ''}`} onClick={() => setMethod(m)}>
              {m === 'upi' ? 'UPI' : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          )}
        </div>
      </div>
      <div className="form-field" style={{ marginTop: 14 }}>
        <label className="field-label">Reference</label>
        <input className="input" placeholder="UPI ref / cheque no. / card last-4" />
      </div>
      <div className="form-field" style={{ marginTop: 14 }}>
        <label className="field-label">Notes</label>
        <textarea className="input" rows="2" placeholder="Optional"></textarea>
      </div>
    </Modal>
  );
}

// ─── Invoice drawer (right slide-in) ─────────────────────────
function InvoiceDrawer({ open, onClose, invoice, onRecordPayment }) {
  if (!invoice) return null;
  const patient = D.getPatient(invoice.patient);
  return (
    <div className={`drawer-overlay ${open ? 'drawer-visible' : ''}`}
         style={{ display: open ? 'flex' : 'none' }}
         onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
      <div className="drawer-panel">
        <div className="drawer-header">
          <div>
            <div className="drawer-title">{invoice.id}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 2 }}>Issued {invoice.date} 2026</div>
          </div>
          <button className="drawer-close" onClick={onClose}>×</button>
        </div>
        <div className="drawer-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <Avatar initials={patient.initials} color={patient.color} size="md" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{patient.name}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{patient.id} · {patient.phone}</div>
            </div>
          </div>

          <div className="info-row"><div className="info-label">Treatments</div><div className="info-value">{invoice.items}</div></div>
          <div className="info-row"><div className="info-label">Billed</div><div className="info-value">₹{invoice.billed.toLocaleString('en-IN')}</div></div>
          <div className="info-row"><div className="info-label">Paid</div><div className="info-value" style={{ color: 'var(--color-success-text)' }}>₹{invoice.paid.toLocaleString('en-IN')}</div></div>
          <div className="info-row"><div className="info-label">Balance</div>
            <div className="info-value" style={{ color: invoice.balance > 0 ? 'var(--color-danger-text)' : 'var(--fg-muted)', fontWeight: invoice.balance > 0 ? 600 : 400 }}>
              {invoice.balance > 0 ? `₹${invoice.balance.toLocaleString('en-IN')}` : '—'}
            </div>
          </div>
          <div className="info-row"><div className="info-label">Status</div><div className="info-value"><StatusBadge status={invoice.status} /></div></div>

          <div style={{ marginTop: 24 }}>
            <div className="t-eyebrow" style={{ marginBottom: 10 }}>Line items</div>
            <table className="aptd-treatment-table">
              <thead><tr><th>Treatment</th><th style={{ textAlign: 'right' }}>Amount</th></tr></thead>
              <tbody>
                {invoice.items.split(', ').map((it, i) => (
                  <tr key={i}><td>{it}</td><td style={{ textAlign: 'right' }}>₹{Math.round(invoice.billed / invoice.items.split(', ').length).toLocaleString('en-IN')}</td></tr>
                ))}
                <tr><td style={{ fontWeight: 600 }}>Total</td><td style={{ textAlign: 'right', fontWeight: 600 }}>₹{invoice.billed.toLocaleString('en-IN')}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="drawer-footer">
          <Button variant="secondary" icon="download">Download PDF</Button>
          {invoice.balance > 0 && <Button variant="primary" onClick={() => onRecordPayment(invoice)}>Record payment</Button>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Modal, NewAppointmentModal, RecordPaymentModal, InvoiceDrawer });
