const inputs = [
    { operation: slowMath.add, values: [6, 2] },
    { operation: slowMath.multiply, values: [2] },
    { operation: slowMath.divide, values: [4] },
    { operation: slowMath.subtract, values: [3] },
    { operation: slowMath.add, values: [98] },
    { operation: slowMath.remainder, values: [2] },
    { operation: slowMath.multiply, values: [50] },
    { operation: slowMath.remainder, values: [40] },
    { operation: slowMath.add, values: [32] },
    { operation: (val) => { console.log(`The final result is ${val}`) }, values: [] }
];

const thenChaining = function (input, adder)
{

    if (input.length === 0) return;

    const nesterFunc = function (promise, input)
    {
        if (!promise) return;
        promise.then(
            function (value)
            {
                console.log(value);
                if (input.length > 0)
                {
                    thenChaining(input, value);
                }
            },
            function (error)
            {
                console.log(error);
            }
        );
    };

    let promise;
    if (adder === undefined) promise = input[0].operation(...input[0].values);
    else promise = input[0].operation(adder, ...input[0].values);
    input.splice(0, 1);

    nesterFunc(promise, input);
};
const doMath = async function (input)
{

    let adder = input[0].values.splice(0, 1)[0];

    for (var i = 0; i < input.length; i++)
    {
        try
        {
            adder = await input[i].operation(adder, ...input[i].values);
            if (i !== input.length - 1) console.log(adder);
        } catch (error) {
            console.log(error);
        }
    }
};

//thenChaining(inputs);
doMath(inputs);