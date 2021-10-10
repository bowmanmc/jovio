import Image from 'next/image';

import styles from "./index.module.scss";

const Navbar = () => {
    return (
        <div className={styles.Navbar}>
            <div className={styles.Navbar__logo}>
                <Image
                    src='/images/jovio-navlogo.svg'
                    alt='Jovio Logo'
                    height={162 / 6}
                    width={590 / 6}
                />
            </div>
        </div>
    );
};

export default Navbar;
