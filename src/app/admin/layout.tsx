import AdminLayoutDashboard from './AdminLayout'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminLayoutDashboard>
      {children}
    </AdminLayoutDashboard>
  )
}



