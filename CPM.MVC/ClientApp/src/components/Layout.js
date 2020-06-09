import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { NavMenu } from './';

export class Layout extends Component {
    displayName = Layout.name

    render() {
        return (
            <Grid>
                <NavMenu />
                {this.props.children}
            </Grid>
        );
    }
}
