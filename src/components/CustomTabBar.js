import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import HomeIcon from "../../assets/home.svg";
import SearchIcon from "../../assets/search.svg";
import TodayIcon from "../../assets/today.svg";
import FavoriteIcon from "../../assets/favorite.svg";
import AccountIcon from "../../assets/account.svg";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  tabArea: {
    height: 60,
    backgroundColor: "#D4AF37",
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabItemCenter: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#D4AF37",
    borderStyle: "solid",
    marginTop: -60,
  },
});

export default function CustomTabBar({ state, navigation }) {
  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.tabArea}>
      <TouchableOpacity style={styles.tabItem} onPress={() => goTo("Home")}>
        <HomeIcon
          style={{ opacity: state.index === 0 ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#fff"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => goTo("Search")}>
        <SearchIcon
          style={{ opacity: state.index === 1 ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#fff"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItemCenter}
        onPress={() => goTo("Appointments")}
      >
        <TodayIcon width="32" height="32" fill="#C18E00" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => goTo("Favorites")}
      >
        <FavoriteIcon
          style={{ opacity: state.index === 3 ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#fff"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => goTo("Profile")}>
        <AccountIcon
          style={{ opacity: state.index === 4 ? 1 : 0.5 }}
          width="24"
          height="24"
          fill="#fff"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
