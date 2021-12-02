import React from 'react';
import PropTypes from 'prop-types';




const CustomInput = props => {
    const {field, form} = props;
    const {value, name, onChange, onBlur} = field;
    const {label, type} = props;
    return (
        <div className="newuser-group-field">
            {label && <label htmlFor="newuser-file">{label}</label>}
            <input 
            {...field}
            
            type={type}
            />
        </div>
    );
};

CustomInput.propTypes = {
    field : PropTypes.object.isRequired,
    form : PropTypes.object.isRequired,
};
CustomInput.defaultProps = {
    label : PropTypes.string,
    type : PropTypes.string,
}

export default CustomInput;