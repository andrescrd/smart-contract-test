import React from "react";

const Panel: React.FC<{ title: string }> = ({ title, children }) => {
    return (
        <div>
            <h1>{title}</h1>
            {children}
        </div>
    );
};

export default Panel;