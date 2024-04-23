CREATE DATABASE Oversight WITH OWNER postgres ALLOW_CONNECTIONS=true;

CREATE TABLE IF NOT EXISTS Companies (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name varchar(64),
    email varchar(128) UNIQUE NOT NULL,
    emailPass text default null,
    cnpj bigint UNIQUE NOT NULL,
    phone bigint default null,
    createdAt TIMESTAMP not null default NOW(),
    updatedAt TIMESTAMP not null default NOW(),
    PRIMARY KEY (id)
);
CREATE INDEX idx_company_id ON Companies(id);

CREATE TYPE userRoles AS ENUM('master', 'admin', 'basic');
CREATE TABLE IF NOT EXISTS Users (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    companyId uuid NOT NULL,
    role userRoles default 'basic',
    name varchar(64) NOT NULL,
    email varchar(128) UNIQUE NOT NULL,
    password text NOT NULL,
    createdAt TIMESTAMP not null default NOW(),
    updatedAt TIMESTAMP not null default NOW(),
    FOREIGN KEY (companyId) REFERENCES Companies(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);
CREATE INDEX idx_user_id ON Users(id);

CREATE TABLE IF NOT EXISTS Customers(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    companyId uuid NOT NULL,
    name varchar(64) NOT NULL,
    email varchar(128) NOT NULL,
    phone bigint default null,
    createdBy uuid,
    createdAt TIMESTAMP not null default NOW(),
    updatedAt TIMESTAMP not null default NOW(),
    FOREIGN KEY (createdBy) REFERENCES Users(id),
    FOREIGN KEY (companyId) REFERENCES Companies(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);
CREATE INDEX idx_customer_id ON Customers(id);

CREATE TABLE IF NOT EXISTS Addresses(
    customerId uuid NOT NULL,
    cep bigint NOT NULL,
    street varchar(256) NOT NULL,
    number int NOT NULL,
    complement varchar(64) default null,
    FOREIGN KEY (customerId) REFERENCES Customers(id) ON DELETE CASCADE,
    PRIMARY KEY (customerId)
);
CREATE INDEX idx_customer_address ON Addresses(customerId);

CREATE TYPE mesureUnits AS ENUM('m', 'm2', 'm3', 'ml', 'l', 'hour', 'day', 'week', 'month');
CREATE TYPE serviceTypes AS ENUM('service', 'good');
CREATE TABLE IF NOT EXISTS Services(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    companyId uuid NOT NULL,
    name varchar(128) NOT NULL,
    description text default null,
    mesureUnit mesureUnits NOT NULL,
    value real NOT NULL,
    type serviceTypes NOT NULL,
    errorMargin int default 0,
    createdBy uuid,
    createdAt TIMESTAMP not null default NOW(),
    updatedAt TIMESTAMP not null default NOW(),
    FOREIGN KEY (createdBy) REFERENCES Users(id),
    FOREIGN KEY (companyId) REFERENCES Companies(id) ON DELETE CASCADE,
    PRIMARY KEY (id),
    CONSTRAINT valid_margin CHECK (errorMargin >= 0 AND errorMargin <= 100)
);
CREATE INDEX idx_service_id ON Services(id);

CREATE TYPE budgetStatus AS ENUM('budgeting', 'awaiting', 'approved', 'denied', 'executing', 'done');
CREATE TABLE IF NOT EXISTS Budgets(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    companyId uuid NOT NULL,
    customerId uuid NOT NULL,
    name varchar(64) NOT NULL,
    description text default null,
    incomingMargin int default 7,
    status budgetStatus default 'budgeting',
    statusMessage text default null,
    createdBy uuid,
    createdAt TIMESTAMP not null default NOW(),
    updatedAt TIMESTAMP not null default NOW(),
    FOREIGN KEY (customerId) REFERENCES Customers(id) ON DELETE CASCADE,
    FOREIGN KEY (createdBy) REFERENCES Users(id),
    FOREIGN KEY (companyId) REFERENCES Companies(id) ON DELETE CASCADE,
    PRIMARY KEY (id),
    CONSTRAINT valid_margin CHECK (incomingMargin >= 0 AND incomingMargin <= 100)
);
CREATE INDEX idx_budgets_id ON Budgets(id);

CREATE TABLE IF NOT EXISTS BudgetServices(
    budgetId uuid NOT NULL,
    serviceId uuid,
    quantity int default 1,
    budgetedUnitValue real NOT NULL,
    createdBy uuid,
    createdAt TIMESTAMP not null default NOW(),
    updatedAt TIMESTAMP not null default NOW(),
    FOREIGN KEY (createdBy) REFERENCES Users(id),
    FOREIGN KEY (serviceId) REFERENCES Services(id),
    FOREIGN KEY (budgetId) REFERENCES Budgets(id) ON DELETE CASCADE,
    PRIMARY KEY (budgetId, serviceId),
    CONSTRAINT valid_quantity CHECK (quantity > 0)
);
CREATE INDEX idx_budget_service ON BudgetServices(budgetId, serviceId);

CREATE TABLE IF NOT EXISTS MailServices (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name varchar(32) not null,
    smtpHost varchar(128) not null,
    smtpPort int not null,
    PRIMARY KEY (id)
);
CREATE INDEX idx_mail_service_service ON MailServices(id);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
      NEW.updatedAt = now();
      RETURN NEW;
   ELSE
      RETURN OLD;
   END IF;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_company_modtime BEFORE UPDATE ON Companies FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_user_modtime BEFORE UPDATE ON Users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_customer_modtime BEFORE UPDATE ON Customers FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_service_modtime BEFORE UPDATE ON Services FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_budget_modtime BEFORE UPDATE ON Budgets FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_budget_service_modtime BEFORE UPDATE ON BudgetServices FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
