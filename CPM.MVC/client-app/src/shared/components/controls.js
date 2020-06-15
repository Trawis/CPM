import React from "react";
import { Form } from 'react-bootstrap';

export const Textbox = ({ id, name, type = "text", placeholder, label, bottomLabel, value, onChange, readOnly }) => (
    <Form.Group
        controlId={id}>
        {label &&
            <Form.Label >{label}</Form.Label >
        }
        <Form.Control
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
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