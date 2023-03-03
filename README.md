# EwCode
The most disgusting programming language!
## Annoyances
 - Built-in lag
 - Wierd syntax
 - Poorly documented
## TODO
| Task | Status | Finished |
| --- | --- | --- |
| Improve import system | Finished | <ul><li>[x] Don't make modules recreate Command class</li></ul> |
| Test EwCode on multiple platforms | In progress | <ul><li>[x] Windows</li><li>[ ] Mac</li><li>[ ] Linux</li></ul> |
| Create built-in modules | In progress | <ul><li>[x] Make imports search in modules directory as well</li><li>[ ] Write some built-in modules</li></ul> |

## Usage
1. Write some code
2. Save the code as a `.ecr` file
3. Compile and run the code using `ewcode "<your ecr file>"` . Replace `<your ecr file>` with the name of the file you stored the your code in. This should generate a file with the same name, but with the `.ewc` extension. **Example:** `ewcode "test.ecr"` -> `test.ewc`

## Docker Usage
1. Pull the latest docker image with `docker pull ghcr.io/pythonsnake5036/ewcode:latest`
2. Run it with `docker run --rm -v $(pwd):/src ghcr.io/pythonsnake5036/ewcode:latest ${NAME_FILE}`
As an example, if you have a file named `test.ecr` in your working directory, run `docker run --rm -v $(pwd):/src ghcr.io/pythonsnake5036/ewcode:latest test.ecr`. This should create a file named `test.ecw` and run it.

Command breakdown:

|   Command   |   Purpose   |
| ----------- | ----------- |
| `docker run`| Starts docker to run the container |
|    `--rm`   | Removes the container after running |
| `-v $(pwd):/src`| Bind mounts your current directory to the `/src` directory on the container. If you are on windows, type the full path of your current working directory |
| `ghcr.io/pythonsnake5036/ewcode:latest` | The name of the container to run |
| `${NAME_FILE}` | The name of the `.ecr` file to run |

<br /><br /><br />
**[Documentation](https://github.com/EnderixMC/EwCode/wiki)**
