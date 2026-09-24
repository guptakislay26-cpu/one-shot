import { useMutation, useQuery } from '@tanstack/react-query';import { api } from '../lib/api';
export function usefleetList(){return useQuery({queryKey:['fleet'],queryFn:async()=> (await api.get('/fleet')).data.data});}
export function usefleetCreate(){return useMutation({mutationFn:async(input:unknown)=>(await api.post('/fleet',input)).data.data});}
