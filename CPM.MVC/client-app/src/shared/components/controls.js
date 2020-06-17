import React from "react";
import Select from 'react-select';
import { Form } from 'react-bootstrap';
import { mapToSelectbox } from '../';

export const Textbox = ({ id, name, type = "text", placeholder, label, bottomLabel, value, onChange, readOnly }) => (
    <Form.Group
        controlId={id}>
        {label &&
            <Form.Label>{label}</Form.Label>
        }
        <Form.Control
            name={name}
            type={type}
            placeholder={placeholder}
            value={value || ''}
            onChange={onChange}
            readOnly={readOnly}
        />
        <Form.Control.Feedback />
        {bottomLabel &&
            <Form.Text muted>
                {bottomLabel}
            </Form.Text>
        }
    </Form.Group>
);

export const Checkbox = ({ id, name, label, checked, onChange, readOnly }) => (
    <Form.Group
        controlId={id}>
        <Form.Check
            type="checkbox"
            name={name}
            checked={checked || false}
            disabled={readOnly}
            onChange={onChange}
            label={label}>
        </Form.Check>
    </Form.Group>
);

export const Selectbox = props => {
    const { id, name, value, label, options, disabled = false, isMultiselect = true, isSearchable = false,
        isClearable = false, onChange, bottomLabel, optionLabel, optionValue, ...others } = props;
    return (
        <Form.Group
            controlId={id}>
            {label &&
                <Form.Label>{label}</Form.Label>
            }
            <Select
                inputId={name}
                name={name}
                value={value || ''}
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
            <Form.Control.Feedback />
            {bottomLabel &&
                <Form.Text muted>
                    {bottomLabel}
                </Form.Text>
            }
        </Form.Group>
    )
}