import { getProviders, signIn, useSession } from 'next-auth/client';
import Image from 'next/image';

import styles from './signin.module.scss';


const SigninPage = ({providers}) => {
    const [session] = useSession();
    if (session?.user) {
        // signin successful 🎉
        // redirect to home page
        // (query param callbackUrl could be used here in the future instead)
        // do a full page refresh here so auth is checked
        window.location.replace('/');
    }

    return (
        <div className={styles.Page}>
            <div className={styles.Container}>

                <div className={styles.Intro}>
                    <h1>Welcome to Jovio!</h1>
                    <p>
                        We&apos;re glad you&apos;re here!
                        Jovio is designed to help you feel better and
                        have a positive impact on the world. Sign in
                        below to get started!
                    </p>
                </div>

                <div className={styles.Providers}>
                {Object.values(providers).map(provider => (
                    <div key={provider.id}>
                        <button
                            className={styles.Button}
                            onClick={() => signIn(provider.id)}>
                            <Image
                                src={`/images/btn-${provider.id}.png`}
                                alt={`Sign in with ${provider.name}`}
                                height={92 / 1.75}
                                width={382 / 1.75}
                                />
                        </button>
                    </div>
                ))}
                </div>

                <p className={styles.Legal}>
                    By using third-party authentication systems,
                    we keep your data safe, secure, separate, and private.
                    We don&apos;t store passwords.
                    Your email address is your unique identifier to our system.
                </p>
            </div>
        </div>
    );
};

export default SigninPage;

export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
        props: { providers }
    };
};
