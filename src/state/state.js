import { EOL, cpus, homedir, userInfo, arch, platform } from 'os';

export class State {
  #currentPath;
  #username;
  #eol;
  #osState;

  constructor(username) {
    this.#currentPath = homedir();
    this.#username = username;
    this.#eol = EOL;
    this.#osState = {
      cpus: cpus(),
      homedir: homedir(),
      username: userInfo().username,
      platform: platform(),
      architecture: arch()
    }
  }

  get currentPath() {
    return this.#currentPath
  }

  get osState() {
    return this.#osState;
  }

  get username() {
    return this.#username;
  }

  get eol() {
    return this.#eol;
  }
  
  set currentPath(path) {
    this.#currentPath = path;
  }
}
