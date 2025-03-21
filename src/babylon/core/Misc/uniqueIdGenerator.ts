/**
 * Helper class used to generate session unique ID
 */
export class UniqueIdGenerator {
    // Statics
    private static _UniqueIdCounter = 1;

    /**
     * Gets an unique (relatively to the current scene) Id
     */
    public static get UniqueId() {
        const result = this._UniqueIdCounter;
        this._UniqueIdCounter++;
        return result;
    }
}
