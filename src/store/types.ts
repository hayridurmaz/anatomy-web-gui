export const UPDATE_LOGGED_IN = "UPDATE_LOGGED_IN";

export interface GlobalState {
  loggedIn: boolean;
}

export interface Audios {
  announceSound: string;
}

export interface Action {
  type: string;
  loggedIn?: boolean;
}

export interface Question {
  question: string;
  answers: Answer[];
  currentPressedAnswers: number;
}

export interface Answer {
  text: string;
  count: number;
}

export interface Survey {
  name: string;
  questions: Question[];
  valid: Boolean;
}
