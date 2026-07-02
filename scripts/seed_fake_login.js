const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL is missing!");
  process.exit(1);
}

async function run() {
  const sql = neon(dbUrl);
  console.log("Checking if fake_login question exists...");
  const existing = await sql`
    SELECT * FROM case_questions 
    WHERE case_id = '04' AND puzzle_key = 'fake_login';
  `;

  if (existing.length > 0) {
    console.log("fake_login question already exists. Updating answer...");
    await sql`
      UPDATE case_questions 
      SET answer = 'neddih', question = 'Fake login administrative password'
      WHERE case_id = '04' AND puzzle_key = 'fake_login';
    `;
  } else {
    console.log("Inserting fake_login question...");
    await sql`
      INSERT INTO case_questions (id, case_id, puzzle_key, question, answer)
      VALUES (gen_random_uuid(), '04', 'fake_login', 'Fake login administrative password', 'neddih');
    `;
  }
  console.log("Seeding successful!");
}

run().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
