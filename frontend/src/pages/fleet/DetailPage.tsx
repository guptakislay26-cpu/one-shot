import { useParams } from 'react-router';export default function DetailPage(){const {id}=useParams();return <section><h1>fleet detail</h1><p>{id}</p></section>}
