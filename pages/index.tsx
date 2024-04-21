import Head from 'next/head';
import styles from '../styles/Home.module.css';
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
        {!loggedIn && (
          <img src='/favicon.ico' alt="Favicon" style={{ width: '250px', height: '250px', marginTop: '100px', marginBottom: '0' }}/>
        )}
        <h1 className={styles.title}>
          Blockchain WaffleHouse
        </h1>

        {!loggedIn && (
          <p className={styles.description}>
          Attendance Keeping Application Built on the Flow Blockchain
          </p>
        )}
        

        {loggedIn && <Container />}
        <Footer />
      </main>
    </div>
  )
}
