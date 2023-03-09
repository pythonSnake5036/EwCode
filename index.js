function lex(raw) {
    var raw = raw.split("\n");
    var final = [];
    var skips = 0;
    for (var i = 0; i < raw.length; i++) {
        if (skips > 0) {
            skips -= 1;
            continue;
        }
        var line = raw[i];
        var line_lex = [];
        var lexeme_count = 0;
        if (line.startsWith("@")) {
            continue;
        }
        var result = /^func ([a-zA-Z]+):$/.exec(line);
        if (result) {
            var raw2 = raw;
            raw2[i] = result[1];
            var [typ, tok, skips] = lex_custom_func(raw2, i);
            final.push([typ,tok]);
            continue;
        }
        var [typ, tok, consumed] = lex_func(line);
        line_lex.push([typ,tok]);
        lexeme_count += consumed;
        while (lexeme_count < line.length) {
            var lexme = line[lexeme_count];
            var typ, tok, consumed;
            if (lexme == "{") {
                [typ, tok, consumed] = lex_var(line.slice(lexeme_count));
            }
            else if (lexme == "[") {
                [typ, tok, consumed] = lex_equ(line.slice(lexeme_count));
            }
            else if (lexme == "(") {
                [typ, tok, consumed] = lex_bool(line.slice(lexeme_count));
            }
            else if (lexme == "-") {
                [typ, tok, consumed] = lex_func_var(line.slice(lexeme_count));
            }
            else if (lexme == '"' || lexme == "'") {
                [typ, tok, consumed] = lex_str(line.slice(lexeme_count));
            }
            else if (lexme.match(/[0-9]/)) {
                [typ, tok, consumed] = lex_num(line.slice(lexeme_count));
            }
            else {
                throw "SyntaxError";
            }
            line_lex.push([typ,tok]);
            lexeme_count += consumed;
            if (lexeme_count < line.length) {
                if (line[lexeme_count] != ",") {
                    throw "SyntaxError";
                }
                else {
                    lexeme_count += 1;
                }
            }
        }
        final.push(line_lex);
    }
    return final;
}

function lex_func(line) {
    var string = "";
    for (var c of line) {
        if (c == ":") {
            break;
        }
        if (!c.match(/[a-zA-Z]/)) {
            throw "SyntaxError";
        }
        string += c;
    }
    return ['FUNC', string, string.length+1];
}

function lex_num(line) {
    var num = "";
    for (var c of line) {
        if (!c.match(/[0-9]/)) {
            break;
        }
        num += c;
    }
    return ["NUM", parseInt(num), num.length];
}

function is_escaped(line, i) {
    if (i == 0) {
        return false;
    }
    if (line[i-1] == "\\") {
        if (is_escaped(line, i-1)) {
            return false;
        }
        return true;
    }
    return false;
}

function lex_str(line) {
    var delimiter = line[0];
    line = line.slice(1);
    var string = "";
    var escapes = 0;
    for (var i = 0; i < line.length; i++) {
        var c = line[i];
        if (c == delimiter) {
            if (!is_escaped(line, i)) {
                break;
            }
        }
        if (c == "\\") {
            escapes += 1;
        }
        string += c;
    }
    string = JSON.parse('"'+string+'"');
    return ["STR", string, string.length+2+escapes];
}

function lex_var(line) {
    line = line.slice(1);
    var string = "";
    for (var c of line) {
        if (c == "}") {
            break;
        }
        string += c;
    }
    return ["VAR", string, string.length+2];
}

function lex_equ(line) {
    line = line.slice(1);
    var string = "";
    for (var i = 0; i < line.length; i++) {
        var c = line[i];
        if (c == "]") {
            break;
        }
        string += c;
    }
    return ["EQU", string, string.length+2];
}

function lex_bool(line) {
    line = line.slice(1);
    var string = "";
    for (var i = 0; i < line.length; i++) {
        var c = line[i];
        if (c == ")") {
            break;
        }
        string += c;
    }
    return ["BOOL", string, string.length+2];
}

function lex_func_var(line) {
    line = line.slice(1);
    var string = "";
    for (var i = 0; i < line.length; i++) {
        var c = line[i];
        if (c == "-") {
            break;
        }
        string += c;
    }
    return ["FUNC", lex(string), string.length+2];
}

function lex_custom_func(raw, i) {
    raw = raw.slice(i);
    var inner = [];
    for (var i = 1; i < raw.length; i++) {
        if (raw[i] == "^") {
            break;
        }
        inner.push(raw[i]);
    }
    var lexed = lex(inner.join("\n"));
    return ["CUSTOM_FUNC", [raw[0],lexed], inner.length+1];
}

exports.lex = lex;