export default class Utils {
  public static div(val, by) {
    return (val - (val % by)) / by;
  }

  public static createKey(): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let key = '';
    for (let i = 1; i < 30; i += 1) {
      if (i % 6 === 0) {
        key += '-';
      } else {
        key += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
      }
    }
    return key;
  }
}
