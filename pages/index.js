import { signIn, signOut, useSession } from "next-auth/client";

import styles from "./index.module.scss";

const HomePage = () => {
    const [session, loading] = useSession();
    if (!session && !loading) {
        signIn();
    }

    const name = session?.user?.name;
    return (
        <div className={styles.Page}>
            <h1>Home Page</h1>
            <p>
                This is where I&apos;ll stick the home page. Should require a logged in user.
            </p>
            <p>User: {name}</p>
            <hr />
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
};

export default HomePage;
