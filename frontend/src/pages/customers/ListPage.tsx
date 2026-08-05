import { useQuery } from '@tanstack/react-query';import { api } from '../../lib/api';
export default function ListPage(){const {data}=useQuery({queryKey:['customers'],queryFn:async()=> (await api.get('/customers')).data.data});return <section><h1>customers</h1><pre>{JSON.stringify(data,null,2)}</pre></section>}
