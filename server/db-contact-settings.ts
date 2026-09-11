import { getPool } from './db';

export type ContactSettings = { email: string; whatsappNumber: string; emailBackgroundColor: string; emailTextColor: string; whatsappBackgroundColor: string; whatsappTextColor: string };

const defaults = {
  emailBackgroundColor: '#f5f1e8', emailTextColor: '#17251f',
  whatsappBackgroundColor: '#e5ddce', whatsappTextColor: '#17251f',
};

async function ensureContactSettingsTable() {
  const pool = await getPool();
  if (!pool) return null;
  await pool.execute(`CREATE TABLE IF NOT EXISTS site_contact_settings (
    id INT NOT NULL PRIMARY KEY,
    email VARCHAR(320) NOT NULL DEFAULT '',
    whatsappNumber VARCHAR(40) NOT NULL DEFAULT '',
    emailBackgroundColor VARCHAR(32) NOT NULL DEFAULT '#f5f1e8',
    emailTextColor VARCHAR(32) NOT NULL DEFAULT '#17251f',
    whatsappBackgroundColor VARCHAR(32) NOT NULL DEFAULT '#e5ddce',
    whatsappTextColor VARCHAR(32) NOT NULL DEFAULT '#17251f',
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);
  const [columns] = await pool.query('SHOW COLUMNS FROM site_contact_settings');
  const existing = new Set((columns as Array<{ Field: string }>).map(column => column.Field));
  const additions = [
    ['emailBackgroundColor', '#f5f1e8'], ['emailTextColor', '#17251f'],
    ['whatsappBackgroundColor', '#e5ddce'], ['whatsappTextColor', '#17251f'],
  ];
  for (const [column, value] of additions) if (!existing.has(column)) await pool.execute(`ALTER TABLE site_contact_settings ADD COLUMN ${column} VARCHAR(32) NOT NULL DEFAULT '${value}'`);
  return pool;
}

export async function getContactSettings(): Promise<ContactSettings> {
  const pool = await ensureContactSettingsTable();
  const fallback = { email: process.env.SMTP_TO || process.env.SMTP_USER || '', whatsappNumber: process.env.WHATSAPP_NUMBER || '', ...defaults };
  if (!pool) return fallback;
  await pool.execute('INSERT IGNORE INTO site_contact_settings (id, email, whatsappNumber, emailBackgroundColor, emailTextColor, whatsappBackgroundColor, whatsappTextColor) VALUES (1, ?, ?, ?, ?, ?, ?)', [fallback.email, fallback.whatsappNumber, fallback.emailBackgroundColor, fallback.emailTextColor, fallback.whatsappBackgroundColor, fallback.whatsappTextColor]);
  const [rows] = await pool.query('SELECT email, whatsappNumber, emailBackgroundColor, emailTextColor, whatsappBackgroundColor, whatsappTextColor FROM site_contact_settings WHERE id = 1 LIMIT 1');
  return (rows as ContactSettings[])[0] ?? fallback;
}

export async function updateContactSettings(settings: ContactSettings) {
  const pool = await ensureContactSettingsTable();
  if (!pool) throw new Error('Database unavailable');
  await pool.execute(
    'INSERT INTO site_contact_settings (id, email, whatsappNumber, emailBackgroundColor, emailTextColor, whatsappBackgroundColor, whatsappTextColor) VALUES (1, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE email = VALUES(email), whatsappNumber = VALUES(whatsappNumber), emailBackgroundColor = VALUES(emailBackgroundColor), emailTextColor = VALUES(emailTextColor), whatsappBackgroundColor = VALUES(whatsappBackgroundColor), whatsappTextColor = VALUES(whatsappTextColor)',
    [settings.email.trim(), settings.whatsappNumber.trim(), settings.emailBackgroundColor, settings.emailTextColor, settings.whatsappBackgroundColor, settings.whatsappTextColor]
  );
  return getContactSettings();
}
