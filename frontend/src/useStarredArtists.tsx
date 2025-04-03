import { useState } from "react";

export const useStarredArtists = () => {
  const [starredArtists, setStarredArtists] = useState<string[]>([]);

  const handleStarClick = (artistId: string) => {
    if (starredArtists.includes(artistId)) {
      setStarredArtists((prev) => prev.filter((id) => id !== artistId));
    } else {
      setStarredArtists([...starredArtists, artistId]);
    }
  };
  const handleArtistClick = (artistId: string) => {
  };

  return { starredArtists, handleStarClick, handleArtistClick };

  
};


