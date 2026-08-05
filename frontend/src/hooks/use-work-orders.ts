import { useMutation, useQuery } from '@tanstack/react-query';import { api } from '../lib/api';
export function useworkordersList(){return useQuery({queryKey:['work-orders'],queryFn:async()=> (await api.get('/work-orders')).data.data});}
export function useworkordersCreate(){return useMutation({mutationFn:async(input:unknown)=>(await api.post('/work-orders',input)).data.data});}
