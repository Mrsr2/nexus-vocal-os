/**
 * NexusVocal Intelligence Engine
 * This module handles the personality matrix and linguistic refactoring logic.
 */

export type Persona = 'RECRUITER' | 'ARCHITECT' | 'SCRUM_MASTER' | 'PEER';

export interface PersonaConfig {
  name: string;
  role: string;
  traits: string[];
  slangIntensity: number; // 0 to 1
  pressureLevel: number; // 0 to 1
}

export const PERSONAS: Record<Persona, PersonaConfig> = {
  RECRUITER: {
    name: 'Sarah',
    role: 'Technical Talent Lead at Google',
    traits: ['Professional', 'Polite', 'STAR-Method focused'],
    slangIntensity: 0.2,
    pressureLevel: 0.5,
  },
  ARCHITECT: {
    name: 'Marcus',
    role: 'Principal Staff Engineer',
    traits: ['Blunt', 'Direct', 'Optimization-obsessed'],
    slangIntensity: 0.4,
    pressureLevel: 0.9,
  },
  SCRUM_MASTER: {
    name: 'Alex',
    role: 'Agile Delivery Manager',
    traits: ['Action-oriented', 'Brevity-focused'],
    slangIntensity: 0.6,
    pressureLevel: 0.4,
  },
  PEER: {
    name: 'Jordan',
    role: 'Senior Fullstack Dev',
    traits: ['Casual', 'Heavy Slang', 'Fast-talker'],
    slangIntensity: 0.9,
    pressureLevel: 0.2,
  },
};

export const RefactorLogic = {
  // Logic to identify common Spanish-speaker errors and professional tech idioms
  patterns: [
    { regex: /e-status|e-script|e-sprite/i, correction: "Don't add 'E' before 'S' cluster words." },
    { regex: /how you say|how do you call/i, correction: "Use 'What do you call' or 'How do you say'." },
    { regex: /the most part of/i, correction: "Use 'Most of' or 'The majority of'." },
    { regex: /I have [0-9]+ years/i, correction: "Use 'I have been working for...' or 'I have X years of experience'." },
  ],

  idioms: [
    { tech: "Scalability", colloquial: "Ability to handle the heat" },
    { tech: "Refactor", colloquial: "Clean up the mess" },
    { tech: "Bottleneck", colloquial: "The thing slowing us down" },
    { tech: "Technical Debt", colloquial: "Mess we'll pay for later" }
  ],

  analyze(transcript: string) {
    return this.patterns.filter(p => p.regex.test(transcript));
  }
};