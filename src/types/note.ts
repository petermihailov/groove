export type NoteInstrument = 
  | 'cymbal'
  | 'hat'
  | 'kick'
  | 'snare'
  | 'tom1'
  | 'tom2'
  | 'tom3'
  | 'tom4';

export type NoteDynamic = 
  | 'accent'
  | 'ghost'
  | 'regular';

export type CymbalState = 
  | 'china'
  | 'cowbell'
  | 'crash'
  | 'ride'
  | 'ridebell'
  | 'splash';

export type HatState = 
  | 'close'
  | 'foot'
  | 'open';

export type SnareState = 
  | 'buzz'
  | 'drag'
  | 'flam'
  | 'rim';

export interface Note {
  note: CymbalState | HatState | SnareState;
  dynamic: NoteDynamic;
}