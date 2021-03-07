import { parseCookies, setCookie } from 'nookies';
import { v4 as uuidv4 } from 'uuid';

class UserIDCookie {
  private static cookieName: string = 'sample-cart-uuid';

  static set() {
    const newId = uuidv4();
    setCookie(null, this.cookieName, newId, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    return newId;
  }

  static get() {
    const cookies = parseCookies();
    return cookies?.[this.cookieName] || '';
  }
}

export default UserIDCookie;
