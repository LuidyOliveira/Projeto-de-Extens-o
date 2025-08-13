import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import Swiper from "react-native-swiper";
import Stars from "../../components/Stars";
import FavoriteIcon from "../../../assets/favorite.svg";
import FavoriteFilledIcon from "../../../assets/favorite_full.svg";
import BackIcon from "../../../assets/back.svg";
import BarberModal from "../../components/BarberModal";

import { toggleFavorite, isFavorite } from "../../favoriteStorage";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function Barber({ route }) {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [barberInfo, setBarberInfo] = useState(null);

  const { barber } = route.params;
  const [favorite, setFavorite] = useState(false);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (barber) {
      setBarberInfo(barber);
    } else if (route.params?.barbeiro) {
      setBarberInfo(route.params.barbeiro);
    }
  }, [barber, route.params]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (barberInfo && barberInfo.id) {
        const fav = await isFavorite(barberInfo.id);
        setFavorite(fav);
      }
    };
    checkFavorite();
  }, [barberInfo]);

  useEffect(() => {
    if (route.params?.barbeiro) {
      setBarberInfo(route.params.barbeiro);
    }
  }, [route.params]);

  const handleBackButton = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "MainTab",
          params: { screen: "Search" },
        },
      ],
    });
  };

  const defaultServices = [
    { nome: "Corte de cabelo", preco: "R$ 30,00" },
    { nome: "Barba", preco: "R$ 20,00" },
    { nome: "Sobrancelha", preco: "R$ 10,00" },
  ];

  const handleToggleFavorite = async () => {
    try {
      if (!barberInfo || !barberInfo.id) return;

      await toggleFavorite(barberInfo);

      const fav = await isFavorite(barberInfo.id);
      console.log("Favorito atualizado:", fav);
      setFavorite(fav);
    } catch (error) {
      console.log("Erro ao salvar favorito:", error);
    }
  };

  const handleServiceChoose = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const displayName = barberInfo?.name || "Barbeiro";
  const displayServices = barberInfo?.servicos || defaultServices;
  const displayPhoto =
    barberInfo?.foto || require("../../../assets/barbeiro.png");
  const displayStars = barberInfo?.rating || 4;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroller}>
        <Swiper
          style={{ height: 240 }}
          dot={<View style={styles.swipeDot} />}
          activeDot={<View style={styles.swipeDotActive} />}
          paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
          autoplay={true}
        >
          <Image
            source={require("../../../assets/barbeiro1.jpg")}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "cover",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          />
          <Image
            source={require("../../../assets/barbeiro2.jpg")}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "cover",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          />
          <Image
            source={require("../../../assets/logobarbearia.png")}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "cover",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          />
        </Swiper>

        <View style={styles.pageBody}>
          <View style={styles.userInfoArea}>
            <Image source={displayPhoto} style={styles.userAvatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userInfoName}>{displayName}</Text>
              <Stars stars={4} showNumber={true} />
            </View>
            <TouchableOpacity
              style={styles.userFavButton}
              onPress={handleToggleFavorite}
            >
              {favorite ? (
                <FavoriteFilledIcon width="24" height="24" fill="#ff9200" />
              ) : (
                <FavoriteIcon width="24" height="24" fill="#ff9200" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.serviceArea}>
            <Text style={styles.servicesTitle}>Lista de serviços</Text>

            {displayServices.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.nome}</Text>
                  <Text style={styles.servicePrice}>{service.preco}</Text>
                </View>
                <TouchableOpacity
                  style={styles.serviceChooseButton}
                  onPress={() => handleServiceChoose(service)}
                >
                  <Text style={styles.serviceChooseText}>Agendar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleBackButton}
        style={[styles.backButton, { top: insets.top + 10 }]}
      >
        <BackIcon width="44" height="44" fill="#fff" />
      </TouchableOpacity>

      <BarberModal
        show={showModal}
        setShow={setShowModal}
        user={barberInfo}
        service={selectedService}
      />
    </SafeAreaView>
  );
}
