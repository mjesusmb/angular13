export class UrlUtil {
    static cleanQueryString(url: string): string {
        if (!url) {
            return null;
        }

        if (url.lastIndexOf('?') > -1) {
            return url.substring(0, url.lastIndexOf('?'));
        }
        return url;
    }
}
