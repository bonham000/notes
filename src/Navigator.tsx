import { createStackNavigator } from "react-navigation";

import CreateNote from "./CreateNote";
import App from "./Home";
import { ROUTE_NAMES } from "./Routes";

export default createStackNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: App,
      navigationOptions: {
        title: "Trish’s Notes",
        headerBackTitle: null,
      },
    },
    [ROUTE_NAMES.CREATE_NOTE]: {
      screen: CreateNote,
      navigationOptions: {
        title: "Create a Note",
        headerBackTitle: null,
      },
    },
  },
  {
    initialRouteName: ROUTE_NAMES.HOME,
  },
);
