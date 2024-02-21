import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa'

import PropTypes from 'prop-types'

export const Header = ({ title, width }) => {
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
    width: PropTypes.number,
}

export default Header
