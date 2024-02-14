import PropTypes from 'prop-types'

export const Header = ({ title }) => {
    return (
        <header className="Header">
            <h1>{title}</h1>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
