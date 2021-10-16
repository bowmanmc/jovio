import { signIn, signOut, useSession } from "next-auth/client";

import Header from 'components/home/header';

import styles from "./index.module.scss";

const HomePage = () => {
    const [session, loading] = useSession();
    if (!session && !loading) {
        signIn();
    }

    const name = session?.user?.name;
    return (
        <div className={styles.Page}>
            <Header />
            <p>User: {name}</p>
            <hr />
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
};

export default HomePage;
