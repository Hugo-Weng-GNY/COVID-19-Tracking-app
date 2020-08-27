import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import '../styling/dataBox.css';

export default function DataBox({title, cases, total}) {
    return (
        <Card className="data-box" >
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