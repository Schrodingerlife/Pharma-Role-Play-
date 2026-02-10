export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Objection Handling' | 'Product Knowledge' | 'Closing' | 'Soft Skills';
  initialPrompt: string;
  systemInstruction: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SessionMetrics {
  tone: number; // 0-100
  clarity: number; // 0-100
  empathy: number; // 0-100
  technical: number; // 0-100
}

export interface Feedback {
  type: 'positive' | 'warning' | 'constructive';
  message: string;
}

export interface SessionReport {
  sessionId: string;
  scenarioId: string;
  date: string;
  durationSeconds: number;
  overallScore: number;
  metrics: SessionMetrics;
  transcript: Message[];
  feedbacks: Feedback[];
}
