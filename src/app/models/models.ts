export interface Paging<T> {
  items:  T[];
  total:  number;
  limit:  number;
  offset: number;
}

export interface Image {
  url: string;
}

export interface Followers {
  total: number;
}

export interface Artist {
  id:         string;
  name:       string;
  images:     Image[];
  genres?:    string[];
  followers:  Followers;
  popularity: number;
}

export interface Album {
  id:          string;
  name:        string;
  images:      Image[];
  artists:     Artist[];
  release_date?: string;
}

export interface Track {
  id:           string;
  name:         string;
  album:        { images: Image[]; name: string };
  artists:      { name: string }[];
  duration_ms?: number;
  track_number?: number;
}

export interface NewReleasesResponse {
  albums: Paging<Album>;
}

export interface AlbumTracksResponse {
  items: Track[];
}

export interface TopTracksResponse {
  tracks: Track[];
}

export interface SearchArtistsResponse {
  artists: {
    items: Artist[];
    total?: number;
    limit?: number;
    offset?: number;
  };
}

export interface SearchResponse {
  artists: Paging<Artist>;
  albums:  Paging<Album>;
}

export interface AlbumWithNames extends Album {
  artistNames: string;
}
