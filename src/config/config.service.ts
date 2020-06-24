require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  public getValue(key: string, defaultValue?: string): string {
    const value = this.env[key]

    if (!value && defaultValue == null) {
      throw new Error(`config error - missing env.${key}`)
    }

    return value || defaultValue
  }

  public getValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, ""));

    return this;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k));

    return this;
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'API_URL',
    'JWT_SECRET'
  ]);

export { configService };
