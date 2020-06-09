import React, { Component } from 'react';

export class Home extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Carpool Management System</h1>
                <p>If you see this page then you succesfully run this application built with:</p>
                <ul>
                    <li><a href='https://get.asp.net/'>ASP.NET Core (2.2)</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
					<li><a href='https://www.sqlite.org/'>SQLite</a> for database</li>
					<li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
                    <li><a href='https://react-select.com/'>React Select</a> for select input</li>
                    <li><a href='https://mhnpd.github.io/react-loader-spinner/'>React Loader Spinner</a> for loaders</li>
                    <li><a href='https://github.com/smrsan76/imrc-datetime-picker'>(Improved) React Datetime picker</a> for choosing date and time</li>
                    <li><a href='https://momentjs.com/'>Moment.js</a> to format date and time</li>
                    <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                </ul>
            </div>
        );
    }
}