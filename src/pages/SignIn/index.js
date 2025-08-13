import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./styles";
import BarberLogo from "../../../assets/barber.svg";
import EmailIcon from "../../../assets/email.svg";
import LockIcon from "../../../assets/lock.svg";
import SignInput from "../../components/SignInput";
import { auth } from "../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const navigation = useNavigation();

  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");

  function userLogin() {
    signInWithEmailAndPassword(auth, userMail, userPass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login realizado com sucesso:", user.uid);
        navigation.navigate("MainTab");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{ name: "SignUp" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarberLogo width="100%" height="160" />
      <View style={styles.inputArea}>
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
        <TouchableOpacity style={styles.customButton} onPress={userLogin}>
          <Text style={styles.customButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.signButton}
        onPress={handleMessageButtonClick}
      >
        <Text style={styles.signMessageText}>Ainda não possui uma conta? </Text>
        <Text style={styles.signMessageTextBold}>Cadastre-se</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
