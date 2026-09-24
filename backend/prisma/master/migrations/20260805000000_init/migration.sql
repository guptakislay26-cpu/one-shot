CREATE TYPE tenant_status AS ENUM ('ACTIVE', 'SUSPENDED', 'DISABLED', 'DELETED');

CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  status tenant_status NOT NULL DEFAULT 'ACTIVE',
  db_host text NOT NULL,
  db_name text NOT NULL,
  db_user text NOT NULL,
  db_password text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE active_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  user_id text NOT NULL,
  expires_at timestamptz NOT NULL
);
CREATE INDEX active_sessions_tenant_id_idx ON active_sessions(tenant_id);

CREATE TABLE tenant_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  action text NOT NULL,
  actor_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX tenant_audit_logs_tenant_id_idx ON tenant_audit_logs(tenant_id);

CREATE TABLE tenant_backups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  object_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX tenant_backups_tenant_id_idx ON tenant_backups(tenant_id);
