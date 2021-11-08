import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Form from "../components/form"

export default function Home() {
  return (
    <div className={styles.container}>
<h1>Tu preferes</h1>
<Form/>
    </div>
  )
}
