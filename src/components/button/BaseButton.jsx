import PropTypes from 'prop-types';

import '../../styles/button/BaseButton.css';

export default function BaseButton ({ content, onClick }) {
    /**
     * Simplemente un componente reusable de un boton con una funcion onclick y un contenido.
     */
    return (
        <div className="module BaseButton">
            <button onClick={ onClick }>
                { content }
            </button>
        </div>
    )
}

BaseButton.propTypes = {
    content: PropTypes.string,
    onClick: PropTypes.func,
};