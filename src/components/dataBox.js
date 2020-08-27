import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import '../styling/dataBox.css';

export default function DataBox({active, casesType, title, cases, total, ...props}) {
    return (
        <Card onClick={props.onClick} className={`data-box ${casesType} ${active && "data-box-selected"}`} >
            <CardContent>
                <Typography className="data-box-title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="data-box-cases">{cases}</h2>
                <Typography className="data-box-total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}