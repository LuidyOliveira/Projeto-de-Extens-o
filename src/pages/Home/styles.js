import { StatusBar, StyleSheet, Platform } from "react-native";

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
  headerArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    width: 250,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fefeff",
  },
  searchButton: {
    width: 26,
    height: 26,
  },
  locationArea: {
    backgroundColor: "#0b0904",
    height: 60,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: "#fefeff",
  },
  locationFinder: {
    width: 24,
    height: 24,
  },
  loadingIcon: {
    marginTop: 50,
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#fefeff",
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#B0B0B0",
    marginBottom: 20,
    fontFamily: "serif",
  },
  infoBox: {
    backgroundColor: "#D4AF37",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fefeff",
    fontFamily: "serif",
  },
  infoText: {
    fontSize: 16,
    color: "#fefeff",
    fontFamily: "serif",
  },
  button: {
    backgroundColor: "#C18E00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fefeff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
  },
});

export default styles;
