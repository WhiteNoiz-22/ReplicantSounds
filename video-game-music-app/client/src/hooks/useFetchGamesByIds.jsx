import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Will fetch our games by ids
function useFetchGamesByIds(gameIds) {

  // We use a useQuery hook
  return useQuery({
    // Requires game ids
    queryKey: ["libraryGames", gameIds],
    queryFn: async () => {
      // if there are no games, return an emptu array
      if (!gameIds || gameIds.length === 0) return [];
      // Our api key
      const apiKey = import.meta.env.VITE_API_KEY;
      // We make a request to the api to get the games, and return the data
      const requests = gameIds.map(id =>
        axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`).then(res => res.data).catch(() => null)
      );
      const results = await Promise.all(requests);
      // Filters out nulls and failed fetches
      return results.filter(Boolean);

    },
    enabled: !!gameIds && gameIds.length > 0,
    staleTime: 1000 * 60 * 60,
  });
}

export default useFetchGamesByIds;