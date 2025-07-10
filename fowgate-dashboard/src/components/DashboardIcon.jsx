// DashboardIcon.jsx
export default function DashboardIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 512 512"
      fill="none"
      stroke="currentColor"
      strokeWidth="32"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="64" y="64" width="160" height="160" rx="50" ry="50" />
      <rect x="288" y="64" width="160" height="160" rx="50" ry="50" />
      <rect x="64" y="288" width="160" height="160" rx="50" ry="50" />
      <rect x="288" y="288" width="160" height="160" rx="50" ry="50" />
    </svg>
  );
}

