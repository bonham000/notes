import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";
import { ROUTE_NAMES } from "./Routes";

interface IProps {
  navigation: NavigationScreenProp<{}>;
}

export default class App extends React.Component<IProps, {}> {
  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <Text>Start taking notes now!</Text>
        <Button style={{ marginTop: 25 }} onPress={this.handleAddNote}>
          Create a Note
        </Button>
      </View>
    );
  }

  handleAddNote = () => {
    this.props.navigation.navigate(ROUTE_NAMES.CREATE_NOTE);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
