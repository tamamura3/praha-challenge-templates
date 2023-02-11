function add(...args) {
    if (args.length > 30) {
        throw new Error();
    }

    let result = 0;
    for (const arg of args) {
        if (isNaN(arg)) {
            throw new Error();
        } else {
            result += arg;
        }

        if (result >= 1000) {
            return 'too big';
        }
    }

    return result;
}

function subtract(...args) {
    if (args.length > 30) {
        throw new Error();
    }

    let result = 0;
    for (let i = 0; i < args.length; i++) {
        if (isNaN(args[i])) {
            throw new Error();
        }

        if (i === 0) {
            result = args[0];
        } else {
            result -= args[i];
        }

        if (result < 0) {
            return 'negative number';
        }
    }

    return result;
}

function multiply(...args) {
    if (args.length > 30) {
        throw new Error();
    }

    let result = 0;
    for (let i = 0; i < args.length; i++) {
        if (isNaN(args[i])) {
            throw new Error();
        }
        if (i === 0) {
            result = args[0];
        } else {
            result *= args[i];
        }
        if (result > 1000) {
            return 'big big number';
        }

    }

    return result;
}

function divide(...args) {
    if (args.length > 30) {
        throw new Error();
    }
    let result = 0;

    args.forEach((arg, index) => {
        if (isNaN(arg)) {
            throw new Error();
        }
        if (index === 0) {
            result = arg;
        } else {
            result /= arg;
        }
    });

    return result;
}

module.exports = { add, subtract, multiply, divide };