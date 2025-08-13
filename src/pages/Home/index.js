import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroller}>
        <Text style={[styles.title]}>Bem-vindo à</Text>
        <Image
          source={require("../../../assets/logobarbearia2.png")} //
          style={styles.heroImage}
          resizeMode="cover"
        />

        <Text style={styles.subtitle}>
          Cuidando do seu visual com estilo e qualidade.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Horários de Funcionamento</Text>
          <Text style={styles.infoText}>Seg - Sáb: 09h às 20h</Text>
          <Text style={styles.infoText}>Dom: Fechado</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={styles.buttonText}>Ver Nossos Serviços</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
