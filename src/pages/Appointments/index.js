import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { getBookings, createTable } from "../../../database";
import { useRoute } from "@react-navigation/native";
import { auth } from "../../firebase.config";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Appointments({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [barberInfo, setBarberInfo] = useState(null);
  const route = useRoute();

  useEffect(() => {
    if (route.params?.barbeiro) {
      setBarberInfo(route.params.barbeiro);
    }
  }, [route.params]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        createTable();

        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.log("Usuário não autenticado");
          return;
        }

        console.log("Carregando agendamentos para o usuário:", currentUser.uid);
        const data = await getBookings(currentUser.uid);
        console.log("Agendamentos carregados:", data);
        setBookings(data || []);
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
        setBookings([]);
      }
    };

    const unsubscribe = navigation.addListener("focus", loadBookings);
    return unsubscribe;
  }, [navigation]);

  const formatDateBR = (dateString) => {
    try {
      const date = new Date(dateString + "T00:00:00");
      return new Intl.DateTimeFormat("pt-BR").format(date);
    } catch (error) {
      return dateString;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.dateText}>📅 {formatDateBR(item.date)}</Text>
      <Text style={styles.hourText}>⏰ {item.hour}</Text>
      <Text style={styles.barberText}>💈 Barbeiro: {item.barberName}</Text>
      <Text style={styles.serviceText}>🧴 Serviço: {item.service}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroller}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Text style={styles.title}>Meus Agendamentos</Text>

        {bookings.length === 0 ? (
          <Text style={styles.noBooking}>Nenhum agendamento encontrado.</Text>
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
