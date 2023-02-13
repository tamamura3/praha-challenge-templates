function add(...args) {
    checkArgsLength(args);

    let result = 0;

    for (const arg of args) {
        checkArgType(arg);

        result += arg;

        if (result > 1000) {
            return 'too big';
        }
    }
    return result;
}

function subtract(...args) {
    checkArgsLength(args);

    let result = 0;
    for (let i = 0; i < args.length; i++) {
        checkArgType(args[i]);

        if (i == 0) {
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
    checkArgsLength(args);

    let result = 1;
    for (let i = 0; i < args.length; i++) {
        checkArgType(args[i]);

        result *= args[i];

        if (result > 1000) {
            return 'big big number';
        }
    }

    return result;
}

function divide(...args) {
    checkArgsLength(args);

    let result = 0;
    args.forEach((arg, index) => {
        checkArgType(arg);

        if (index === 0) {
            result = arg;
        } else {
            result /= arg;
        }
    });

    return Math.round( result * 100) / 100;
}

const checkArgsLength = (args) => {
    if (args.length > 30) {
        throw new Error();
    }
};

const checkArgType = (arg) => {
    if (isNaN(arg)) {
        throw new Error();
    }
}

module.exports = { add, subtract, multiply, divide };