export declare class DictionaryCoder {
    _stringToNumber: {
        [_: string]: number;
    };
    _numberToString: Array<string>;
    constructor(strings: Array<string>);
    encode(string: string): number;
    decode(n: number): string;
}
