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
            <div className={styles.SignInContainer}>
                {Object.values(providers).map(provider => (
                    <div key={provider.id}>
                        <button
                            className={styles.SignInButton}
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
