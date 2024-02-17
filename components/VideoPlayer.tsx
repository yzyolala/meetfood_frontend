import { ResizeMode, Video, AVPlaybackStatusSuccess } from "expo-av";
import { useRef, useState, FC, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { ScreenNavigationProps } from "../type";

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl: string;
  dishTitle: string;
  restaurantName: string;
  videoHeight: number;
  activeVideoIndex: number;
  selfVideoIndex: number;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  videoUrl,
  posterUrl,
  dishTitle,
  restaurantName,
  videoHeight,
  activeVideoIndex,
  selfVideoIndex,
}) => {
  const video = useRef<Video>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProps>();

  const [status, setStatus] = useState<Partial<AVPlaybackStatusSuccess>>({});

  const toggleVideoPlay = () => {
    if (video.current) {
      status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
    }
  };

  useEffect(() => {
    // this video is the active video
    if (selfVideoIndex === activeVideoIndex) {
      video.current?.playAsync();
    } else {
      video.current?.pauseAsync();
    }
  }, [activeVideoIndex]);

  return (
    <View style={{ ...styles.container, height: videoHeight }}>
      <Video
        ref={video}
        style={styles.video}
        usePoster={true}
        posterSource={{
          uri: posterUrl,
        }}
        posterStyle={{
          height: videoHeight,
        }}
        source={{
          uri: videoUrl,
        }}
        resizeMode={ResizeMode.STRETCH}
        isLooping
        onPlaybackStatusUpdate={(status) => {
          // success case
          if (status.isLoaded) {
            setStatus(status);
          }

          // error handling
        }}
      />
      <View
        style={{
          ...styles.controlContainer,
          left: insets.left,
        }}
      >
        <FontAwesome.Button
          name="arrow-left"
          size={26}
          onPress={() => {
            navigation.navigate("index");
            video.current?.pauseAsync();
          }}
          backgroundColor="transparent"
          color="grey"
          style={{ padding: 20 }}
        />
      </View>
      <View
        style={{
          ...styles.controlContainer,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {status.isPlaying ? null : (
          <FontAwesome.Button
            name="play-circle"
            size={50}
            onTouchEnd={toggleVideoPlay}
            backgroundColor="transparent"
            color="grey"
          />
        )}
      </View>
      <View
        style={{
          ...styles.controlContainer,
          bottom: insets.bottom,
          paddingBottom: 12,
          paddingLeft: 12,
        }}
      >
        <Text style={styles.dishTitle}>{dishTitle}</Text>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
      </View>
      <View
        style={{
          ...styles.controlContainer,
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 50,
        }}
      >
        <Pressable
          onPress={toggleVideoPlay}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  video: {
    height: "100%",
    width: "100%",
  },
  controlContainer: {
    position: "absolute",
    pointerEvents: "box-none",
  },
  dishTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
  restaurantName: {
    color: "#fff",
  },
});
