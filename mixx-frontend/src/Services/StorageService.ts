import { Storage } from "@ionic/storage";

export class StorageService {
  private static _storage: Storage | null = null;

  private static async GetStore() {
    if (!this._storage && this._storage !== null) {
      return this._storage;
    }

    const store = new Storage();
    this._storage = await store.create();

    return this._storage;
  }

  public static async Set(key: string, value: any) {
    await (await this.GetStore()).set(key, value);
  }

  public static async Get(key: string) {
    return await (await this.GetStore()).get(key);
  }

  public static async Remove(key: string) {
    return await (await this.GetStore()).remove(key);
  }

  public static async Clear() {
    return await (await this.GetStore()).clear();
  }

  public static async Logout() {
    (await (await this.GetStore()).keys()).map(async (key: string) => {

      await this.Remove(key);

    });
  }
}
