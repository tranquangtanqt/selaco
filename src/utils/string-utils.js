export default class StringUtils {
  /**
   *
   * @param {*} n
   * @param {*} width
   * @param {*} z
   * @returns
   */
  static padZero(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  /**
   *
   * @param {*} string
   * @param {*} search
   * @param {*} replace
   * @returns
   */
  static replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }

  /**
   * string to camel
   * @param {*} str
   * @returns
   */
  static camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  static numberVNToJP(str) {
    return str
      .trim()
      .replace(/1/g, '１')
      .replace(/2/g, '２')
      .replace(/3/g, '３')
      .replace(/4/g, '４')
      .replace(/5/g, '５')
      .replace(/6/g, '６')
      .replace(/7/g, '７')
      .replace(/8/g, '８')
      .replace(/9/g, '９')
      .replace(/0/g, '０');
  }

  static upperCaseFirstLetter(str) {
    const firstLetter = str.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = str.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
  }
}
