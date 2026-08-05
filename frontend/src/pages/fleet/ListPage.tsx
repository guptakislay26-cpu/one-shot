import { useQuery } from '@tanstack/react-query';import { api } from '../../lib/api';
export default function ListPage(){const {data}=useQuery({queryKey:['fleet'],queryFn:async()=> (await api.get('/fleet')).data.data});return <section><h1>fleet</h1><pre>{JSON.stringify(data,null,2)}</pre></section>}
