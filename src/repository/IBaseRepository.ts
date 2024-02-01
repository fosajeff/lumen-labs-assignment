export interface IBaseRepository<T> {
    save(item: T): Promise<T>;
    update?(id: number, item: T): Promise<T | null>;
    delete(id: number): void;
    find(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
  }
  