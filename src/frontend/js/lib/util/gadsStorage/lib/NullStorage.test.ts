import { describe, it, expect } from '@jest/globals';
import { NullStorage } from './NullStorage';
import { AppStorage } from './AppStorage';

// NullStorage is for exceptional circumstances to mitigate a lack of encryption (we need to meet ISO standards)
describe('NullStorage', () => {
    it('Should never set an item', async () => {
        const storage = new NullStorage() as AppStorage;
        const key = "key";
        const value = "value";
        await expect(storage.setItem(key, value)).resolves.not.toThrow();
        await expect(storage.getItem(key)).resolves.toBeNull();
    });
});
