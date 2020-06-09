import React from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox } from 'react-bootstrap';
import Select from 'react-select';
import { mapToSelectbox } from '../utils';

export const Textbox = props => {
    const { id, name, type = "text", placeholder, label, bottomLabel, value, onChange, validationState, readOnly } = props;
    return (
        <FormGroup
            controlId={id}
            validationState={validationState}>
            {label &&
                <ControlLabel>{label}</ControlLabel>
            }
            <FormControl
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
            />
            <FormControl.Feedback />
            {bottomLabel &&
                <HelpBlock>
                    {bottomLabel}
                </HelpBlock>
            }
        </FormGroup>
    )
}

export const CheckBox = props => {
    const { id, name, label, checked, onChange, validationState, readOnly } = props;
    return (
        <FormGroup
            controlId={id}>
            <Checkbox
                name={name}
                checked={checked}
                readOnly={readOnly}
                onChange={onChange}
                validationState={validationState}>
                {label}
            </Checkbox>
        </FormGroup>
    )
}

export const Selectbox = props => {
    const { id, name, value, label, options, disabled = false, isMultiselect = true, isSearchable = false,
        isClearable = false, onChange, bottomLabel, validationState, optionLabel, optionValue, ...others } = props;
    return (
        <FormGroup
            controlId={id}
            validationState={validationState}>
            {label &&
                <ControlLabel>{label}</ControlLabel>
            }
            <Select
                inputId={name}
                name={name}
                value={value}
                options={mapToSelectbox(options, optionLabel, optionValue)}
                isClearable={isClearable}
                isMulti={isMultiselect}
                isSearchable={isSearchable}
                isDisabled={disabled}
                onChange={(option) => onChange({ target: { name: name, value: option } })}
                placeholder="Please choose..."
                noOptionsMessage={() => "No results!"}
                {...others}
            />

            <FormControl.Feedback />
            {bottomLabel &&
                <HelpBlock>
                    {bottomLabel}
                </HelpBlock>
            }
        </FormGroup>
    )
}