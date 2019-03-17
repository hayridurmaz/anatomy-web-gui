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
export interface Survey {
  name: string;
  questions: Question[];
  valid: Boolean;
}

export interface Answer {
  id: Number;
  atext: String;
  question_id: Number;
  correct: Boolean;
}

export interface Question {
  id: Number;
  hint: String;
  qtext: String;
  quiz_id: Number;
  media_id: Number;
  topic_id: Number;
}

export interface Quiz {
  id: Number;
  quiz_type_id: Number;
  system_id: Number;
  header: String;
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
