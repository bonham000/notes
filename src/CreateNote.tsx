import glamorous from "glamorous-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";
import AppContext, { AppContextShape } from "./Context";

interface IProps {
  handleAddNote: AppContextShape["handleAddNote"];
  navigation: NavigationScreenProp<{}>;
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
      <Container>
        <TextInput
          style={{
            width: "95%",
          }}
          mode="outlined"
          label="Note Title"
          value={this.state.title}
          onChangeText={this.handleChangeTitle}
        />
        <TextInput
          style={{
            width: "95%",
            marginTop: 12,
            height: 300,
            maxHeight: 450,
            paddingTop: 18,
          }}
          mode="outlined"
          multiline
          label="Note Content"
          value={this.state.content}
          onChangeText={this.handleChangeContent}
        />
        <Button
          mode="contained"
          style={{ marginTop: 35 }}
          onPress={this.createNote}
        >
          Add Note
        </Button>
      </Container>
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
    this.props.navigation.goBack();
  };
}

const Container = glamorous.view({
  flex: 1,
  paddingTop: 25,
  alignItems: "center",
  backgroundColor: "#fff",
});

export default (props: any) => {
  return (
    <AppContext.Consumer>
      {(value: AppContextShape) => {
        return <CreateNote {...props} handleAddNote={value.handleAddNote} />;
      }}
    </AppContext.Consumer>
  );
};
