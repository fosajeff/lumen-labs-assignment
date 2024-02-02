import { DataSource } from "typeorm"
import { AppDataSource } from '../src/utils/data-source';

export class TestSetup {
    private static _instance: TestSetup;
    private constructor() {}

     public static get instance(): TestSetup {
        if(!this._instance) this._instance = new TestSetup();

        return this._instance;
    }

    private dbConnect!: DataSource;

    async setupTestDB() {
    
        this.dbConnect = await AppDataSource.initialize()
    }

    async teardownTestDB() {
        // for test purpose
        await this.dbConnect.dropDatabase()
        await this.dbConnect.destroy();
    }

}