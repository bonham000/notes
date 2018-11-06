import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import SortableList from "react-native-sortable-list";
import { NavigationScreenProp } from "react-navigation";
import AppContext, { AppContextShape, Note } from "./Context";
import { ROUTE_NAMES } from "./Routes";

const window = Dimensions.get("window");

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
      <View
        style={{
          flex: 1,
          paddingTop: 50,
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <View style={{ flex: 8 }}>
          <SortableList
            data={this.props.notes}
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            renderRow={({ data }: { data: Note }) => {
              return (
                <View
                  style={{
                    marginTop: 2,
                    marginBottom: 2,
                    padding: 6,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: "rgb(230,230,230)",
                  }}
                >
                  <View
                    style={{
                      paddingTop: 4,
                      paddingBottom: 4,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottomWidth: 1,
                      borderBottomColor: "rgb(245,245,245)",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={{ fontWeight: "bold" }}
                    >
                      {data.title}
                    </Text>
                    <Text>{new Date(data.dateCreated).toDateString()}</Text>
                  </View>
                  <View style={{ paddingTop: 8, paddingBottom: 8 }}>
                    <Text>{data.content}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Button onPress={this.handleAddNote}>Create a Note</Button>
        </View>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: "#999999",
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,
    paddingHorizontal: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: "#222222",
  },
});
