import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191612",
    flex: 1,
  },
  scroller: {
    flex: 1,
  },
  swipeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 3,
  },
  swipeDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
    margin: 3,
  },
  pageBody: {
    backgroundColor: "#191612",
    borderTopLeftRadius: 50,
    marginTop: -50,
    minHeight: 400,
  },
  userInfo: {
    flex: 1,
    justifyContent: "flex-end",
  },
  userInfoArea: {
    flexDirection: "row",
    marginTop: -30,
  },
  userAvatar: {
    width: 110,
    height: 110,
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 20,
    borderWidth: 4,
    borderColor: "#fff",
  },
  userInfoName: {
    color: "#fefeff",
    fontFamily: "serif",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userFavButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#999",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 9,
  },
  serviceArea: {
    marginTop: 30,
  },
  serviceItem: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    color: "#fefeff",
    fontFamily: "serif",
    fontWeight: "bold",
  },
  servicePrice: {
    fontSize: 14,
    color: "#fefeff",
    fontFamily: "serif",
  },
  serviceChooseButton: {
    backgroundColor: "#C18E00",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  serviceChooseText: {
    color: "#fefeff",
    fontFamily: "serif",
    fontSize: 14,
    fontWeight: "bold",
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fefeff",
    fontFamily: "serif",
    marginLeft: 30,
    marginBottom: 20,
  },
});

export default styles;
