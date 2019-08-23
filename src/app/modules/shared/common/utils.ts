export function removeIfEndsWith(inputString: string, symbol: string): string {
    let str: string = inputString

    if (inputString.charAt(inputString.length - 1) === symbol) {
        str = inputString.slice(0, -1)
    }

    return str
}
