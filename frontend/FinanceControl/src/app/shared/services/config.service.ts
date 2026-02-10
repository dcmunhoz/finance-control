import {ConfigFile} from './types/config.interface';

export class ConfigService {
  private _config: ConfigFile = {
    apiBase: ''
  };

  public load(): void {
    fetch('/assets/configs/config.json')
      .then(response => response.json())
      .then(config => this._config = config);
  }

  public get config(): ConfigFile {
    return this._config;
  }
}
