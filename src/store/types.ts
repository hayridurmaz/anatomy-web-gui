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

export enum mediaTypes {Image, Video}

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
  data_url: string,
  mediaType: mediaTypes,
  system_id: number,
  topic_ids: number[],
  thumbnail_url: string,
  date: string,
  topics?: Topic[],
  system?: System
}
