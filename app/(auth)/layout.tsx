export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex items-center h-full">
      {children}
      </div>
    )
  }
  