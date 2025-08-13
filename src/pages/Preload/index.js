import React, { useEffect } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import styles from "./styles";
import BarberLogo from "../../../assets/barber.svg";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export default function Preload() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (user) {
          navigation.reset({
            index: 0,
            routes: [{ name: "MainTab" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "SignIn" }],
          });
        }
      }, 1000);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BarberLogo width="100%" height="160" />
      <ActivityIndicator style={styles.loadIcon} size="large" color="#fff" />
    </SafeAreaView>
  );
}
