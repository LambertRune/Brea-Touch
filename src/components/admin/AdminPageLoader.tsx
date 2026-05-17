export function AdminPageLoader({ label = "Laden…" }: { label?: string }) {
  return (
    <div className="admin-page-loader" role="status" aria-live="polite" aria-busy="true">
      <span className="admin-page-loader__spinner" aria-hidden />
      <p>{label}</p>
    </div>
  );
}
