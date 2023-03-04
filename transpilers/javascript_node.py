import sys

# An experimental ewcode to javascript converter

def arg_var(dat):
    return f"variables[\"{dat[1]}\"]"

def arg_str(dat):
    return "\"" + dat[1] + "\""

def arg_num(dat):
    return dat[1]

def get_arg(arg):
    return arg_converters[arg[0]](arg)

def arg_func(dat):
    return _code2js(dat[1])

def func_print(func):
    js = "console.log("
    for i, v in enumerate(func[1:]):
        js += get_arg(v)
        if i < len(func)-2:
            js += " + "
    js += ");\n"
    return js

def func_set(func):
    var_name = func[1][1]
    var_value = get_arg(func[2])
    js = f"variables[\"{var_name}\"] = {var_value};\n"
    return js

def func_input(func):
    var_name = func[1][1]
    prompt = get_arg(func[2])
    js = f"{var_name} = await prompt({prompt});\n"
    return js

def func_random(func):
    var_name = func[1][1]
    low = get_arg(func[2])
    high = get_arg(func[3])
    js = f"{var_name} = random({low}, {high});\n"
    return js

def func_call(func):
    func_name = func[1][1]
    js = f"{func_name}();\n"
    return js

def func_looprange(func):
    times = get_arg(func[1])
    body = get_arg(func[2])
    js = f"for (var i = 0; i < {times}; i++) {{\n{body}}}\n"
    return js

def custom_func(func):
    func_name = func[0]
    func_body = _code2js(func[1])
    js = f"function {func_name}() {{\n{func_body}}}\n"
    return js

arg_converters = {
    "VAR": arg_var,
    "STR": arg_str,
    "NUM": arg_num,
    "FUNC": arg_func
}

func_converters = {
    "print": func_print,
    "set": func_set,
    "input": func_input,
    "random": func_random,
    "call": func_call,
    "looprange": func_looprange
}

def _code2js(ewcode):
    out = ""
    for line in ewcode:
        func = line[0]
        if func[0] == 'FUNC':
            if func[1] != '':
                out += func_converters[func[1]](line)
        elif func[0] == "CUSTOM_FUNC":
            out += custom_func(func[1])
    return out

# var_setters = ["set", "input", "random"]

def convert2js(ewcode):
    out = """const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
const random = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;
var variables = {};
(async() => {
"""
    # var_set_funcs = [line for line in ewcode if line[0][1] in var_setters]
    # variables = set([var[1][1] for var in var_set_funcs])

    # for var in variables:
    #     out += f"var {var};\n"

    out += _code2js(ewcode)

    out += "rl.close();\n})();\nrl.on('close', () => process.exit(0));\n"

    return out

if __name__ == "__main__":
    import sys
    import json
    with open(sys.argv[1], "r") as f:
        lexed = json.load(f)
    print(convert2js(lexed))