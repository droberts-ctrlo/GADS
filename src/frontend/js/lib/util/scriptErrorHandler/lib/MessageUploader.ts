import { Uploader } from 'util/upload/UploadControl';

/**
 * Upload a message to the server. It creates an instance of MessageUploader with a new Uploader and calls the uploadMessage method.
 * @param message The message content to upload
 */
export const uploadMessage = async (message: string) => {
    const body = {
        description: message,
        url: window.location.href
    };
    const messageUploader = MessageUploader.instance;
    return await messageUploader.uploadMessage(body.description);
};

/**
 * Singleton class that handles uploading messages to the server. It uses an instance of Uploader to perform the actual upload.
 */
class MessageUploader {
    private static _instance: MessageUploader;

    /**
     * Create a new instance of MessageUploader with the provided Uploader.
     * @param uploader The uploader instance to use
     */
    constructor(private uploader: Uploader) {
    }

    /**
     * Get the singleton instance of MessageUploader. If it doesn't exist, create a new one with a new Uploader.
     * @returns The singleton instance of MessageUploader
     */
    static get instance(): MessageUploader {
        if (!this._instance) {
            this._instance = new MessageUploader(new Uploader('/api/script_error', 'POST'));
        }
        return this._instance;
    }

    /**
     * Upload a message to the server. It constructs the request body with the message description, current URL, and CSRF token.
     * @param description The message content to upload
     * @returns A promise that resolves when the upload is complete
     */
    async uploadMessage(description: string): Promise<void> {
        const csrf_token = document.body.dataset.csrf;
        const body = {
            description,
            url: window.location.href,
            csrf_token
        };
        try {
            return await this.uploader.upload(body);
        } catch (err) {
            console.error('Failed to upload message:', err);
        }
    }
}
