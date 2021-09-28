import { Card, CardContent, CardHeader } from "@material-ui/core";
import React from "react";

const Panel: React.FC<{ title?: string }> = ({ title, children }) => {
    return (
        <Card >
            {title && <CardHeader title={title} />}
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};

export default Panel;