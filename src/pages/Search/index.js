import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import styles from "./styles";

import { createTable, getBarbers, saveBarber } from "../../../database";

const barbeirosIniciais = [
  {
    id: "1",
    name: "Anderson",
    foto: require("../../../assets/barber1.jpg"),
    especialidades: ["Corte Clássico", "Barba na Navalha"],
    servicos: [
      { nome: "Corte Masculino", preco: "R$35" },
      { nome: "Barba Completa", preco: "R$25" },
      { nome: "Corte + Barba", preco: "R$55" },
      { nome: "Luzes", preco: "R$30" },
    ],
  },
  {
    id: "2",
    name: "Diego",
    foto: require("../../../assets/barber2.jpg"),
    especialidades: ["Corte Moderno", "Desenho na Barba"],
    servicos: [
      { nome: "Corte Masculino", preco: "R$35" },
      { nome: "Corte + Barba", preco: "R$55" },
      { nome: "Corte + Platinado", preco: "R$100" },
      { nome: "Sobrancelha", preco: "R$10" },
    ],
  },
  {
    id: "3",
    name: "Matheus",
    foto: require("../../../assets/barber3.jpg"),
    especialidades: ["Corte na Tesoura", "Tratamento Facial"],
    servicos: [
      { nome: "Corte Masculino", preco: "R$35" },
      { nome: "Limpeza de Pele", preco: "R$25" },
      { nome: "Corte + Relaxamento", preco: "R$70" },
      { nome: "Pacote Mensal", preco: "R$110" },
    ],
  },
];

export default function Search({ navigation }) {
  const [barbeiros, setBarbeiros] = useState([]);
  const [barbeiroSelecionado, setBarbeiroSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBarbers = async () => {
      try {
        await createTable();

        let existentes = await getBarbers();

        if (existentes.length === 0) {
          for (const barber of barbeirosIniciais) {
            await saveBarber({ name: barber.name });
          }
          existentes = await getBarbers();
        }

        const comDadosCompletos = existentes.map((b, index) => {
          const barberOriginal = barbeirosIniciais.find(
            (bi) => bi.name === b.name
          );
          return {
            ...b,
            id: b.id || String(index + 1),
            foto: barberOriginal
              ? barberOriginal.foto
              : require("../../../assets/barbeiro.png"),
            nome: b.name,
            especialidades: barberOriginal
              ? barberOriginal.especialidades
              : ["Corte Geral"],
            servicos: barberOriginal
              ? barberOriginal.servicos
              : [{ nome: "Corte", preco: "R$30" }],
          };
        });

        setBarbeiros(comDadosCompletos);

        if (comDadosCompletos.length > 0) {
          setBarbeiroSelecionado(comDadosCompletos[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar barbeiros:", error);
        setLoading(false);
      }
    };

    loadBarbers();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Carregando barbeiros...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (barbeiros.length === 0 || !barbeiroSelecionado) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Nenhum barbeiro disponível</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroller}>
        <Text style={styles.header}>Escolha seu barbeiro</Text>

        <FlatList
          horizontal
          data={barbeiros}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.barbeiroItem,
                item.id === barbeiroSelecionado?.id && styles.selected,
              ]}
              onPress={() => setBarbeiroSelecionado(item)}
            >
              <Image source={item.foto} style={styles.foto} />
              <Text style={styles.nome}>{item.nome || item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        />

        <View style={styles.card}>
          <Text style={styles.nomeGrande}>{barbeiroSelecionado.name}</Text>
          <Text style={styles.especialidade}>
            Especialidades:{" "}
            {barbeiroSelecionado.especialidades?.join(", ") || "Não informado"}
          </Text>

          <Text style={styles.servicosTitulo}>Serviços disponíveis:</Text>
          {(barbeiroSelecionado.servicos || []).map((servico, index) => (
            <View key={index} style={styles.servicoItem}>
              <Text style={styles.servicoNome}>{servico.nome}</Text>
              <Text style={styles.servicoPreco}>{servico.preco}</Text>
            </View>
          ))}

          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              navigation.navigate("Barber", {
                barbeiro: barbeiroSelecionado,
              })
            }
          >
            <Text style={styles.botaoTexto}>
              Agendar com{" "}
              {barbeiroSelecionado.name?.split(" ")[0] || "Barbeiro"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
