// Dentium UI Kit — Billing / Invoices screen

const { useState: useBillState } = React;
const D_BILL = window.DENTIUM_DATA;

function BillingScreen({ onOpenInvoice }) {
  const [statusFilter, setStatusFilter] = useBillState('all');
  const invoices = D_BILL.INVOICES.filter(i => statusFilter === 'all' || i.status === statusFilter);

  const totals = D_BILL.INVOICES.reduce((acc, i) => {
    acc.billed += i.billed; acc.paid += i.paid; acc.bal += i.balance;
    acc.by[i.status] = (acc.by[i.status] || 0) + 1;
    return acc;
  }, { billed: 0, paid: 0, bal: 0, by: {} });

  return (
    <>
      <PageHeader title="Invoices"
        actions={<Button variant="secondary" icon="download">Export CSV</Button>} />

      <div className="card" style={{ padding: 22, marginBottom: 20, display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <div className="t-eyebrow">Total billed</div>
          <div style={{ fontSize: 28, fontWeight: 500, marginTop: 4 }}>₹{totals.billed.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>across {D_BILL.INVOICES.length} invoices</div>
        </div>
        <div>
          <div className="t-eyebrow">Collected</div>
          <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--color-success-text)', marginTop: 4 }}>₹{totals.paid.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>Collection rate: {Math.round((totals.paid / totals.billed) * 100)}%</div>
        </div>
        <div>
          <div className="t-eyebrow">Outstanding</div>
          <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--color-danger-text)', marginTop: 4 }}>₹{totals.bal.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>Pending collection</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: 280 }}>
          <span className="badge badge-issued">{totals.by['issued'] || 0} Issued</span>
          <span className="badge badge-paid">{totals.by['paid'] || 0} Paid</span>
          <span className="badge badge-partial">{totals.by['partial'] || 0} Partial</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
        <button className="filter-chip" onClick={() => setStatusFilter('all')}     style={statusFilter === 'all'    ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', fontWeight: 500 } : {}}>Status: All</button>
        <button className="filter-chip" onClick={() => setStatusFilter('issued')}  style={statusFilter === 'issued' ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', fontWeight: 500 } : {}}>Issued</button>
        <button className="filter-chip" onClick={() => setStatusFilter('paid')}    style={statusFilter === 'paid'   ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', fontWeight: 500 } : {}}>Paid</button>
        <button className="filter-chip" onClick={() => setStatusFilter('partial')} style={statusFilter === 'partial' ? { borderColor: 'var(--color-primary)', color: 'var(--color-primary)', fontWeight: 500 } : {}}>Partial</button>
        <button className="filter-chip">Doctor ▾</button>
        <div className="filter-result-count">{invoices.length} invoices</div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>INVOICE #</th><th>PATIENT</th><th>DATE</th><th>TREATMENTS</th>
              <th>BILLED</th><th>PAID</th><th>BALANCE</th><th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => {
              const p = D_BILL.getPatient(inv.patient);
              return (
                <tr key={inv.id} onClick={() => onOpenInvoice(inv)}>
                  <td style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{inv.id}</td>
                  <td><div className="table-patient-cell">
                    <Avatar initials={p.initials} color={p.color} size="sm" />
                    <div className="table-patient-info">
                      <div className="table-patient-name">{p.name}</div>
                      <div className="table-patient-pid">{p.id}</div>
                    </div>
                  </div></td>
                  <td>{inv.date}</td>
                  <td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.items}</td>
                  <td>₹{inv.billed.toLocaleString('en-IN')}</td>
                  <td style={{ color: 'var(--color-success-text)' }}>₹{inv.paid.toLocaleString('en-IN')}</td>
                  <td>{inv.balance > 0 ? `₹${inv.balance.toLocaleString('en-IN')}` : <span style={{ color: 'var(--fg-muted)' }}>—</span>}</td>
                  <td><StatusBadge status={inv.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="table-pagination">
          <div className="pagination-info">Showing 1–{invoices.length} of {D_BILL.INVOICES.length}</div>
          <div className="pagination-controls">
            <button className="page-chip">‹</button>
            <button className="page-chip active">1</button>
            <button className="page-chip">2</button>
            <button className="page-chip">›</button>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { BillingScreen });
