import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Color} from '../constants/Colors';

const unEscape = htmlStr => {
  htmlStr = htmlStr.replace(/&amp;/g, '&');
  return htmlStr;
};

const GenresList = ({genres}) => {
  return (
    <View style={styles.container}>
      {genres &&
        genres.map((genre, index) => (
          <View key={index} style={styles.genreContainer}>
            <Text style={styles.genreText}>{unEscape(genre)}</Text>
          </View>
        ))}
    </View>
  );
};
export default GenresList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreContainer: {
    backgroundColor: Color.orange1,
    marginRight: 5,
    marginTop: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Color.grey4,
  },
  genreText: {
    color: Color.grey4,
  },
});
