import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AppContext, { AppContextShape } from "./Context";

interface IProps {
  handleAddNote: AppContextShape["handleAddNote"];
}

interface IState {
  title: string;
  content: string;
}

class CreateNote extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      title: "",
      content: "",
    };
  }
  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          style={{
            width: "95%",
          }}
          label="Note Title"
          value={this.state.title}
          onChangeText={this.handleChangeTitle}
        />
        <TextInput
          mode="outlined"
          multiline
          style={{
            width: "95%",
            marginTop: 12,
          }}
          label="Note Content"
          value={this.state.content}
          onChangeText={this.handleChangeContent}
        />
        <Button style={{ marginTop: 25 }} onPress={this.createNote}>
          Add Note
        </Button>
      </View>
    );
  }

  handleChangeTitle = (title: string) => {
    this.setState({ title });
  };

  handleChangeContent = (content: string) => {
    this.setState({ content });
  };

  createNote = () => {
    this.props.handleAddNote({
      title: this.state.title,
      content: this.state.content,
      dateCreated: new Date(),
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default (props: any) => {
  return (
    <AppContext.Consumer>
      {(value: AppContextShape) => {
        return <CreateNote handleAddNote={value.handleAddNote} />;
      }}
    </AppContext.Consumer>
  );
};
