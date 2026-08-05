import { useQuery } from '@tanstack/react-query';import { api } from '../../lib/api';
export default function ListPage(){const {data}=useQuery({queryKey:['task-cards'],queryFn:async()=> (await api.get('/task-cards')).data.data});return <section><h1>task cards</h1><pre>{JSON.stringify(data,null,2)}</pre></section>}
