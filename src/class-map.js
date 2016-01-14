
export class ClassMap {

    map = {}

    prefix = {
        before: '',
        after: '',
    }

    constructor(map = {}) {
        this.add.apply(this, arguments);
    }

    setPrefix(val) {
        this.prefix.before = val;
    }

    setSuffix(val) {
        this.prefix.after = val;
    }

    toString(prefix) {
        var classes = [];

        if (!prefix) {
            prefix = this.prefix;
        }

        Object.keys(this.map).forEach(key => {
            if (this.map[key]) {
                classes.push(applyPrefix(key, prefix));
            }
        });

        return classes.join(' ');
    }

    add() {
        [...arguments].forEach(arg => {
            if (Array.isArray(arg)) {
                this.add.apply(this, arg);

            } else if (arg instanceof Object) {
                this.map = {
                    ...this.map,
                    ...arg,
                };

            } else if (typeof arg === 'string') {
                this.map[arg] = true;
            }
        });
    }

    remove() {
        [...arguments].forEach(arg => {
            if (Array.isArray(arg)) {
                this.remove.apply(this, arg);

            } else if (typeof arg === 'string') {
                this.map[arg] = false;
            }
        });
    }

    toggle() {
        [...arguments].forEach(arg => {
            if (Array.isArray(arg)) {
                this.toggle.apply(this, arg);

            } else if (typeof arg === 'string') {
                this.map[arg] = !this.map[arg];
            }
        });
    }

}

export function createMap() {
    return new ClassMap([...arguments]);
}

export function applyPrefix(value, prefix) {
    if (!prefix) {
        return value;
    }

    if (typeof prefix === 'string') {
        return prefix + value;
    }

    if (prefix instanceof Object) {
        return (prefix.before || '') + value + (prefix.after || '');
    }
}
