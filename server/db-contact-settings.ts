import { getPool } from './db';

export type ContactSettings = { email: string; whatsappNumber: string };

async function ensureContactSettingsTable() {
  const pool = await getPool();
  if (!pool) return null;
  await pool.execute(`CREATE TABLE IF NOT EXISTS site_contact_settings (
    id INT NOT NULL PRIMARY KEY,
    email VARCHAR(320) NOT NULL DEFAULT '',
    whatsappNumber VARCHAR(40) NOT NULL DEFAULT '',
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);
  return pool;
}

export async function getContactSettings(): Promise<ContactSettings> {
  const pool = await ensureContactSettingsTable();
  const fallback = { email: process.env.SMTP_TO || process.env.SMTP_USER || '', whatsappNumber: process.env.WHATSAPP_NUMBER || '' };
  if (!pool) return fallback;
  await pool.execute('INSERT IGNORE INTO site_contact_settings (id, email, whatsappNumber) VALUES (1, ?, ?)', [fallback.email, fallback.whatsappNumber]);
  const [rows] = await pool.query('SELECT email, whatsappNumber FROM site_contact_settings WHERE id = 1 LIMIT 1');
  return (rows as ContactSettings[])[0] ?? fallback;
}

export async function updateContactSettings(settings: ContactSettings) {
  const pool = await ensureContactSettingsTable();
  if (!pool) throw new Error('Database unavailable');
  await pool.execute(
    'INSERT INTO site_contact_settings (id, email, whatsappNumber) VALUES (1, ?, ?) ON DUPLICATE KEY UPDATE email = VALUES(email), whatsappNumber = VALUES(whatsappNumber)',
    [settings.email.trim(), settings.whatsappNumber.trim()]
  );
  return getContactSettings();
}
