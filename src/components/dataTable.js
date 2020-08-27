import React from 'react';
import '../styling/dataTable.css';
import numeral from 'numeral';

export default function DataTable({ countries }) {
    return (
        <div className="data-table">
            <table>
                <tbody>
            {
                countries.map(({ country, cases}, index)=>(
                <tr key={index}>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))
            }
                </tbody>
            </table>
        </div>
    )
}