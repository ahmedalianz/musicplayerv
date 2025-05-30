import getMusicFiles from '../getMusicFiles';
import {getAll} from '@kingfang007/react-native-get-music-files';
import requestStoragePermission from '../requestStoragePermission';

// Mock the modules
jest.mock('@kingfang007/react-native-get-music-files');
jest.mock('./requestStoragePermission');

const mockGetAll = getAll as jest.MockedFunction<typeof getAll>;
const mockRequestStoragePermission =
  requestStoragePermission as jest.MockedFunction<
    typeof requestStoragePermission
  >;

describe('getMusicFiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Permission denied
  it('returns undefined if permission is denied', async () => {
    mockRequestStoragePermission.mockResolvedValue(false);
    const result = await getMusicFiles();
    expect(result).toBeUndefined();
    expect(mockGetAll).not.toHaveBeenCalled();
  });

  // Test 2: Successful track fetching
  it('returns formatted tracks when permission is granted', async () => {
    mockRequestStoragePermission.mockResolvedValue(true);
    mockGetAll.mockResolvedValue([
      {
        url: 'file://track1.mp3',
        path: 'file://track1.mp3',
        title: 'Track 1',
        artist: 'Artist A',
        album: 'Album X',
        duration: 180,
        cover: 'base64encodedImage',
      },
      {
        url: 'file://track2.mp3',
        title: 'Track 2',
        author: 'Artist B',
        duration: 200,
        artworkUrl: 'https://example.com/artwork.jpg', // Tests external artwork
      },
    ]);

    const result = await getMusicFiles();
    expect(result).toEqual([
      {
        id: 'file://track1.mp3Track 1',
        url: 'file://track1.mp3',
        title: 'Track 1',
        artist: 'Artist A',
        album: 'Album X',
        duration: 180,
        artwork: 'data:image/jpeg;base64,base64encodedImage',
      },
      {
        id: 'file://track2.mp3Track 2',
        url: 'file://track2.mp3',
        title: 'Track 2',
        artist: 'Artist B',
        album: 'Unknown Album',
        duration: 200,
        artwork: 'https://example.com/artwork.jpg',
      },
    ]);
  });

  // Test 3: Empty response handling
  it('handles empty track list', async () => {
    mockRequestStoragePermission.mockResolvedValue(true);
    mockGetAll.mockResolvedValue([]);
    const result = await getMusicFiles();
    expect(result).toEqual([]);
  });

  // Test 4: Artwork formatting
  it('correctly formats artwork URIs', async () => {
    mockRequestStoragePermission.mockResolvedValue(true);
    mockGetAll.mockResolvedValue([
      {
        url: 'file://track3.mp3',
        title: 'Track 3',
        cover: 'data:image/png;base64,abc123', // Already formatted
      },
      {
        url: 'file://track4.mp3',
        title: 'Track 4',
        cover: 'rawBase64', // Needs formatting
      },
      {
        url: 'file://track5.mp3',
        title: 'Track 5',
        // No cover
      },
    ]);

    const result = await getMusicFiles();
    expect(result?.[0].artwork).toBe('data:image/png;base64,abc123');
    expect(result?.[1].artwork).toBe('data:image/jpeg;base64,rawBase64');
    expect(result?.[2].artwork).toBeNull();
  });

  // Test 5: Error handling
  it('logs errors and continues', async () => {
    mockRequestStoragePermission.mockResolvedValue(true);
    mockGetAll.mockRejectedValue(new Error('API failed'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const result = await getMusicFiles();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching songs:',
      expect.any(Error)
    );
    expect(result).toBeUndefined();
  });
});
