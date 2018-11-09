import { AsyncStorage } from "react-native";

class StorageModule {
  USERNAME_KEY = "USERNAME";

  getUsername = async () => {
    const username = await AsyncStorage.getItem(this.USERNAME_KEY);
    return username || "";
  };

  setUsername = async (username: string) => {
    await AsyncStorage.setItem(this.USERNAME_KEY, username);
  };
}

export default new StorageModule();
