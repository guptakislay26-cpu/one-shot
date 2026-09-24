export type ResolvedTenant = {
  id: string;
  slug: string;
  name: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'DISABLED' | 'DELETED';
  databaseUrl: string;
};
