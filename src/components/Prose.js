import * as React from 'react';

export default function Prose({ children }) {
    return <p className="prose prose-lg dark:prose-invert">
        {children}
    </p>
}