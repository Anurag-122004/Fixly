export default function Logo({ className = "" }) {
    return (
    <svg className={`h-8 w-auto ${className}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="10" />
    <path
        d="M30 50L45 65L70 40"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    </svg>
)
}

