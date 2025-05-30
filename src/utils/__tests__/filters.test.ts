import {Artist} from '@/types/Artist.types';
import {Playlist, TrackV} from '@/types/TracksList.types';
import {
  trackTitleFilter,
  artistNameFilter,
  playlistNameFilter,
  groupTracksByArtist,
} from '@/utils/filters';

// Mock data
const mockTracks: TrackV[] = [
  {id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', url: ''},
  {id: '2', title: 'Radioactive', artist: 'Imagine Dragons', url: ''},
  {id: '3', title: 'Thunder', artist: 'Imagine Dragons', url: ''},
  {id: '4', title: 'We Will Rock You', artist: 'Queen', url: ''},
  {id: '5', title: 'Demons', artist: 'Imagine Dragons', url: ''},
  {id: '6', title: null, artist: 'Unknown Artist', url: ''},
];

const mockArtists: Artist[] = [
  {tracks: [], name: 'Queen'},
  {tracks: [], name: 'Imagine Dragons'},
  {tracks: [], name: 'The Beatles'},
];

const mockPlaylists: Playlist[] = [
  {playListId: 1, playListName: 'Rock Classics', tracks: []},
  {playListId: 2, playListName: 'Pop Hits', tracks: []},
  {playListId: 3, playListName: 'Workout Mix', tracks: []},
];

// Tests
describe('Filter Utilities', () => {
  // 1. trackTitleFilter
  describe('trackTitleFilter', () => {
    it('filters tracks by title (case-insensitive)', () => {
      const filter = trackTitleFilter('bohemi');
      const result = mockTracks.filter(filter).length;
      expect(result).toEqual(
        [{id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', url: ''}].length
      );
    });

    it('returns empty array if no match', () => {
      const filter = trackTitleFilter('nonexistent');
      expect(mockTracks.filter(filter)).toEqual([]);
    });
  });

  // 2. artistNameFilter
  describe('artistNameFilter', () => {
    it('filters artists by name (case-insensitive)', () => {
      const filter = artistNameFilter('drag');
      expect(mockArtists.filter(filter).length).toEqual(
        [{id: '2', name: 'Imagine Dragons'}].length
      );
    });

    it('returns empty array if no match', () => {
      const filter = artistNameFilter('Taylor Swift');
      expect(mockArtists.filter(filter)).toEqual([]);
    });
  });

  // 3. playlistNameFilter
  describe('playlistNameFilter', () => {
    it('filters playlists by name (case-insensitive)', () => {
      const filter = playlistNameFilter('rock');
      expect(mockPlaylists.filter(filter).length).toEqual(
        [{id: '1', playListName: 'Rock Classics'}].length
      );
    });

    it('handles partial matches', () => {
      const filter = playlistNameFilter('mix');
      expect(mockPlaylists.filter(filter).length).toEqual(
        [{id: '3', playListName: 'Workout Mix'}].length
      );
    });
  });

  // 4. groupTracksByArtist
  describe('groupTracksByArtist', () => {
    it('groups tracks by artist name', () => {
      const result = groupTracksByArtist(mockTracks).length;
      expect(result).toEqual(
        [
          {
            name: 'Queen',
            tracks: [
              {id: '1', title: 'Bohemian Rhapsody', artist: 'Queen'},
              {id: '4', title: 'We Will Rock You', artist: 'Queen'},
            ],
          },
          {
            name: 'Imagine Dragons',
            tracks: [
              {id: '2', title: 'Radioactive', artist: 'Imagine Dragons'},
              {id: '3', title: 'Thunder', artist: 'Imagine Dragons'},
              {id: '5', title: 'Demons', artist: 'Imagine Dragons'},
            ],
          },
          {
            name: 'Unknown Artist',
            tracks: [{id: '6', title: null, artist: 'Unknown Artist'}],
          },
        ].length
      );
    });

    it('returns empty array for empty input', () => {
      expect(groupTracksByArtist([])).toEqual([]);
    });
  });
});
