import React from "react";

export interface Note {
  title: string;
  content: string;
  dateCreated: Date;
}

export interface AppContextShape {
  notes: ReadonlyArray<Note>;
  handleAddNote: (note: Note) => void;
  handleResetName: () => void;
  handleClearNotes: () => void;
}

const AppContext = React.createContext({
  notes: [] as ReadonlyArray<Note>,
  handleAddNote: (note: Note) => {
    return;
  },
  handleResetName: () => {
    return;
  },
  handleClearNotes: () => {
    return;
  },
});

export default AppContext;
