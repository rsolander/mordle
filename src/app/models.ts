export interface CharInfo {
    letter: string;
    display: number;
}

export interface EntryInfo {
    ans: string;
    guess: string;
}

export interface APIResponse {
    id: number;
    word: string;
    results: Array<any>;
}

export interface GameSettings {
    word_length: number;
    weird_mode: boolean;
    guesses_allowed: number;
}