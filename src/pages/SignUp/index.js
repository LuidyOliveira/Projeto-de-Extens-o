import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import styles from "./styles";
import BarberLogo from "../../../assets/barber.svg";
import EmailIcon from "../../../assets/email.svg";
import LockIcon from "../../../assets/lock.svg";
import PersonIcon from "../../../assets/person.svg";
import SignInput from "../../components/SignInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

export default function SignIn() {
  const navigation = useNavigation();

  const [nameField, setNameField] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");

  function newUser() {
    if (nameField === "" || userMail === "" || userPass === "") {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    } else {
      createUserWithEmailAndPassword(auth, userMail, userPass)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert(
            "Sucesso",
            "O usuário " +
              nameField +
              " foi cadastrado com sucesso! Faça o login."
          );
          navigation.reset({
            routes: [{ name: "SignIn" }],
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
          navigation.reset({
            routes: [{ name: "SignIn" }],
          });
        });
    }
  }

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{ name: "SignIn" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarberLogo width="100%" height="160" />
      <View style={styles.inputArea}>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={(text) => setNameField(text)}
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail"
          value={userMail}
          onChangeText={(text) => setUserMail(text)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={userPass}
          onChangeText={(text) => setUserPass(text)}
          password={true}
        />
        <TouchableOpacity style={styles.customButton} onPress={newUser}>
          <Text style={styles.customButtonText}>CADASTRAR</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.signButton}
        onPress={handleMessageButtonClick}
      >
        <Text style={styles.signMessageText}>Já possui uma conta? </Text>
        <Text style={styles.signMessageTextBold}>Faça login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
