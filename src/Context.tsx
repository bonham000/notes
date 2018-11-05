import React from "react";

export interface Note {
  title: string;
  content: string;
  dateCreated: Date;
}

export interface AppContextShape {
  notes: ReadonlyArray<Note>;
  handleAddNote: (note: Note) => void;
}

const AppContext = React.createContext({
  notes: [],
  handleAddNote: () => null,
});

export default AppContext;
