import { getProviders, signIn, useSession } from 'next-auth/client';

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
            <h1>Sign In</h1>
            {Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>Custom Sign in with {provider.name}</button>
                </div>
            ))}
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
