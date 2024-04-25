import React from 'react';

const Notification = ({ message, severity }) => {
    return (
        <div>
            {message && (
                <div className={`alert alert-${severity}`} role="alert">
                    {message}
                </div>
            )}
        </div>
    );
};

export default Notification;
