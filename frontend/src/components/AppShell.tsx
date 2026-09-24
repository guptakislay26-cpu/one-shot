import { NavLink, Outlet } from 'react-router';
import './AppShell.css';

const navigation = [
  { label: 'Dashboard', to: '/app', end: true },
  { label: 'Projects', to: '/app/projects' },
  { label: 'Team', to: '/app/team' },
  { label: 'Billing', to: '/app/billing' },
  { label: 'Settings', to: '/app/settings' },
  { label: 'Audit Log', to: '/app/audit-log' },
  { label: 'Profile', to: '/app/profile' },
];

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return <ul className={mobile ? 'mobile-navigation__links' : 'sidebar__links'}>{navigation.map(({ label, to, end }) => <li key={to}><NavLink className={({ isActive }) => `navigation-link${isActive ? ' navigation-link--active' : ''}`} end={end} to={to}>{label}</NavLink></li>)}</ul>;
}

export function AppShell() {
  return <div className="app-shell">
    <header className="mobile-navigation">
      <NavLink aria-label="LAIO SaaS dashboard" className="brand" end to="/app">LAIO SaaS</NavLink>
      <details><summary aria-label="Open navigation">Menu</summary><nav aria-label="Mobile navigation"><NavigationLinks mobile /></nav></details>
    </header>
    <aside className="sidebar">
      <NavLink aria-label="LAIO SaaS dashboard" className="brand" end to="/app">LAIO SaaS</NavLink>
      <nav aria-label="Main navigation"><NavigationLinks /></nav>
    </aside>
    <main className="app-content"><Outlet /></main>
  </div>;
}
