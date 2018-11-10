import React from "react";
import { AppState, View } from "react-native";
import Dialog from "react-native-dialog";

import AppContext, { Note } from "./AppContext";
import createAppNavigator from "./NavigatorConfig";
import StorageModule from "./StorageModule";

interface IState {
  notes: ReadonlyArray<Note>;
  username: string;
  loading: boolean;
  isDialogVisible: boolean;
  appState: string;
}

export default class NotesApp extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      notes: [],
      username: "",
      loading: true,
      isDialogVisible: true,
      appState: AppState.currentState,
    };
  }

  async componentDidMount(): Promise<void> {
    const username = await StorageModule.getUsername();
    const notes = await StorageModule.getSavedNotes();
    this.setState({
      notes,
      username,
      loading: false,
      isDialogVisible: !username,
    });

    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount(): void {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  render(): JSX.Element | null {
    const { notes, loading, username, isDialogVisible } = this.state;
    if (loading) {
      return null;
    }

    const AppNavigator = createAppNavigator(username);
    const shouldRenderApp = Boolean(username) && !isDialogVisible;
    return (
      <AppContext.Provider
        value={{
          notes,
          handleAddNote: this.handleAddNote,
          handleResetName: this.handleResetName,
          handleClearNotes: this.handleClearNotes,
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgb(75,75,75)" }}>
          <Dialog.Container visible={isDialogVisible}>
            <Dialog.Title>What’s your name?</Dialog.Title>
            <Dialog.Input
              autoFocus
              value={this.state.username}
              onChangeText={this.handleChangeUsername}
              placeholder="Your name!"
            />
            <Dialog.Button
              onPress={this.handleSetUsername}
              label="Proceed 🙏"
            />
          </Dialog.Container>
          {shouldRenderApp && <AppNavigator />}
        </View>
      </AppContext.Provider>
    );
  }

  handleResetName = () => {
    this.setState({
      username: "",
      isDialogVisible: true,
    });
  };

  handleClearNotes = () => {
    this.setState({ notes: [] });
  };

  handleChangeUsername = (username: string) => {
    this.setState({ username });
  };

  handleSetUsername = () => {
    this.setState(
      {
        isDialogVisible: false,
      },
      async () => {
        StorageModule.setUsername(this.state.username);
      },
    );
  };

  handleAddNote = (note: Note): void => {
    this.setState(prevState => ({
      notes: prevState.notes.concat(note),
    }));
  };

  handleAppStateChange = (nextAppState: string) => {
    if (
      this.state.appState.match(/active|foreground/) &&
      nextAppState.match(/inactive|background/)
    ) {
      const { notes } = this.state;
      StorageModule.persistNotes(notes);
    }
    this.setState({ appState: nextAppState });
  };
}
