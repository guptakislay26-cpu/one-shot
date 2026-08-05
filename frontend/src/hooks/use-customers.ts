import { useMutation, useQuery } from '@tanstack/react-query';import { api } from '../lib/api';
export function usecustomersList(){return useQuery({queryKey:['customers'],queryFn:async()=> (await api.get('/customers')).data.data});}
export function usecustomersCreate(){return useMutation({mutationFn:async(input:unknown)=>(await api.post('/customers',input)).data.data});}
