import React from "react";
import { AppState, View } from "react-native";
import Dialog from "react-native-dialog";
import { Snackbar } from "react-native-paper";

import AppContext, { Note } from "./AppContext";
import createAppNavigator from "./NavigatorConfig";
import StorageModule from "./StorageModule";

interface IState {
  notes: ReadonlyArray<Note>;
  username: string;
  loading: boolean;
  isDialogVisible: boolean;
  snackMessage: string;
  appState: string;
}

export default class NotesApp extends React.Component<{}, IState> {
  timeout: any = null;

  constructor(props: {}) {
    super(props);

    this.state = {
      notes: [],
      username: "",
      loading: true,
      isDialogVisible: true,
      snackMessage: "",
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
    this.clearTimeout();
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
          handleEditNote: this.handleEditNote,
          handleDeleteNote: this.handleDeleteNote,
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
          <Snackbar
            visible={Boolean(this.state.snackMessage)}
            onDismiss={() => this.setState({ snackMessage: "" })}
            action={{
              label: "Okay",
              onPress: () => {
                this.setState({ snackMessage: "" });
                this.clearTimeout();
              },
            }}
          >
            {this.state.snackMessage}
          </Snackbar>
        </View>
      </AppContext.Provider>
    );
  }

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
    this.setState(
      currentState => ({
        snackMessage: "Note created! 🏆",
        notes: [note, ...currentState.notes],
      }),
      this.timeoutSnackbar,
    );
  };

  handleEditNote = (note: Note, previousNoteDate: string): void => {
    this.setState(
      currentState => ({
        snackMessage: "Note saved! 🏅",
        notes: [note, ...currentState.notes].filter(
          n => String(n.dateCreated) !== previousNoteDate,
        ),
      }),
      this.timeoutSnackbar,
    );
  };

  handleDeleteNote = (noteDate: string): void => {
    this.setState(
      currentState => ({
        snackMessage: "Note removed! 🤘",
        notes: currentState.notes.filter(
          n => String(n.dateCreated) !== noteDate,
        ),
      }),
      this.timeoutSnackbar,
    );
  };

  handleClearNotes = () => {
    this.setState({ notes: [] });
  };

  handleResetName = () => {
    this.setState({
      username: "",
      isDialogVisible: true,
    });
  };

  timeoutSnackbar = () => {
    this.timeout = setTimeout(() => {
      this.setState({ snackMessage: "" });
    }, 4000);
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

  clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };
}
