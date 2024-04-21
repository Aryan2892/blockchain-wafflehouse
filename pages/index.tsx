import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Links from '../components/Links';
import Container from '../components/Container';
import useCurrentUser from '../hooks/useCurrentUser';
import Footer from '../components/Footer';

export default function Home() {
  const { loggedIn } = useCurrentUser();

  return (
    <div className={styles.container}>

      <Head>
        <title>Attendance App</title>
        <meta name="description" content="blockchain attendance checker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Blockchain WaffleHouse
        </h1>

        <p className={styles.description}>
          Attendance Keeping Application
        </p>

        <Links />

        {loggedIn && <Container />}

        <Footer />
      </main>
    </div>
  )
}
