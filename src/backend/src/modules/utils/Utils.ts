export class Utils {
    public static isType<T extends any[]>(obj: any, props: T): boolean {
        let isValid = true;

        props.forEach(prop => {
            if (!(prop in obj)) {
                isValid = false;
            }
        });

        return isValid;
    }

    public static filterObject<T extends any[], U>(obj: any, props: T): U {
        return props.reduce((acc, cur) => {
            if (obj[cur]) {
                acc[cur] = obj[cur];
            }
            return acc;
        }, {});
    }

    public static buildUpdateString<T>(obj: T): String {
        let updStr = '';
        let i = 0;

        for (const key in obj) {
            updStr += `${key} = '${obj[key]}'`;
            if (i < Object.keys(obj).length - 1) {
                updStr += `, `;
            }
            i++;
        }

        return updStr;
    }
}
