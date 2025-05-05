# File System CLI

[Assignment instruction](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)

A command-line interface for file system operations.

## Start File Manager

> npm run start -- --username={your name}

If username is not passed, it will be saved as Username

## Available Commands

### Navigation

- `up` - Go upper from current directory
- `cd` - Change directory (requires a path passed after the command)

### File Operations

- `ls` - List current directory contents
- `cat` - Display the contents of a file (requires a path to file passed after the command)
- `add` - Create a new file in current directory (requires new file name passed after the command)
- `mkdir` - Create a new directory in current directory (requires new directory name passed after the command)
- `rn` - Rename a file (requires a path to file and a new file name passed after the command)
- `cp` - Copy a file (requires a path to file and a path to new directory passed after the command)
- `mv` - Move a file (requires a path to file and a path to new directory passed after the command)
- `rm` - Remove a file (requires a path to file passed after the command)

### System Information

- `os` - Show OS info with the following arguments:
  - `--EOL` - Show the operating system end-of-line characters
  - `--cpus` - Show the host machine CPUs info
  - `--homedir` - Show home directory path
  - `--username` - Show current system username
  - `--architecture` - Show CPU architecture

### File Processing

- `hash` - Calculate hash of a file (requires a path to file passed after the command)
- `compress` - Compress a file (requires a path to file and a path to destination directory passed after the command)
- `decompress` - Decompress a file (requires a path to file and a path to destination directory passed after the command)

### Utility

- `help` - Show help for a list of commands
- `.exit` - Exit the program

## Usage Notes

Paths and file/folder name arguments may be passed directly (e.g. `path/to/file`) or with quotes (e.g. `'path/to/file'` or `"path/to/file"`).<br>
Passing not quoted paths without quotes will be handled as an `Invalid input` error.<br>
When an error occurs while command executing, `Operation error` message will be thrown.<br>
For operations with reading files, if file doesn't exist `Operation error` will be thrown.<br>
For the case when destination file already exists in operations when a new file is added, `Operation error` will be thrown.<br>
