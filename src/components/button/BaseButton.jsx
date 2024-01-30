import PropTypes from 'prop-types';

import '../../styles/button/BaseButton.css';

export default function BaseButton ({ content, onClick }) {
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