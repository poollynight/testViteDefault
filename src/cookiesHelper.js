class Cookie {
    constructor(isExisted, key, value) {
        this.isExisted = isExisted;
        this.key = key;
        this.value = value;
    }
}

class CookieHelper {
    static getAllCookies() {
        const cookieList = [];
        const separator = "=";
        
        if (document.cookie) {
            const cookies = document.cookie.split(";");
            
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                
                const keyValuePair = cookie.split(separator);
                
                let cookieItem = new Cookie(
                    true,
                    keyValuePair[0],
                    keyValuePair[1]
                );
                
                cookieList.push(cookieItem);
            }
        }
        
        return cookieList;
    }
    
    /**
    * Get the cookie from this page by the input name
    * @param {String} cookieName
    * @returns {Cookie} instance contains information of the target cookie.
    */
    static getCookieByName(cookieName) {
        const key = `${cookieName}=`;
        let value = "";
        const notFoundIndex = -1;
        
        if (document.cookie) {
            const cookies = document.cookie.split(";");
            
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                
                if (cookie.indexOf(key) != notFoundIndex) {
                    value = cookie.substring(key.length + 1);
                    
                    return new Cookie(true, cookieName, value);
                }
            }
        }
        
        return new Cookie(false);
    }
    
    static setCookie(cookieName, cookieValue, expiredDays) {
        const dateTimeNow = new Date();
        
        dateTimeNow.setTime(dateTimeNow.getTime() + expiredDays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + dateTimeNow.toUTCString();
        
        const cookie = `${cookieName}=${cookieValue};expires=${expires};path=/;SameSite=Strict`;
        document.cookie = cookie;
    }
}

export { Cookie };
export default CookieHelper;
