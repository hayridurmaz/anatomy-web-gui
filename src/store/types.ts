export const UPDATE_LOGGED_IN = "UPDATE_LOGGED_IN";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";

export interface GlobalState {
  loggedIn: boolean;
  Account: Account;
}

export interface Audios {
  announceSound: string;
}

export interface Action {
  type: string;
  loggedIn?: boolean;
  Account?: Account;
}
export interface Survey {
  name: string;
  questions: Question[];
  valid: Boolean;
}

export interface Answer {
  index?: Number;
  id?: Number;
  atext: String;
  question_id?: Number;
  correct: Boolean;
}

export interface Question {
  index?: Number;
  id?: Number;
  hint: String;
  qtext: String;
  quiz_id?: Number;
  media_id: Number;
  topic_id: Number;
  answers: Answer[];
}

export interface Quiz {
  id?: Number;
  quiz_type_id?: Number;
  system_id?: Number;
  header?: String;
  questions?: Question[];
  quiztype?: QuizType;
  system?: System;
}

export interface QuizType {
  id: number;
  name: string;
}

export enum mediaTypes {
  Image,
  Video
}

export interface Topic {
  id: number;
  name: string;
}

export interface System {
  id: number;
  name: string;
}

export interface Media {
  index: number;
  id: number;
  data_url: string;
  mediaType: mediaTypes;
  system_id: number;
  topic_ids: number[];
  thumbnail_url: string;
  date: string;
  topics?: Topic[];
  system?: System;
}

export interface Class {
  name: string;
  students: Student[];
  teachers: Teacher[];
  quizzes: Quiz[];
  id: number;
}

export interface Account {
  id?: number;
  username: string;
  password: string;
  mail: string;
  name: string;
  userRole: "Student" | "Teacher";
  phoneNumber: string;
  gender: string;
}

export interface Teacher {
  id: number;
  username: string;
}

export interface Student {
  id: number;
  username: string;
}
