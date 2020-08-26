import React from 'react';
import '../styling/dataTable.css';

export default function DataTable({ countries }) {
    return (
        <div className="data-table">
            <table>
                <tbody>
            {
                countries.map(({ country, cases}, index)=>(
                <tr key={index}>
                    <td>{country}</td>
                    <td>{cases}</td>
                </tr>
            ))
            }
                </tbody>
            </table>
        </div>
    )
}