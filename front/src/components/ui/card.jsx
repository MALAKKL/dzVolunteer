export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-card text-card-foreground rounded-lg border border-border shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card

