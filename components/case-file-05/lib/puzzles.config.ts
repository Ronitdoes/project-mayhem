import dynamic from "next/dynamic";
import { ComponentType } from "react";

export interface PuzzleConfig {
  id: number;
  slug: string;
  title: string;
  answer: string;
  aliases: string[];
  fuzzyThreshold?: number;
  hints: string[];
  points: number;
  component: ComponentType<any>;
  clue: string;
  lore: string;
}

export const puzzlesConfig: PuzzleConfig[] = [
  {
    id: 1,
    slug: "math-trick",
    title: "The Math Trick",
    answer: "42",
    aliases: [],
    clue: "The Quake III hex magic number 0x5f3759df. Convert to decimal, sum the digits.",
    lore: "The fast inverse square root code in Quake III Arena uses the magic number 0x5f3759df to compute 1/√x. Deciphering this code revealed that summing the digits of its decimal representation yields 42—the ultimate answer.",
    hints: [
      "What is the ultimate answer to life, the universe, and everything?",
      "It is a two-digit number from a famous Douglas Adams book.",
      "Think Hitchhiker's Guide to the Galaxy: 42."
    ],
    points: 300,
    component: dynamic(() => import("../components/puzzles/P01MathTrick"), { ssr: false })
  },
  {
    id: 2,
    slug: "wilhelm-scream",
    title: "Wilhelm Scream",
    answer: "Private Wilhelm",
    aliases: ["wilhelm"],
    fuzzyThreshold: 0.80,
    clue: "In 1951, a screaming sound effect became legendary. Identify the character it was named after.",
    lore: "First recorded for the 1951 film 'Distant Drums', the scream was later named after Private Wilhelm, a character who gets shot by an arrow in the 1953 Western 'The Charge at Feather River'. It remains cinema's most famous easter egg.",
    hints: [
      "This famous sound effect is named after a character in a 1953 movie.",
      "The character's name is Private...",
      "The full name of the character is Private Wilhelm."
    ],
    points: 300,
    component: dynamic(() => import("../components/puzzles/P02WilhelmScream"), { ssr: false })
  },
  {
    id: 3,
    slug: "taured-passport",
    title: "Taured Passport",
    answer: "Taured",
    aliases: [],
    clue: "In 1954, a man arrived at a Japanese airport with a passport from a country that doesn't exist, located between France and Spain.",
    lore: "The mystery traveler at Haneda Airport claimed to be from Taured, located where Andorra sits today. When detained, he and his documents vanished overnight from a high-security hotel room, creating one of modern history's greatest parallel-universe enigmas.",
    hints: [
      "A mysterious traveler arrived at Haneda Airport in 1954 from a non-existent country.",
      "The country was said to be between France and Spain, where Andorra is.",
      "The fictional country is Taured."
    ],
    points: 300,
    component: dynamic(() => import("../components/puzzles/P03TauredPassport"), { ssr: false })
  },
  {
    id: 4,
    slug: "kryptos-cipher",
    title: "Kryptos Cipher",
    answer: "Berlin",
    aliases: [],
    clue: "The Kryptos sculpture at CIA HQ has 4 encrypted sections. The artist gave 3 clues over the years. What was the second clue?",
    lore: "Created by artist Jim Sanborn, the Kryptos sculpture stands at the CIA headquarters. Passages 1-3 have been solved, with the second passage yielding 'BERLIN' as a clue. The fourth passage (K4) remains unsolved to this day.",
    hints: [
      "This cipher is from the famous Kryptos sculpture at the CIA headquarters.",
      "The answer to the second section (K2) of Kryptos is a city.",
      "The city is Berlin."
    ],
    points: 300,
    component: dynamic(() => import("../components/puzzles/P04KryptosCipher"), { ssr: false })
  },
  {
    id: 5,
    slug: "deep-blue",
    title: "Deep Blue (Engine)",
    answer: "Garry Kasparov",
    aliases: [],
    fuzzyThreshold: 0.85,
    clue: "In 1997, Garry Kasparov played IBM's Deep Blue in Game 6. He blundered on move 7. Who was the human champion?",
    lore: "Garry Kasparov's loss in Game 6 of the 1997 rematch marked the first time a reigning world chess champion was defeated by a computer under tournament conditions. His move 7 blunder (Bd6) led to a rapid and historic resignation.",
    hints: [
      "Deep Blue defeated a world chess champion in 1997.",
      "He is widely considered one of the greatest chess players of all time.",
      "His name is Garry Kasparov."
    ],
    points: 300,
    component: dynamic(() => import("../components/puzzles/P05DeepBlue"), { ssr: false })
  },
  {
    id: 6,
    slug: "golden-record",
    title: "Golden Record",
    answer: "Carl Sagan",
    aliases: [],
    fuzzyThreshold: 0.85,
    clue: "Ann Druyan's brainwaves while thinking of falling in love were recorded for Voyager in 1977. Four years later she married a famous space scientist.",
    lore: "Ann Druyan and Carl Sagan fell in love during the creation of the Voyager Golden Record. Her love-filled brainwaves were recorded and are now traveling in interstellar space. They married in 1981, dedicating their lives to science communication.",
    hints: [
      "The Golden Record on Voyager contains greetings in 55 languages.",
      "A famous astronomer spearheaded the committee to select the record's contents.",
      "His name is Carl Sagan."
    ],
    points: 300,
    component: dynamic(() => import("../components/puzzles/P06GoldenRecord"), { ssr: false })
  },
  {
    id: 7,
    slug: "demon-core",
    title: "Demon Core",
    answer: "Demon Core",
    aliases: [],
    clue: "A plutonium sphere killed two scientists in 1945 and 1946. It was intended for a third atomic bomb. What was its nickname?",
    lore: "The Demon Core was a 6.2 kg subcritical mass of plutonium that went critical during two separate laboratory accidents at Los Alamos, killing physicists Harry Daghlian and Louis Slotin. It was later melted down and reused in other weapons.",
    hints: [
      "This subcritical mass of plutonium was involved in two fatal criticality accidents.",
      "It was nicknamed after scientists joked it was like 'tickling a sleeping dragon'.",
      "It is the Demon Core."
    ],
    points: 300,
    component: dynamic(() => import("../components/puzzles/P07DemonCore"), { ssr: false })
  },
  {
    id: 8,
    slug: "poe-cipher",
    title: "Poe Cipher",
    answer: "Gil Broza",
    aliases: ["Gil Bronza"],
    fuzzyThreshold: 0.80,
    clue: "Edgar Allan Poe shared a cipher in 1840. It went unsolved for 150 years. A man in Toronto cracked it in 2000.",
    lore: "Edgar Allan Poe published two ciphers in Graham's Magazine in 1840. The second cryptogram remained unsolved until 2000, when Gil Broza successfully decrypted the text, revealing it to be an excerpt from Joseph Addison's play 'Cato'.",
    hints: [
      "This modern puzzle solver decrypted the final Poe cryptogram in 2000.",
      "He is an author and agile development coach.",
      "His name is Gil Broza (or Gil Bronza)."
    ],
    points: 300,
    component: dynamic(() => import("../components/puzzles/P08PoeCipher"), { ssr: false })
  }
];
