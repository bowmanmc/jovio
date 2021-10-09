import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';

import Navbar from 'components/navbar';

import './_app.scss';

function JovioApp({ Component, pageProps }) {

    return (
        <Provider session={pageProps.session}>
            <Navbar />
            <Component {...pageProps} />
        </Provider>
    );
}

export default JovioApp;
