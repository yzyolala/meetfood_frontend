import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ItemCard } from "./ItemCard";
import { BASE_URL } from "../utils";
import { videoItemsListAtom } from "../atom";
import { VideoPostItem } from "../type";

export const ItemList = () => {
  const [itemsData, setItemsData] = useAtom(videoItemsListAtom);
  const [loading, setLoading] = useState(false);

  const fetchVideoPosts = () => {
    setLoading(true);
    axios
      .get<VideoPostItem[]>(`${BASE_URL}/api/v1/video/videos?size=50`)
      .then((result) => {
        setItemsData(result.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideoPosts();
  }, []);

  if (loading) {
    <FontAwesome name="spinner" size={60} />;
  }

  return (
    <FlatList
      data={itemsData}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchVideoPosts} />
      }
      renderItem={({ item, index }) => (
        <ItemCard
          key={index}
          imgSource={item.coverImageUrl}
          dishTitle={item.postTitle}
          restaurantName={item.restaurantName}
          id={item._id}
        />
      )}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
