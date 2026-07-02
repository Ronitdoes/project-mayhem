const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL is missing!");
  process.exit(1);
}

const seedQuestions = [
  // --- STAGE 1: SEAL REVEAL ---
  {
    puzzle_key: "seal_reveal_scarab",
    question: "Identify the seal showing a sacred beetle: 𓆣",
    answer: "Scarab Beetle"
  },
  {
    puzzle_key: "seal_reveal_uraeus",
    question: "Identify the seal showing a sacred cobra: 𓆗",
    answer: "Uraeus Cobra"
  },
  {
    puzzle_key: "seal_reveal_eye",
    question: "Identify the seal showing the protective eye: 𓂀",
    answer: "Eye of Horus"
  },

  // --- STAGE 2: TECH QUIZ ---
  {
    puzzle_key: "tech_quiz_1",
    question: JSON.stringify({
      text: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Personal Unit", "Central Processor Unifier"]
    }),
    answer: "Central Processing Unit"
  },
  {
    puzzle_key: "tech_quiz_2",
    question: JSON.stringify({
      text: "Which of these is a database management system?",
      options: ["HTML", "CSS", "PostgreSQL", "JavaScript"]
    }),
    answer: "PostgreSQL"
  },
  {
    puzzle_key: "tech_quiz_3",
    question: JSON.stringify({
      text: "What is the main function of a router?",
      options: [
        "To power the local computer network",
        "To forward data packets between different computer networks",
        "To store static files for web servers",
        "To compile database query statements"
      ]
    }),
    answer: "To forward data packets between different computer networks"
  },
  {
    puzzle_key: "tech_quiz_4",
    question: JSON.stringify({
      text: "Which protocol is used to secure communication over the web?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"]
    }),
    answer: "HTTPS"
  },
  {
    puzzle_key: "tech_quiz_5",
    question: JSON.stringify({
      text: "What does RAM stand for?",
      options: ["Read Access Memory", "Random Access Memory", "Rapid Action Module", "Run Active Memory"]
    }),
    answer: "Random Access Memory"
  },
  {
    puzzle_key: "tech_quiz_6",
    question: JSON.stringify({
      text: "What is the standard language used to style web pages?",
      options: ["HTML", "CSS", "SQL", "Python"]
    }),
    answer: "CSS"
  },
  {
    puzzle_key: "tech_quiz_7",
    question: JSON.stringify({
      text: "Which company developed the Android operating system?",
      options: ["Apple", "Microsoft", "Google", "Nokia"]
    }),
    answer: "Google"
  },
  {
    puzzle_key: "tech_quiz_8",
    question: JSON.stringify({
      text: "What is the name of the creator of Python programming language?",
      options: ["Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup", "James Gosling"]
    }),
    answer: "Guido van Rossum"
  },
  {
    puzzle_key: "tech_quiz_9",
    question: JSON.stringify({
      text: "In programming, what is a variable used for?",
      options: ["Performing mathematical division", "Storing data values", "Displaying images on the web", "Connecting to a database server"]
    }),
    answer: "Storing data values"
  },
  {
    puzzle_key: "tech_quiz_10",
    question: JSON.stringify({
      text: "Which file format is commonly used to compress images on the web?",
      options: ["TXT", "PDF", "JPEG", "MP3"]
    }),
    answer: "JPEG"
  },

  // --- STAGE 3: TOMB BUILDER ---
  {
    puzzle_key: "tomb_builder_1",
    question: JSON.stringify({ name: "The Basic Mastaba", grid: [[0,0,0],[0,3,0],[1,1,1]] }),
    answer: "0,0,0|0,3,0|1,1,1"
  },
  {
    puzzle_key: "tomb_builder_2",
    question: JSON.stringify({ name: "The Double Pillars", grid: [[0,0,0],[2,0,2],[1,1,1]] }),
    answer: "0,0,0|2,0,2|1,1,1"
  },
  {
    puzzle_key: "tomb_builder_3",
    question: JSON.stringify({ name: "The Sanctuary", grid: [[0,4,0],[0,3,0],[1,1,1]] }),
    answer: "0,4,0|0,3,0|1,1,1"
  },
  {
    puzzle_key: "tomb_builder_4",
    question: JSON.stringify({ name: "The Royal Tomb", grid: [[0,4,0],[2,3,2],[1,1,1]] }),
    answer: "0,4,0|2,3,2|1,1,1"
  },
  {
    puzzle_key: "tomb_builder_5",
    question: JSON.stringify({ name: "The Twin Chambers", grid: [[0,0,0],[3,0,3],[1,1,1]] }),
    answer: "0,0,0|3,0,3|1,1,1"
  },
  {
    puzzle_key: "tomb_builder_6",
    question: JSON.stringify({ name: "The Capstone Tower", grid: [[0,4,0],[0,2,0],[1,1,1]] }),
    answer: "0,4,0|0,2,0|1,1,1"
  },
  {
    puzzle_key: "tomb_builder_7",
    question: JSON.stringify({ name: "The Grand Temple", grid: [[4,0,4],[2,3,2],[1,1,1]] }),
    answer: "4,0,4|2,3,2|1,1,1"
  },

  // --- STAGE 4: PAPYRUS RESTORE ---
  {
    puzzle_key: "papyrus_restore",
    question: JSON.stringify([
      "I am Osiris, the lord of eternity, who rules the underworld.",
      "I have traversed the dark rivers of the Duat to reach the hall of Ma'at.",
      "My heart has been weighed against the feather of truth and found pure.",
      "Now, I speak the words of power to open the golden gates of the east.",
      "Let the sun god Ra arise and cast his eternal light upon the sands."
    ]),
    answer: "0,1,2,3,4"
  },

  // --- STAGE 5: PRESSURE PLATES ---
  {
    puzzle_key: "pressure_plates_1",
    question: "Walk the path of creation: Drink from the river (🌊), bask in the solar fire (☉), ascend to the celestial star (⭐), receive the wisdom of the serpent (𓆗), and finally stand upon the eternal mountain (⛰️).",
    answer: "🌊,☉,⭐,𓆗,⛰️"
  },
  {
    puzzle_key: "pressure_plates_2",
    question: "The hunt begins under the silver moon (☽). The silent owl (𓅓) watches from above, as the sacred cat (𓃠) stalks through the temple shadows.",
    answer: "☽,𓅓,𓃠"
  },
  {
    puzzle_key: "pressure_plates_3",
    question: "Balance the primal elements: Quench the earth with the river (🌊), ignite the sacred fire (🔥), shape the mighty mountain (⛰️), and rise to meet the eternal sun (☉).",
    answer: "🌊,🔥,⛰️,☉"
  },
  {
    puzzle_key: "pressure_plates_4",
    question: "The golden sun (☉) rises high, followed by the flight of the solar owl (𓅓) as it ascends to the highest star (⭐).",
    answer: "☉,𓅓,⭐"
  },
  {
    puzzle_key: "pressure_plates_5",
    question: "The serpent (𓆗) crawls through the hot ashes of the fire (🔥), slides into the cool waters (🌊), and rests beneath the crescent moon (☽).",
    answer: "𓆗,🔥,🌊,☽"
  },
  {
    puzzle_key: "pressure_plates_6",
    question: "The earth mountain (⛰️) cracks open with volcanic fire (🔥), before it is cooled by the waters (🌊) of the Nile.",
    answer: "⛰️,🔥,🌊"
  },
  {
    puzzle_key: "pressure_plates_7",
    question: "First shines the distant star (⭐) beside the shining moon (☽). The cat (𓃠) leaps, guided by the silent flight of the owl (𓅓).",
    answer: "⭐,☽,𓃠,𓅓"
  },
  {
    puzzle_key: "pressure_plates_8",
    question: "Combine the cosmos: Ignite the flames (🔥), pour the river (🌊), align the golden sun (☉) with the silver moon (☽), and invoke the eternal star (⭐).",
    answer: "🔥,🌊,☉,☽,⭐"
  },
  {
    puzzle_key: "pressure_plates_9",
    question: "The guardian owl (𓅓) speaks to the royal cobra (𓆗). The sacred cat (𓃠) guides the spirit to the tombs of the eternal mountain (⛰️).",
    answer: "𓅓,𓆗,𓃠,⛰️"
  },

  // --- STAGE 6: SPELL MAKING ---
  {
    puzzle_key: "spell_making_1",
    question: "FIREBALL",
    answer: "AURA,IGNIS"
  },
  {
    puzzle_key: "spell_making_2",
    question: "MUD SHIELD",
    answer: "AQUA,TERRA"
  },
  {
    puzzle_key: "spell_making_3",
    question: "SEALING PORTAL",
    answer: "AETHER,IGNIS,TERRA"
  },
  {
    puzzle_key: "spell_making_4",
    question: "LIGHTNING STRIKE",
    answer: "AETHER,AURA,IGNIS"
  },
  {
    puzzle_key: "spell_making_5",
    question: "ICE WALL",
    answer: "AQUA,AURA"
  },
  {
    puzzle_key: "spell_making_6",
    question: "ALCHEMICAL ELIXIR",
    answer: "AETHER,AQUA,TERRA"
  },

  // --- STAGE 7: WORD FIND ---
  {
    puzzle_key: "word_find",
    question: "TOMB,SEAL,CRYPT,GOLD,OSIRIS,ANUBIS,SCARAB,MUMMY,EGYPT,SPHINX,TEMPLE,RUIN,SACRED,CURSE,DEATH",
    answer: "ANUBIS,CRYPT,CURSE,DEATH,EGYPT,GOLD,MUMMY,OSIRIS,RUIN,SACRED,SCARAB,SEAL,SPHINX,TEMPLE,TOMB"
  },

  // --- STAGE 8: TIC TAC TOE ---
  {
    puzzle_key: "tic_tac_toe",
    question: "Beat the Minimax AI Guardian",
    answer: "victory"
  }
];

async function run() {
  const sql = neon(dbUrl);
  console.log("Purging old case_questions for case_id '01'...");
  await sql`
    DELETE FROM case_questions WHERE case_id = '01';
  `;

  console.log("Seeding Case File 01 granular questions & answers...");
  for (const q of seedQuestions) {
    console.log(`Inserting puzzle key: ${q.puzzle_key}`);
    await sql`
      INSERT INTO case_questions (id, case_id, puzzle_key, question, answer)
      VALUES (gen_random_uuid(), '01', ${q.puzzle_key}, ${q.question}, ${q.answer});
    `;
  }

  console.log("Seeding Case File 01 successful!");
}

run().catch(err => {
  console.error("Seeding Case File 01 failed:", err);
  process.exit(1);
});
