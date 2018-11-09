import glamorous from "glamorous-native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import SortableList from "react-native-sortable-list";
import { NavigationScreenProp } from "react-navigation";
import AppContext, { AppContextShape, Note } from "./Context";
import { ROUTE_NAMES } from "./Routes";

const SAMPLE_NOTES = [
  {
    content: "Some content",
    dateCreated: "2018-11-06T01:52:05.460Z",
    title: "My note",
  },
  {
    content: "Blah",
    dateCreated: "2018-11-06T01:52:13.128Z",
    title: "Another note",
  },
];

interface IProps {
  notes: ReadonlyArray<Note>;
  navigation: NavigationScreenProp<{}>;
}

class Home extends React.Component<IProps, {}> {
  render(): JSX.Element {
    return (
      <Container>
        <View style={{ flex: 8 }}>
          <SortableList
            data={this.props.notes}
            style={{ flex: 1 }}
            contentContainerStyle={styles.container}
            renderRow={({ data }: { data: Note }) => {
              return (
                <RowContainer>
                  <RowTop>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={{ fontWeight: "bold" }}
                    >
                      {data.title}
                    </Text>
                    <Text>{new Date(data.dateCreated).toDateString()}</Text>
                  </RowTop>
                  <View style={{ paddingTop: 8, paddingBottom: 8 }}>
                    <Text>{data.content}</Text>
                  </View>
                </RowContainer>
              );
            }}
          />
        </View>
        <ControlsContainer>
          <ButtonContainer>
            <Button mode="contained" onPress={this.handleAddNote}>
              Create a Note
            </Button>
          </ButtonContainer>
          <View style={{ flex: 1 }}>{getKitten()}</View>
        </ControlsContainer>
      </Container>
    );
  }

  handleAddNote = () => {
    this.props.navigation.navigate(ROUTE_NAMES.CREATE_NOTE);
  };
}

export default (props: any) => {
  return (
    <AppContext.Consumer>
      {(value: AppContextShape) => {
        return <Home {...props} notes={value.notes} />;
      }}
    </AppContext.Consumer>
  );
};

const Container = glamorous.view({
  flex: 1,
  paddingTop: 50,
  alignItems: "center",
  backgroundColor: "rgb(231,237,240)",
});

const ControlsContainer = glamorous.view({
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
});

const ButtonContainer = glamorous.view({
  flex: 2,
  alignItems: "flex-start",
  paddingLeft: 40,
  paddingBottom: 30,
});

const RowContainer = glamorous.view({
  marginTop: 2,
  marginBottom: 2,
  padding: 6,
  width: "100%",
  borderWidth: 1,
  borderColor: "rgb(230,230,230)",
});

const RowTop = glamorous.view({
  paddingTop: 4,
  paddingBottom: 4,
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderBottomColor: "rgb(245,245,245)",
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
});

const getKitten = () => {
  return <KITTEN_A />;
};

const KITTEN_A = () => (
  <Image
    style={{ position: "absolute", bottom: -15, right: 10 }}
    // @ts-ignore
    width={165}
    height={165}
    resizeMode="contain"
    source={require("../assets/kittens/kitten-a.png")}
  />
);

const KITTEN_B = () => (
  <Image
    style={{ position: "absolute", bottom: -15, right: -5 }}
    // @ts-ignore
    width={165}
    height={165}
    resizeMode="contain"
    source={require("../assets/kittens/kitten-b.png")}
  />
);

const KITTEN_C = () => (
  <Image
    style={{ position: "absolute", bottom: -15, right: 0 }}
    // @ts-ignore
    width={185}
    height={185}
    resizeMode="contain"
    source={require("../assets/kittens/kitten-c.png")}
  />
);

const KITTEN_D = () => (
  <Image
    style={{ position: "absolute", bottom: -5, right: -5 }}
    // @ts-ignore
    width={155}
    height={155}
    resizeMode="contain"
    source={require("../assets/kittens/kitten-d.png")}
  />
);
