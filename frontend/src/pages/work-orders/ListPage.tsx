import { useQuery } from '@tanstack/react-query';import { api } from '../../lib/api';
export default function ListPage(){const {data}=useQuery({queryKey:['work-orders'],queryFn:async()=> (await api.get('/work-orders')).data.data});return <section><h1>work orders</h1><pre>{JSON.stringify(data,null,2)}</pre></section>}
