import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";

export default function Profile() {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        setDisplayName(user.displayName || "Usuário sem nome");
        setEmail(user.email);
      }
    };

    fetchUserData();
  }, []);

  function logout() {
    signOut(auth)
      .then(() => {
        Alert.alert("Sucesso", "Você se desconectou com sucesso!");
        navigation.reset({
          index: 0,
          routes: [{ name: "SignIn" }],
        });
      })
      .catch((error) => {
        Alert.alert("Erro", error.message);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>👤 Você está logado(a)!</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{displayName}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Sair da conta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
