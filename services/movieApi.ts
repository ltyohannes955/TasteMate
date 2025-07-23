import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", process.env.TMDB_BEARER as string);
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Movies
    getPopularMovies: builder.query<any, void>({
      query: () => "movie/popular?language=en-US&page=1",
    }),

    // TV Shows
    getPopularTVShows: builder.query<any, void>({
      query: () => "tv/popular?language=en-US&page=1",
    }),
  }),
});

// Export the hooks
export const { useGetPopularMoviesQuery, useGetPopularTVShowsQuery } = movieApi;
