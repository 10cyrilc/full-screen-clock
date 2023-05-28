import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useKeepAwake } from "expo-keep-awake";

const Timer = () => {
  useKeepAwake();

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [fontsLoaded] = useFonts({
    MissionDanger: require("../assets/font/missiondanger.ttf"),
    OriginTech: require("../assets/font/OriginTech.otf"),
    Mechsuit: require("../assets/font/Mechsuit.otf"),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const calendarDate = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const day = weekday[date.getDay()];

      const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      const formattedDay = `${calendarDate}-${month}-${year}`;

      setCurrentTime(formattedTime);
      setCurrentDate(formattedDay);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (fontsLoaded) {
    return (
      <>
        <StatusBar hidden={true} />
        <View style={styles.container}>
          <Text style={styles.clock}>{currentTime}</Text>
          <View>
            <Text
              style={[
                styles.clock,
                {
                  fontFamily: "Mechsuit",
                  fontSize: RFPercentage(3),
                },
              ]}
            >
              {currentDate}
            </Text>
            <Text
              style={[
                styles.clock,
                {
                  fontFamily: "MissionDanger",
                  fontSize: RFPercentage(5),
                },
              ]}
            >
              {currentDay}
            </Text>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text> Loading......</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  clock: {
    fontSize: RFPercentage(20),
    fontFamily: "OriginTech",
    textAlign: "center",
    color: "#00FF00",
  },
});

export default Timer;
