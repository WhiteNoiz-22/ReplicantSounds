import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Handles our API calls
function useFetchGames(query) {
  // Fetches API using axios
  const fetchGames = async () => {
    let url = `https://api.rawg.io/api/games?key=${
      import.meta.env.VITE_API_KEY
    }`;
    //Adds a search extension to our url with the query, if we have one
    if (query && query.trim() && query.length > 0) {
      url += `&search=${encodeURIComponent(query)}`;
    }
    const response = await axios.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["games", query],
    queryFn: fetchGames,
    enabled: true,
    //Ensures that we don't do unnesscary API calls, our staletime is an hour
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}

export default useFetchGames;
