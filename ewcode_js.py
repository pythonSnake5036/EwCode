import sys
from ewcode_lexer import Lex

# An experimental ewcode to javascript converter

def arg_str(dat):
    return "\"" + dat[1] + "\""

def func_print(func):
    js = "console.log("
    for i, v in enumerate(func[1:]):
        js += arg_converters[v[0]](v)
        if i < len(func)-2:
            js += "+"
    js += ");\n"
    return js

arg_converters = {
    "STR": arg_str
}

func_converters = {
    "print": func_print
}

def convert2js(ewcode):
    out = ""

    for line in ewcode:
        func = line[0]
        assert func[0] == 'FUNC'
        out += func_converters[func[1]](line)

    return out