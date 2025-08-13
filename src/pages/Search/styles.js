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
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fefeff",
    fontFamily: "serif",
  },
  barbeiroItem: {
    alignItems: "center",
    marginRight: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fefeff",
  },
  selected: {
    backgroundColor: "#D4AF37",
  },
  foto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  nome: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "serif",
  },
  card: {
    backgroundColor: "#D4AF37",
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },
  nomeGrande: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fefeff",
    fontFamily: "serif",
  },
  especialidade: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    fontFamily: "serif",
  },
  servicosTitulo: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fefeff",
    fontFamily: "serif",
    fontSize: 18,
  },
  servicoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  servicoNome: {
    fontSize: 16,
    fontFamily: "serif",
  },
  servicoPreco: {
    fontSize: 16,
    color: "#fefeff",
    fontWeight: "600",
    fontFamily: "serif",
  },
  botao: {
    marginTop: 20,
    backgroundColor: "#C18E00",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fefeff",
    fontFamily: "serif",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
