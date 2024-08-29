import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REST_API_URL } from "../../services/data"


const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzI0OTIwNjM1LCJleHAiOjE3MjUwMDcwMzUsIm5iZiI6MTcyNDkyMDYzNSwianRpIjoiaGpveTVWZUpMZzlOSGFwYiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Xnlc3za_S2oqs2X9cqS-wfS3eubSatW91hz7IC88BCw';

interface Resource {
  resources_id: number;
  resources_name: string;
  resources_description: string;
}

export const ressourceSlice = createApi({
  reducerPath: 'resources',
  baseQuery: fetchBaseQuery({ 
    baseUrl: REST_API_URL,
    prepareHeaders(headers){
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  endpoints(builder){
    return {
      fetchResource: builder.query<Resource[], number|void>({     
        query:(limit = 10) => ({
          url: `resources?limit=${limit}`,
          method: 'POST',
          timeout: 5000
        }),
        
      })
    }
  }
});

export const { useFetchResourceQuery } = ressourceSlice;