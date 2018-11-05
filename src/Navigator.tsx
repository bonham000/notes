import { createStackNavigator } from "react-navigation";

import App from "./Home";

export default createStackNavigator(
  {
    home: {
      screen: App,
    },
  },
  {
    initialRouteName: "home",
  },
);
