import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { Dimensions } from "react-native";

import data from "./data";
import Swiper from "react-native-deck-swiper";

const Card = ({ card }) => (
  <View style={styles.card}>
    <Image source={{ uri: card.image }} style={styles.cardImage} />
  </View>
);

export default function App() {
  const [index, setIndex] = useState(0);
  const onSwiped = () => {
    setIndex((index + 1) % data.length);
  };
  const [wanted, setWanted] = useState([]);
  return (
    <View style={styles.container}>
      <Swiper
        backgroundColor={"transparent"}
        cards={data}
        cardIndex={index}
        renderCard={(card) => <Card key={card.id} card={card} />}
        useViewOverflow={Platform.OS === "ios"}
        onSwiped={onSwiped}
        stackSize={4}
        stackScale={10}
        stackSeparation={35}
        disableTopSwipe
        disableBottomSwipe
        animateOverlayLabelsOpacity
        animateCardOpacity
        inputOverlayLabelsOpacityRangeX={[
          -Dimensions.get("window").width / 15,
          -Dimensions.get("window").width / 16,
          0,
          Dimensions.get("window").width / 16,
          Dimensions.get("window").width / 15,
        ]}
        overlayOpacityHorizontalThreshold={-Dimensions.get("window").width / 1}
        infinite
        onSwipedLeft={(index, item) => {
          console.log(index, item.name, " malzemesini almadı.");
          setWanted(wanted.filter((x) => x.id !== item.id));
        }}
        onSwipedRight={(index, item) => {
          console.log(index, item.name, " malzemesini satın aldı");
          setWanted([...wanted, item]);
        }}
        overlayLabels={{
          left: {
            title: "İlgilenmiyorum",
            style: {
              label: {
                borderRadius: 5,
                borderWidth: 5,
                width: "100%",
                paddingLeft: "50%",
                height: "75%",
                color: "red",
                fontSize: 24,
                borderColor: "red",
              },
              wrapper: {
                flezDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginTop: 20,
                marginLeft: -20,
              },
            },
          },
          right: {
            title: "İstiyorum",
            style: {
              label: {
                borderRadius: 5,
                borderWidth: 5,
                width: "100%",
                height: "75%",
                color: "red",
                fontSize: 24,
                borderColor: "green",
                color: "green",
                fontSize: 24,
              },
              wrapper: {
                flezDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: 20,
                marginLeft: 20,
              },
            },
          },
        }}
      />
      <View style={styles.BottomInfoContainer}>
        <Text style={{ marginTop: 500 }}>{JSON.stringify(wanted)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#099D72",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 0.8,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  BottomInfoContainer:{
  },
  cardImage: { width: "95%", flex: 1, resizeMode: "contain" },
});
