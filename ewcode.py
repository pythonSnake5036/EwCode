from argparse import ArgumentParser
from ewcode_lexer import Lex
import sys
import subprocess

__version__ = "0.5.0"
credits = f"Ewcode v{__version__} by EnderixMC (https://github.com/EnderixMC/EwCode)"

def compile(name):
    with open(name, "r") as f:
        raw = f.read()
    data = Lex(raw)
    return data

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument('-v', '--version', action='version', version=f"EwCode {__version__}")
    parser.add_argument('--credits', action='version', version=credits)
    parser.add_argument("file")
    parser.add_argument("runtime")
    args = parser.parse_args()
    try:
        data = compile(args.file)
        if args.runtime == "node":
            from transpilers.javascript_node import convert2js
            print(convert2js(data))
        # p = subprocess.run(['node'], stdout=subprocess.PIPE,
        # input=js)
        # print(p.stdout.decode(),end='')
    except Exception as e:
        print("[Error]:", e)
        raise e # REMOVE LATER
        sys.exit()
    except KeyboardInterrupt:
        sys.exit()
