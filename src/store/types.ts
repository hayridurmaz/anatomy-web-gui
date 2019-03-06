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

enum mediaTypes {image, video}

export interface Topic {
  id: number,
  name: string
}

export interface System {
  id: number,
  name: string
}

export interface Media{
  id: number,
  dataUrl: string,
  mediaType: mediaTypes,
  systemId: number,
  topicId: number,
  thumbnailUrl: string
}
