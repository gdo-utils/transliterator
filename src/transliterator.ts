export class Transliterator {

    private dict: TransliterationDictionary;
    private wordMatcher: RegExp;

    constructor(dictionary: TransliterationDictionary, wordMatcher: RegExp = /[\wа-я]+/ig) {
        this.dict = this.massageDictionary(dictionary);
        this.wordMatcher = wordMatcher;
    }

    public getHandler() {
        return this.transliterate.bind(this);
    }

    public transliterate(text: string): string {

        return text.replaceAll(this.wordMatcher, (word) => {

            if (this.dict.fixed.hasOwnProperty(word.toLowerCase())) return this.dict.fixed[word.toLowerCase()];

            for (const [k, v] of Object.entries(this.dict.irregular)) {
                const regexp = new RegExp(`${k}`, 'g');
                word = word.replaceAll(regexp, v);
            }

            for (const [k, v] of Object.entries(this.dict.combination)) {
                word = word.replaceAll(k, v);
            }

            for (const [k, v] of Object.entries(this.dict.letter)) {
                word = word.replaceAll(k, v);
            }

            return word;
        });
    }

    private massageDictionary(dictionary: TransliterationDictionary): TransliterationDictionary {
        const { fixed, irregular, combination, letter } = dictionary;
        let massagedDictionary: TransliterationDictionary = { ...emptyDictionary, fixed, irregular };

        for (const [k, v] of Object.entries(combination)) {
            massagedDictionary.combination = { ...massagedDictionary.combination, ...this.createPermutations(k, v) };
        }

        for (const [k, v] of Object.entries(letter)) {
            massagedDictionary.letter = { ...massagedDictionary.letter, [k]: v, [k.toUpperCase()]: v.charAt(0).toUpperCase() + v.slice(1) };
        }

        return massagedDictionary;
    }

    private createPermutations(key: string, val: string, keepValueCase: boolean = false) {
        const map: any = {},
            keyChars = key.split(''),
            keyCharsCount = 1 << keyChars.length,
            valChars = val.split('');

        for (let permutation = 0; permutation < keyCharsCount; permutation++) {
            keyChars.reduce((permutation, char, i) => {
                keyChars[i] = (permutation & 1) ? char.toUpperCase() : char.toLowerCase();
                if (i === 0 && keepValueCase === false) {
                    valChars[i] = (permutation & 1) ? valChars[i].toUpperCase() : valChars[i].toLowerCase();
                }
                return permutation >> 1;
            }, permutation);
            map[keyChars.join('')] = valChars.join('');
        }
        return map;
    }
}

export interface TransliterationDictionary {
    fixed: { [key: string]: string };
    irregular: { [key: string]: string };
    combination: { [key: string]: string };
    letter: { [key: string]: string }
}

export const emptyDictionary: TransliterationDictionary = {
    fixed: {},
    irregular: {},
    combination: {},
    letter: {}
};
