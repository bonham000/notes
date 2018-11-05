import React from "react";

import AppContext, { Note } from "./Context";
import AppNavigator from "./Navigator";

interface IState {
  notes: ReadonlyArray<Note>;
}

export default class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      notes: [],
    };
  }

  render(): JSX.Element {
    console.log(this.state.notes);

    return (
      <AppContext.Provider
        // @ts-ignore
        value={{ notes: this.state.notes, handleAddNote: this.handleAddNote }}
      >
        <AppNavigator />
      </AppContext.Provider>
    );
  }

  handleAddNote = (note: Note) => {
    this.setState(prevState => ({
      notes: prevState.notes.concat(note),
    }));
  };
}
