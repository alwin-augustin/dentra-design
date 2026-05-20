// Dentium UI Kit — root app

const { useState: useAppState } = React;
const D_APP = window.DENTIUM_DATA;

const USER = {
  initials: 'KM',
  firstName: 'Karan',
  name: 'Karan Malhotra',
  role: 'SUPER ADMIN',
};

function App() {
  const [route, setRoute] = useAppState({ screen: 'dashboard' }); // { screen, patientId? }
  const [newApptOpen, setNewApptOpen] = useAppState(false);
  const [activeInvoice, setActiveInvoice] = useAppState(null);
  const [paymentInvoice, setPaymentInvoice] = useAppState(null);
  const [toast, setToast] = useAppState(null);

  const navigate = (screen, extra = {}) => setRoute({ screen, ...extra });
  const openPatient = (patientId) => setRoute({ screen: 'patient-detail', patientId });

  const showToast = (msg, variant = 'success') => {
    setToast({ msg, variant });
    setTimeout(() => setToast(null), 2600);
  };

  const titles = {
    dashboard: 'Dashboard', 'live-clinic': 'Live Clinic', appointments: 'Appointments',
    patients: 'Patients', 'patient-detail': 'Patient Detail', billing: 'Invoices',
    reports: 'Reports', settings: 'Settings',
  };

  return (
    <>
      <Sidebar current={route.screen === 'patient-detail' ? 'patients' : route.screen}
               onNavigate={navigate} user={USER} />
      <TopHeader title={titles[route.screen] || ''} />
      <div className="main-area">
        <div id="outlet" data-screen-label={titles[route.screen]}>
          {route.screen === 'dashboard'    && <DashboardScreen user={USER}
              onOpenNewAppointment={() => setNewApptOpen(true)}
              onOpenPatient={openPatient} />}
          {route.screen === 'appointments' && <AppointmentsScreen
              onOpenNewAppointment={() => setNewApptOpen(true)}
              onOpenPatient={openPatient} />}
          {route.screen === 'patients'     && <PatientsScreen onOpenPatient={openPatient} />}
          {route.screen === 'patient-detail' && <PatientDetailScreen patientId={route.patientId} onBack={() => navigate('patients')} />}
          {route.screen === 'billing'      && <BillingScreen onOpenInvoice={(inv) => setActiveInvoice(inv)} />}
          {(route.screen === 'live-clinic' || route.screen === 'reports' || route.screen === 'settings') &&
            <ComingSoonScreen name={titles[route.screen]} />}
        </div>
      </div>

      {/* Modals & drawers */}
      <NewAppointmentModal open={newApptOpen} onClose={() => setNewApptOpen(false)}
        onCreate={() => showToast('Appointment created')} />
      <InvoiceDrawer open={!!activeInvoice} invoice={activeInvoice}
        onClose={() => setActiveInvoice(null)}
        onRecordPayment={(inv) => { setPaymentInvoice(inv); setActiveInvoice(null); }} />
      <RecordPaymentModal open={!!paymentInvoice} invoice={paymentInvoice}
        onClose={() => { setPaymentInvoice(null); showToast('Payment recorded'); }} />

      {/* Toasts */}
      <div id="toast-container">
        {toast && (
          <div className={`toast toast-${toast.variant}`}>
            <span className="toast-icon"><Icon name="check-circle" size={16} /></span>
            <span className="toast-message">{toast.msg}</span>
          </div>
        )}
      </div>
    </>
  );
}

function ComingSoonScreen({ name }) {
  return (
    <>
      <PageHeader title={name} />
      <EmptyState
        title={`${name} — Not in this kit`}
        message={`The ${name} surface is a dense bespoke screen (live chair lanes, charts, settings forms) that doesn't reuse the components in this kit. Open the source app to see it in context, or extend this kit.`}
        action={<Button variant="secondary">View source screenshot</Button>}
      />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
