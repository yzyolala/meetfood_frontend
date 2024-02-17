import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { FC } from "react";
import { ScreenNavigationProps } from "../type";

export interface ItemCardProps {
  imgSource: string;
  dishTitle: string;
  restaurantName: string;
  id: string;
}

export const ItemCard: FC<ItemCardProps> = ({
  imgSource,
  dishTitle,
  restaurantName,
  id,
}) => {
  const navigation = useNavigation<ScreenNavigationProps>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("video/[id]", {
            id,
          });
        }}
      >
        <Image
          source={{
            uri: imgSource,
          }}
          height={250}
          style={styles.img}
        />
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.dishTitle}>{dishTitle}</Text>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: "46%",
    marginBottom: 15,
    marginHorizontal: "2%",
  },
  img: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  textContainer: {
    backgroundColor: "#fff",
    paddingBottom: 15,
    paddingHorizontal: 6,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  dishTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 12,
  },
  restaurantName: {
    fontWeight: "500",
  },
});
