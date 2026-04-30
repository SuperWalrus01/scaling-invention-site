export default function Section({ children, className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
}
