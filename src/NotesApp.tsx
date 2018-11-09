import React from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";

import AppContext, { Note } from "./Context";
import createAppNavigator from "./Navigator";
import StorageModule from "./StorageModule";

interface IState {
  notes: ReadonlyArray<Note>;
  username: string;
  loading: boolean;
  isDialogVisible: boolean;
}

export default class NotesApp extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      notes: [],
      username: "",
      loading: true,
      isDialogVisible: true,
    };
  }

  async componentDidMount(): Promise<void> {
    const username = await StorageModule.getUsername();
    this.setState({
      username,
      loading: false,
      isDialogVisible: !username,
    });
  }

  render(): JSX.Element | null {
    const { loading, username, isDialogVisible } = this.state;
    if (loading) {
      return null;
    }

    const AppNavigator = createAppNavigator(username);
    const shouldRenderApp = Boolean(username) && !isDialogVisible;
    return (
      <AppContext.Provider
        // @ts-ignore
        value={{ notes: this.state.notes, handleAddNote: this.handleAddNote }}
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
            <Dialog.Button onPress={this.handleSetUsername} label="yay! ^_^" />
          </Dialog.Container>
          {shouldRenderApp && <AppNavigator />}
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

  handleAddNote = (note: Note) => {
    this.setState(prevState => ({
      notes: prevState.notes.concat(note),
    }));
  };
}
