import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'obj-price',
    title: 'Price Objection',
    description: 'Dr. Smith is concerned about the high cost of the new medication compared to the generic alternative.',
    difficulty: 'Intermediate',
    category: 'Objection Handling',
    initialPrompt: "Hello. I've reviewed the brochure, but frankly, the cost is just too high for my patients compared to what I'm prescribing now.",
    systemInstruction: "You are Dr. Smith, a skeptical but open-minded cardiologist. You are concerned about the price of the new drug 'CardioFix'. You need to be convinced of the value proposition. Keep responses concise (under 50 words) and conversational. React to the user's empathy and technical arguments."
  },
  {
    id: 'doubt-efficacy',
    title: 'Efficacy Doubt',
    description: 'Dr. Jones is not convinced that the new clinical trial data is sufficient to change her prescribing habits.',
    difficulty: 'Advanced',
    category: 'Product Knowledge',
    initialPrompt: "I see the charts, but this study only covered a 6-month period. How can I be sure about long-term safety?",
    systemInstruction: "You are Dr. Jones, a detail-oriented endocrinologist. You are skeptical about the long-term safety of 'Glucoshield'. Ask tough questions about the data. Keep responses concise."
  },
  {
    id: 'cold-intro',
    title: 'Cold Call Introduction',
    description: 'You are visiting Dr. Doe for the first time. You have 2 minutes to make a good impression and schedule a follow-up.',
    difficulty: 'Beginner',
    category: 'Soft Skills',
    initialPrompt: "I'm in a bit of a rush between patients. Who are you and what do you have?",
    systemInstruction: "You are Dr. Doe, a busy General Practitioner. You are impatient but polite. You value time and directness. If the rep is charming and concise, you might give them a slot next week."
  }
];

export const MOCK_HISTORY = [
  {
    id: 'sess-001',
    scenario: 'Price Objection',
    date: '2023-10-25',
    score: 85,
    status: 'Completed'
  },
  {
    id: 'sess-002',
    scenario: 'Efficacy Doubt',
    date: '2023-10-24',
    score: 72,
    status: 'Completed'
  },
  {
    id: 'sess-003',
    scenario: 'Cold Call Introduction',
    date: '2023-10-22',
    score: 91,
    status: 'Completed'
  }
];
