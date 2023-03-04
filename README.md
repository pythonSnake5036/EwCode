# EwCode
The most disgusting programming language!

# Changes
This fork of EwCode replaces the Python interpeter with a JavaScript transpiler. This improves performance.

However, imports are currently not supported, and booleans have a larger range of possibilities.

For example, `1+1={a}` was not allowed in vanilla EwCode, but is allowed in this version.

## Requirements
- NodeJS

## Usage
1. Write some code
2. Save the code as a `.ecr` file
3. Compile and run the code using `ewcode "<your ecr file>"`. ewcode will convert your `.ecr` file to a `.js` file, and print the NodeJS file.

## Docker Usage
1. Pull the latest docker image with `docker pull ghcr.io/pythonsnake5036/ewcode:latest`
2. Run it with `docker run --rm -v $(pwd):/src ghcr.io/pythonsnake5036/ewcode:latest ${NAME_FILE} > ${OUT_FILE}`
As an example, if you have a file named `test.ecr` in your working directory, run `docker run --rm -v $(pwd):/src ghcr.io/pythonsnake5036/ewcode:latest test.ecr > test.js`.

Command breakdown:

|   Command   |   Purpose   |
| ----------- | ----------- |
| `docker run`| Starts docker to run the container |
|    `--rm`   | Removes the container after running |
| `-v $(pwd):/src`| Bind mounts your current directory to the `/src` directory on the container. If you are on windows, type the full path of your current working directory |
| `ghcr.io/pythonsnake5036/ewcode:latest` | The name of the container to run |
| `${NAME_FILE}` | The name of the `.ecr` file to run |
| `> ${OUT_FILE}` | Pipes the output of ewcode into a file (test.js) |

<br /><br /><br />
**[Documentation](https://github.com/EnderixMC/EwCode/wiki)**
