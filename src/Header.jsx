import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa'

import PropTypes from 'prop-types'
import useWindowSize from './hooks/useWindowSize'

export const Header = ({ title }) => {
    const {width} = useWindowSize();
    return (
        <header className="Header">
            <h1>{title}</h1>
            {width < 768 ? <FaMobileAlt />
                : width < 992 ? <FaTabletAlt />
                    : <FaLaptop />}
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
