import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191612",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputArea: {
    width: "100%",
    padding: 40,
  },
  customButton: {
    height: 60,
    backgroundColor: "#C18E00",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  customButtonText: {
    fontSize: 18,
    color: "#fefeff",
    fontFamily: "serif",
  },
  signButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  signMessageText: {
    fontSize: 16,
    color: "#fefeff",
    fontFamily: "serif",
  },
  signMessageTextBold: {
    fontSize: 16,
    color: "#fefeff",
    fontFamily: "serif",
    fontWeight: "bold",
  },
});

export default styles;
