import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const addChannelToFavorites = createAsyncThunk(
  'channel/addChannelToFavorites',
  async (channel, {getState, rejectWithValue}) => {
    // console.log(channel);

    // get the current favorite channels from state
    const {favoriteChannels} = getState().channel;

    const tempFavChannels = [...favoriteChannels];

    // try to write it to async storge
    try {
      tempFavChannels.push(channel);
      await AsyncStorage.setItem(
        'favoriteChannels',
        JSON.stringify(tempFavChannels),
      );
      return tempFavChannels;
    } catch (error) {
      rejectWithValue('Can not save favoriteChannels to AsyncStorage');
    }
  },
);

export const removeChannelFromFavorites = createAsyncThunk(
  'channel/removeChannelFromFavorites',
  async (channel, {getState, rejectWithValue}) => {
    // get the current favorite channels from state
    const {favoriteChannels} = getState().channel;

    const tempFavChannels = favoriteChannels.filter(
      item => item.name !== channel.name,
    );

    // try to write it to async storge
    try {
      await AsyncStorage.setItem(
        'favoriteChannels',
        JSON.stringify(tempFavChannels),
      );
      return tempFavChannels;
    } catch (error) {
      rejectWithValue('Can not save favoriteChannels to AsyncStorage');
    }
  },
);

const initialState = {
  allChannels: [],
  favoriteChannels: [],
  activeChannel: null,
  isPlaying: false,
  errorMessage: '',
};

export const channelSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAllChannels: (state, action) => {
      state.allChannels = action.payload;
    },
    toggleIsPlaying: (state, action) => {
      if (state.isPlaying) {
        state.isPlaying = false;
        state.activeChannel = null;
      } else {
        state.isPlaying = true;
        state.activeChannel = action.payload;
      }
    },
    setFavorites: (state, action) => {
      state.favoriteChannels = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favoriteChannels.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favoriteChannels = state.favoriteChannels.filter(
        channel => channel.name !== action.payload.name,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addChannelToFavorites.rejected, (state, action) => {
        // console.log(action.payload);
        state.errorMessage = action.payload;
      })
      .addCase(addChannelToFavorites.fulfilled, (state, action) => {
        // console.log('fullfilled: ', action.payload);
        state.favoriteChannels = action.payload;
      })
      .addCase(removeChannelFromFavorites.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(removeChannelFromFavorites.fulfilled, (state, action) => {
        state.favoriteChannels = action.payload;
      });
  },
});

export const {
  setAllChannels,
  toggleIsPlaying,
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} = channelSlice.actions;

export default channelSlice.reducer;
