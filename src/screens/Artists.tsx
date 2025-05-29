import {
  ArtistAvatar,
  ItemSeparatorComponent,
  ListEmptyArtistComponent,
  ListHeaderComponent,
} from '@/components/TrackListComponents';
import {Styles} from '@/constants';
import {useArtists} from '@/store/selectors';
import {Artist} from '@/types/Artist.types';
import {artistNameFilter} from '@/utils/filters';
import React, {useMemo, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const Artists = () => {
  const ITEM_HEIGHT = 50;

  const [searchQuery, setSearchQuery] = useState('');
  const artists = useArtists();

  const filteredArtists = useMemo(() => {
    if (!searchQuery) return artists;
    return artists.filter(artistNameFilter(searchQuery));
  }, [searchQuery]);
  const scrollY = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });
  return (
    <View style={Styles.container}>
      <ListHeaderComponent
        {...{scrollY, searchQuery, setSearchQuery}}
        title={'Artists'}
      />
      <Animated.FlatList
        skipEnteringExitingAnimations
        ref={flatListRef}
        keyExtractor={(item: Artist) => item.name}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        contentContainerStyle={[Styles.flatLstBottom, {paddingHorizontal: 12}]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyArtistComponent}
        data={filteredArtists}
        renderItem={({item: artist}) => <ArtistAvatar {...{artist}} />}
      />
    </View>
  );
};

export default Artists;
