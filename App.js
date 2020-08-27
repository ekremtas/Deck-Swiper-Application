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

const CardDetails = ({ index }) => (
  <View style={styles.cardDetails}>
    <Text style={[styles.text, styles.name]}>{data[index].name}</Text>
    <Text style={[styles.text, styles.price]}>{data[index].price}</Text>
    <Text style={[styles.text, styles.piece]}>({data[index].piece} Adet)</Text>
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
      <View style={styles.swiperContainer}>
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
          overlayOpacityHorizontalThreshold={
            -Dimensions.get("window").width / 1
          }
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
                  paddingLeft: "50%",
                  color: "red",
                  borderColor: "red",
                  ...styles.overlayLabelStyle,
                },
                wrapper: {
                  marginLeft: -20,
                  ...styles.overlayLabelWrapper,
                },
              },
            },
            right: {
              title: "İstiyorum",
              style: {
                label: {
                  color: "green",
                  borderColor: "green",
                  ...styles.overlayLabelStyle,
                },
                wrapper: {
                  ...styles.overlayLabelWrapper,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.BottomInfoContainer}>
        <CardDetails index={index} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#099D72",
  },
  card: {
    flex: 0.75,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  swiperContainer: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  BottomInfoContainer: {
    flex: 0.2,
  },
  cardImage: { width: "95%", flex: 1, resizeMode: "contain" },
  cardDetails: {
    alignItems: "center",
  },
  text: { color: "white", fontWeight: "800" },
  name: { fontSize: 25, marginBottom: 5, fontWeight: "600" },
  price: { fontSize: 30 },
  piece: { fontSize: 15 },
  overlayLabelStyle: {
    borderRadius: 5,
    borderWidth: 5,
    width: "100%",
    height: "70%",
    fontSize: 24,
  },
  overlayLabelWrapper: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginTop: 20,
  },
});
