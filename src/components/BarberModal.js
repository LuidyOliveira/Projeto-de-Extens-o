import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ExpandIcon from "../../assets/expand.svg";
import NavPrevIcon from "../../assets/nav_prev.svg";
import NavNextIcon from "../../assets/nav_next.svg";
import { createTable, saveBooking, getBookings } from "../../database";
import { getAuth } from "firebase/auth";

const styles = StyleSheet.create({
  modalArea: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalBody: {
    backgroundColor: "#B0B0B0",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
  },
  modalItem: {
    backgroundColor: "#D4AF37",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 20,
    marginRight: 15,
  },
  userName: {
    color: "#fefeff",
    fontFamily: "serif",
    fontSize: 18,
    fontWeight: "bold",
  },
  serviceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fefeff",
    fontFamily: "serif",
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fefeff",
    fontFamily: "serif",
  },
  finishButton: {
    backgroundColor: "#C18E00",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  finishText: {
    color: "#fefeff",
    fontFamily: "serif",
    fontSize: 17,
    fontWeight: "bold",
  },
  dateInfo: {
    flexDirection: "row",
  },
  datePrevArea: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  dateNextArea: {
    flex: 1,
    alignItems: "flex-start",
  },
  dateTitleArea: {
    width: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  dateTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fefeff",
    fontFamily: "serif",
  },
  dateItem: {
    width: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  dateItemWeekday: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fefeff",
    fontFamily: "serif",
  },
  dateItemNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fefeff",
    fontFamily: "serif",
  },
  selectedDayItem: {
    backgroundColor: "#C18E00",
  },
  dateItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selectedDayText: {
    color: "#fff",
  },
  timeItem: {
    width: 75,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  timeItemText: {
    fontSize: 16,
    color: "#fefeff",
    fontFamily: "serif",
  },
  selectedHourItem: {
    backgroundColor: "#C18E00",
  },
  selectedTextItem: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const days = ["Dom ", "Seg ", "Ter ", "Qua ", "Qui ", "Sex ", "Sab "];

export default function BarberModal({ show, setShow, user, service }) {
  const navigation = useNavigation();

  const [bookings, setBookings] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  const [barberInfo, setBarberInfo] = useState(null);

  const scrollViewRef = useRef(null);

  const route = useRoute();

  const barberHours = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const isDayFullyBooked = (day) => {
    return day && day.booked && day.booked.length >= barberHours.length;
  };

  useEffect(() => {
    if (route.params?.barbeiro) {
      setBarberInfo(route.params.barbeiro);
    }
  }, [route.params]);

  useEffect(() => {
    if (show) {
      loadBookings();
      let today = new Date();
      setSelectedYear(today.getFullYear());
      setSelectedMonth(today.getMonth());

      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      let todayString = `${year}-${month}-${day}`;
      setSelectedDay(todayString);

      setSelectedHour(null);
    }
  }, [show]);

  const loadBookings = async () => {
    try {
      createTable();

      const allBookings = await getBookings();

      console.log("Bookings carregados:", allBookings);
      setBookings(allBookings || []);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
      setBookings([]);
    }
  };

  useEffect(() => {
    if (
      !selectedYear ||
      selectedMonth === null ||
      selectedMonth === undefined
    ) {
      return;
    }

    let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    let newListDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      let d = new Date(selectedYear, selectedMonth, i);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      let dateString = `${year}-${month}-${day}`;

      const dayBookings = (bookings || []).filter(
        (booking) => booking && booking.date === dateString
      );
      const bookedHours = dayBookings
        .map((booking) => booking.hour)
        .filter(Boolean);

      newListDays.push({
        status: true,
        booked: bookedHours,
        weekday: days[d.getDay()] || "",
        number: i,
        date: dateString,
      });
    }

    setListDays(newListDays);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    if (selectedYear === currentYear && selectedMonth === currentMonth) {
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      let todayString = `${year}-${month}-${day}`;

      const todayData = newListDays.find((d) => d.date === todayString);
      if (todayData && !isDayFullyBooked(todayData)) {
        setSelectedDay(todayString);
      } else {
        setSelectedDay(null);
      }
    } else {
      setSelectedDay(null);
    }

    setSelectedHour(null);
  }, [selectedMonth, selectedYear, bookings]);

  useEffect(() => {
    if (selectedDay && listDays.length > 0) {
      const currentDay = listDays.find((day) => day.date === selectedDay);
      if (currentDay && currentDay.booked) {
        const availableHours = barberHours.filter(
          (hour) => !currentDay.booked.includes(hour)
        );
        setListHours(availableHours);
        setSelectedHour(null);
      }

      scrollToSelectedDay();
    } else {
      setListHours([]);
    }
  }, [selectedDay, listDays]);

  const scrollToSelectedDay = () => {
    if (selectedDay && listDays.length > 0 && scrollViewRef.current) {
      const selectedDayIndex = listDays.findIndex(
        (day) => day.date === selectedDay
      );
      if (selectedDayIndex !== -1) {
        const itemWidth = 45;
        const scrollPosition = selectedDayIndex * itemWidth;

        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: scrollPosition,
            animated: true,
          });
        }, 100);
      }
    }
  };

  const handleCloseButton = () => {
    setShow(false);
  };

  const handleLeftDateClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(null);
  };

  const handleRightDateClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(null);
  };

  const handleFinishClick = async () => {
    if (selectedDay && selectedHour) {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          alert("Você precisa estar logado para agendar.");
          return;
        }

        await saveBooking({
          userId: currentUser.uid,
          date: selectedDay,
          hour: selectedHour,
          barberName: barberInfo?.name || "Qualquer barbeiro",
          service: service?.nome || "Qualquer serviço",
        });

        Alert.alert("Sucesso", "Agendamento salvo com sucesso!");
        setShow(false);
        await loadBookings();
        navigation.navigate("MainTab", { screen: "Appointments" });
      } catch (error) {
        console.error("Erro ao salvar agendamento:", error);
        alert("Erro ao salvar agendamento.");
      }
    } else {
      Alert.alert("Erro", "Por favor, selecione uma data e um horário.");
    }
  };

  return (
    <Modal transparent={true} visible={show} animationType="slide">
      <View style={styles.modalArea}>
        <View style={styles.modalBody}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseButton}
          >
            <ExpandIcon width="40" height="40" fill="#000" />
          </TouchableOpacity>

          <View style={styles.modalItem}>
            <View style={styles.userInfo}>
              <Image
                source={user?.foto || require("../../assets/barbeiro.png")}
                style={styles.userAvatar}
              />
              <Text style={styles.userName}>
                {barberInfo?.name || "Barbeiro"}
              </Text>
            </View>
          </View>

          <View style={styles.modalItem}>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>
                {service?.nome || "Serviço"}
              </Text>
              <Text style={styles.servicePrice}>
                {service?.preco || "R$ 30"}
              </Text>
            </View>
          </View>

          <View style={styles.modalItem}>
            <View style={styles.dateInfo}>
              <TouchableOpacity
                style={styles.datePrevArea}
                onPress={handleLeftDateClick}
              >
                <NavPrevIcon width="35" height="35" fill="#000" />
              </TouchableOpacity>
              <View style={styles.dateTitleArea}>
                <Text style={styles.dateTitle}>
                  {months[selectedMonth] || ""} {selectedYear || ""}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.dateNextArea}
                onPress={handleRightDateClick}
              >
                <NavNextIcon width="35" height="35" fill="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollViewRef}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {listDays.map((day, index) => (
                <TouchableOpacity
                  key={`day-${index}-${day.date}`}
                  style={[
                    styles.dateItem,
                    selectedDay === day.date && styles.selectedDayItem,
                    isDayFullyBooked(day) && { opacity: 0.5 },
                  ]}
                  onPress={() =>
                    !isDayFullyBooked(day) ? setSelectedDay(day.date) : null
                  }
                  disabled={isDayFullyBooked(day)}
                >
                  <Text
                    style={[
                      styles.dateItemWeekday,
                      selectedDay === day.date && styles.selectedDayText,
                    ]}
                  >
                    {day.weekday || ""}
                  </Text>
                  <Text
                    style={[
                      styles.dateItemNumber,
                      selectedDay === day.date && styles.selectedDayText,
                    ]}
                  >
                    {day.number || ""}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {selectedDay && listHours && listHours.length > 0 && (
            <View style={styles.modalItem}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {listHours.map((hour, index) => (
                  <TouchableOpacity
                    key={`hour-${index}-${hour}`}
                    style={[
                      styles.timeItem,
                      selectedHour === hour && styles.selectedHourItem,
                    ]}
                    onPress={() => setSelectedHour(hour)}
                  >
                    <Text
                      style={[
                        styles.timeItemText,
                        selectedHour === hour && styles.selectedTextItem,
                      ]}
                    >
                      {hour || ""}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinishClick}
          >
            <Text style={styles.finishText}>Finalizar Agendamento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
