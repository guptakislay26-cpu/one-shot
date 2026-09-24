import { lazy, StrictMode, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Link, RouterProvider, useParams } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from './components/AppShell';

const Projects = lazy(() => import('./pages/work-orders/ListPage'));

type PageProps = { title: string; description?: string };

function Page({ title, description }: PageProps) {
  useEffect(() => { document.title = `${title} | LAIO SaaS`; }, [title]);
  return <section aria-labelledby="page-title"><h1 id="page-title">{title}</h1>{description && <p>{description}</p>}</section>;
}

function ProjectDetail() {
  const { id } = useParams();
  return <Page title="Project" description={id ? `Viewing project ${id}.` : undefined} />;
}

function TaskDetail() {
  const { id } = useParams();
  return <Page title="Task" description={id ? `Viewing task ${id}.` : undefined} />;
}

function Home() {
  useEffect(() => { document.title = 'LAIO SaaS'; }, []);
  return <main><h1>LAIO SaaS</h1><p>Plan, collaborate, and deliver great work from one place.</p><p><Link to="/signup">Start free</Link> or <Link to="/login">log in</Link>.</p></main>;
}

function NotFound() {
  return <main><Page title="Page not found" description="The page you requested does not exist." /><Link to="/">Return home</Link></main>;
}

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/pricing', element: <Page title="Pricing" description="Choose the LAIO SaaS plan that fits your team." /> },
  { path: '/login', element: <Page title="Log in" description="Log in to your LAIO SaaS workspace." /> },
  { path: '/signup', element: <Page title="Sign up" description="Create your LAIO SaaS account." /> },
  { path: '/onboarding', element: <Page title="Welcome to LAIO SaaS" description="Set up your workspace to get started." /> },
  { path: '/app', element: <AppShell />, children: [
    { index: true, element: <Page title="Dashboard" description="An overview of your workspace." /> },
    { path: 'projects', element: <Projects /> },
    { path: 'projects/new', element: <Page title="New project" description="Create a project for your team." /> },
    { path: 'projects/:id', element: <ProjectDetail /> },
    { path: 'tasks/:id', element: <TaskDetail /> },
    { path: 'team', element: <Page title="Team" description="Manage the people in your workspace." /> },
    { path: 'billing', element: <Page title="Billing" description="Manage your plan and payment details." /> },
    { path: 'settings', element: <Page title="Settings" description="Configure your LAIO SaaS workspace." /> },
    { path: 'audit-log', element: <Page title="Audit Log" description="Review workspace activity." /> },
    { path: 'profile', element: <Page title="Profile" description="Manage your personal details." /> },
  ] },
  { path: '*', element: <NotFound /> },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode><QueryClientProvider client={queryClient}><Suspense fallback={<p>Loading LAIO SaaS…</p>}><RouterProvider router={router} /></Suspense></QueryClientProvider></StrictMode>,
);
