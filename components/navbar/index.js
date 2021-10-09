import Image from 'next/image';

import styles from "./index.module.scss";

const Navbar = () => {
    return (
        <div className={styles.Navbar}>
            <div className={styles.Navbar__logo}>
                <Image
                    src='/images/jovio-navlogo.svg'
                    alt='Jovio Logo'
                    height='36px'
                    width='128px'
                />
            </div>
        </div>
    );
};

export default Navbar;
