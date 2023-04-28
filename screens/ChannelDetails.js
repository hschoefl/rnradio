import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import GenresList from '../components/GenresList';
import IconButton from '../components/IconButton';
import {Color} from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  addChannelToFavorites,
  removeChannelFromFavorites,
} from '../features/channelSlice';

const ChannelDetails = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const route = useRoute();
  const {channel} = route.params;

  const dispatch = useDispatch();

  const {favoriteChannels} = useSelector(state => state.channel);
  // console.log(favoriteChannels);

  useEffect(() => {
    const isAlreadyFavorite = favoriteChannels.filter(
      item => item.name === channel.name,
    );

    if (isAlreadyFavorite.length > 0) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }

    // console.log(isFavorite);
  }, [favoriteChannels, channel.name]);

  const favoriteHandler = () => {
    if (!isFavorite) {
      // add channel
      // dispatch(addToFavorites(channel));
      dispatch(addChannelToFavorites(channel));
    } else {
      // otherwise remove channel
      dispatch(removeChannelFromFavorites(channel));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{channel.name}</Text>
      <View style={styles.imageContainer}>
        {channel.logoUrl.includes('.svg') ? (
          <SvgUri width="100%" height="100%" uri={channel.logoUrl} />
        ) : (
          <Image style={styles.image} source={{uri: channel.logoUrl}} />
        )}
      </View>
      <GenresList genres={channel.genre} />
      <Text style={styles.description}>{channel.description}</Text>

      {isFavorite ? (
        <IconButton
          icon="heart-outline"
          color={Color.blue4}
          size={24}
          onPress={favoriteHandler}>
          Von Favoriten entfernen
        </IconButton>
      ) : (
        <IconButton
          icon="heart"
          color={Color.blue4}
          size={24}
          onPress={favoriteHandler}>
          Zu Favoriten hinzufügen
        </IconButton>
      )}
    </View>
  );
};
export default ChannelDetails;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 6,
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
