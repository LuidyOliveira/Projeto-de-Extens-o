import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import styles from "./styles";
import { getFavorites } from "../../favoriteStorage";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "favoriteBarbers";

export default function Favorites() {
  const [favoriteBarbers, setFavoriteBarbers] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const barber = route.params?.barber || route.params?.barbeiro;

  useEffect(() => {
    const loadFavorites = async () => {
      const favorites = await getFavorites();
      setFavoriteBarbers(favorites);
    };

    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const handleRebook = (barber) => {
    navigation.navigate("Barber", { barber });
    console.log(barber);
  };

  const clearFavoritesStorage = async () => {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  };

  const clearFavorites = () => {
    Alert.alert(
      "Confirmar",
      "Tem certeza que deseja limpar todos os favoritos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            await clearFavoritesStorage();
            setFavoriteBarbers([]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroller}>
        <Text style={styles.title}>Barbeiros Favoritos</Text>

        <TouchableOpacity style={styles.clearButton} onPress={clearFavorites}>
          <Text style={styles.clearButtonText}>Limpar favoritos</Text>
        </TouchableOpacity>

        {favoriteBarbers.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhum barbeiro favoritado ainda.
          </Text>
        ) : (
          favoriteBarbers
            .filter((barber) => barber !== null && barber !== undefined)
            .map((barber) => (
              <View key={barber.id} style={styles.card}>
                <Image
                  source={
                    barber?.foto
                      ? barber.foto
                      : require("../../../assets/barbeiro.png")
                  }
                  style={styles.avatar}
                />
                <View style={styles.info}>
                  <Text style={styles.name}>{barber?.name}</Text>
                  <TouchableOpacity
                    style={styles.rebookButton}
                    onPress={() => handleRebook(barber)}
                  >
                    <Text style={styles.rebookButtonText}>
                      Agendar novamente
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
