import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import AppText from "../components/AppText"
import colors from "../../config/colors";

const Card: React.FC<{ title: string, subTitle?: string, imageUrl: string, onPress:any }> = ({ title, subTitle, imageUrl, onPress}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
