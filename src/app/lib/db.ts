import { sql } from '@vercel/postgres';

export async function createUser({ email, username }) {
  try {
    const result = await sql`
      INSERT INTO users (email, username)
      VALUES (${email}, ${username})
      RETURNING id, email, username
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Failed to get user:', error);
    throw error;
  }
}