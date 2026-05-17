export function AdminCmsAlert({ message }: { message: string }) {
  return (
    <p className="admin-error" role="alert" style={{ marginBottom: "var(--space-lg)" }}>
      {message}
    </p>
  );
}
