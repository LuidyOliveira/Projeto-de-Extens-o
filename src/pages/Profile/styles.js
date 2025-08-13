import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191612",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fefeff",
    fontFamily: "serif",
  },
  infoBox: {
    backgroundColor: "#D4AF37",
    borderRadius: 12,
    padding: 15,
    width: "100%",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: "#555",
    fontFamily: "serif",
    marginTop: 5,
  },
  value: {
    fontSize: 18,
    color: "#fefeff",
    fontFamily: "serif",
  },
  logoutButton: {
    backgroundColor: "#C18E00",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  logoutButtonText: {
    color: "#fefeff",
    fontFamily: "serif",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
