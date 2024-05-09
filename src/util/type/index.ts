export type ValueOf<T> = T[keyof T];

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
