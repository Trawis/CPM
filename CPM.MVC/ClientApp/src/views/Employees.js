import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import Api from '../services/Api'
import { EmployeeAddModal, EmployeeEditModal, ConfirmationModal } from './'

export class Employees extends Component {
    constructor(props) {
		super(props);

        this.state = {
            employeeId: undefined,
            employee: undefined,
            employees: [],
            loading: true,
            modals: {
                addModalShow: false,
                editModalShow: false,
                deleteModalShow: false
            }
        };
    }

    componentDidMount() {
        this.getAllEmployees();
    };

    handleModalShow = (modalName, employeeId) => {
        this.setState(prevState => {
            switch (modalName) {
                case 'editModalShow':
                    prevState.employee = prevState.employees.find(e => e.employeeId === employeeId)
                    break;
                default:
                    break;
            }
            prevState.modals[modalName] = !prevState.modals[modalName];
            prevState.employeeId = employeeId;
            return prevState;
        });
    };

    getAllEmployees = async () => {
        let employees = await Api.employee.getAllEmployees();
        this.setState({ employees, loading: false });
    };

    deleteEmployee = async id => {
        await Api.employee.deleteEmployee(id).then(() => this.getAllEmployees());
    };

    renderEmployeesData(employees) {
        return (
            <div>
                <Button bsStyle="primary" size="large" onClick={() => this.handleModalShow("addModalShow")}><Glyphicon glyph='plus' /> Add new employee</Button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Is Driver</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee =>
                            <tr key={employee.employeeId}>
                                <td width="75%">{employee.name}</td>
                                <td>{employee.isDriver ? "Yes" : "No"}</td>
                                <td><Button bsStyle="info" onClick={() => this.handleModalShow("editModalShow", employee.employeeId)}><Glyphicon glyph='pencil' /> Edit</Button></td>
                                <td><Button bsStyle="danger" onClick={() => this.handleModalShow("deleteModalShow", employee.employeeId)}><Glyphicon glyph='remove' /> Delete</Button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <EmployeeAddModal
                    show={this.state.modals["addModalShow"]}
                    onHide={() => this.handleModalShow("addModalShow")}
                    getAllEmployees={this.getAllEmployees}
                />
                <EmployeeEditModal
                    show={this.state.modals["editModalShow"]}
                    onHide={() => this.handleModalShow("editModalShow")}
                    getAllEmployees={this.getAllEmployees}
                    {...this.state.employee}
                />
                <ConfirmationModal
                    show={this.state.modals["deleteModalShow"]}
                    onHide={() => this.handleModalShow("deleteModalShow")}
                    onConfirm={() => this.deleteEmployee(this.state.employeeId)}
                />
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <Loader type="ThreeDots" color="#00000" height={100} width={100} />
            : this.renderEmployeesData(this.state.employees);

        return (
            <div>
                <h1>Employees</h1>
                <p>Add, edit or remove Employee</p>
                {contents}
            </div>
        );
    }
}
