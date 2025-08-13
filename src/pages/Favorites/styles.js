import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191612",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 0,
  },
  scroller: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fefeff",
    fontFamily: "serif",
  },
  emptyText: {
    fontSize: 16,
    color: "#B0B0B0",
    textAlign: "center",
    marginTop: 40,
    fontFamily: "serif",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#D4AF37",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fefeff",
    fontFamily: "serif",
  },
  rebookButton: {
    marginTop: 5,
    backgroundColor: "#ff9200",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  rebookButtonText: {
    color: "#fefeff",
    fontWeight: "bold",
    fontFamily: "serif",
  },
  clearButton: {
    backgroundColor: "#C18E00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 20,
  },

  clearButtonText: {
    color: "#fefeff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "serif",
  },
});

export default styles;
