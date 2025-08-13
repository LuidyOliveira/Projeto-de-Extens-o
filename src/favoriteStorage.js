import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";

const getFavoritesKey = () => {
  const uid = getAuth().currentUser?.uid;
  return uid ? `favoriteBarbers_${uid}` : null;
};

export const getFavorites = async () => {
  try {
    const key = getFavoritesKey();
    if (!key) return [];
    const json = await AsyncStorage.getItem(key);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Erro ao buscar favoritos:", e);
    return [];
  }
};

export const toggleFavorite = async (barber) => {
  try {
    const favorites = await getFavorites();
    const exists = favorites.find((b) => b.id === barber.id);

    let newFavorites;
    if (exists) {
      newFavorites = favorites.filter((b) => b.id !== barber.id);
    } else {
      newFavorites = [...favorites, barber];
    }

    const key = getFavoritesKey();
    if (!key) throw new Error("Usuário não autenticado para salvar favoritos");

    await AsyncStorage.setItem(key, JSON.stringify(newFavorites));
    return newFavorites;
  } catch (e) {
    console.error("Erro ao salvar favorito:", e);
  }
};

export const isFavorite = async (barberId) => {
  try {
    const favorites = await getFavorites();
    return favorites.some((b) => b.id === barberId);
  } catch (e) {
    console.error("Erro ao verificar favorito:", e);
    return false;
  }
};

export const clearFavorites = async () => {
  const key = getFavoritesKey();
  if (!key) return;
  await AsyncStorage.removeItem(key);
};
