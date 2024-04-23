INSERT INTO Companies (
    id,
    name,
    email,
    emailPass,
    cnpj,
    phone
) VALUES (
    '73681c77-892e-49a6-9315-c1ca6ee01dfe',
    'Oversight',
    'oversight.poster@outlook.com',
    'pokzi1-pagqyp-doqveN',
    12345678000123,
    123456789
);

INSERT INTO MailServices(
    name,
    smtpHost,
    smtpPort
) VALUES (
    'gmail',
    'smtp-relay.gmail.com',
    465
), (
    'outlook',
    'smtp-mail.outlook.com',
    587
);

INSERT INTO Users (
    companyId,
    role,
    name,
    email,
    password
) VALUES (
    '73681c77-892e-49a6-9315-c1ca6ee01dfe',
    'master',
    'Matheus',
    'matvsan@gmail.com',
    '0MmuISrw1hfyaXvCA6BcYkKGxNESFtTWC7hr/X7wLOWFuQsJkfqUOk+22vTk0/HpIJNklSiaVTv1GGTBLZc+5wWy1swI9eXaWPImwZ5N3fQ2IP1AYbqBB9Pu/iJXiNsAh7uwGP1zxAOL+QiLvEhceDGuY4I='
);
