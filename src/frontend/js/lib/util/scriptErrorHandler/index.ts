import { uploadMessage } from './lib/MessageUploader';

const createErrorString = (message: string, source?: any, lineno?: number, colno?: number, error?: Error | string | null) => {
    let errorString = `Error: ${message}\nSource: ${source}\nLine: ${lineno}, Column: ${colno}`;
    if (error && (error as Error)?.stack) {
        errorString += `\nStack: ${(error as Error)?.stack}`;
    }
    return errorString;
};

window.onerror = function (message: Event | string, source?: any, lineno?: number, colno?: number, error?: Error | string | null) {
    if(message instanceof Event) {
        // Very unlikely that the message will be an event, but it's best to be sure this is handled correctly.
        message.preventDefault();
        message.stopPropagation();
        return;
    }
    if (location.host === 'localhost') {
        // If we're on localhost, we log the error to the console. This is useful for development.
        console.error('Script error occurred:', message, source, lineno, colno, error);
    }
    if (location.pathname === '/api/script_error' || location.pathname === '/login') {
        // If we're on the script error page, we don't want to log it again.
        console.error('Script error occurred but not logged to avoid recursion.');
        console.error(createErrorString(message as string, source, lineno, colno, error));
        return;
    }

    const description = createErrorString(message as string, source, lineno, colno, error);

    uploadMessage(description)
        .catch(err => {
            console.error('Failed to upload script error:', err);
        });
};

export { uploadMessage };
