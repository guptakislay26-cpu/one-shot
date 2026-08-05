import { useMutation, useQuery } from '@tanstack/react-query';import { api } from '../lib/api';
export function usetaskcardsList(){return useQuery({queryKey:['task-cards'],queryFn:async()=> (await api.get('/task-cards')).data.data});}
export function usetaskcardsCreate(){return useMutation({mutationFn:async(input:unknown)=>(await api.post('/task-cards',input)).data.data});}
