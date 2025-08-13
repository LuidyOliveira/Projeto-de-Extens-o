import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191612",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scroller: {
    flex: 1,
    padding: 15,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fefeff",
    fontFamily: "serif",
  },
  noBooking: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#B0B0B0",
    marginBottom: 10,
    fontFamily: "serif",
  },
  bookingItem: {
    padding: 15,
    backgroundColor: "#D4AF37",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fefeff",
    fontFamily: "serif",
  },
  hourText: {
    fontSize: 16,
    color: "#fefeff",
    fontFamily: "serif",
  },
  backButton: {
    backgroundColor: "#C18E00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#fefeff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  barberText: {
    fontSize: 15,
    color: "#fefeff",
    marginTop: 6,
    fontFamily: "serif",
  },
  serviceText: {
    fontSize: 15,
    color: "#fefeff",
    marginTop: 2,
    fontFamily: "serif",
  },
});

export default styles;
