export abstract class SoftDelete implements ISoftDelete {
    public abstract Id: string;
    public IsDeleted!: boolean;
    public CreatedOn!: Date;
    public UpdatedOn?: Date;

    public softDelete = (): void => {
        this.IsDeleted = true;
        this.UpdatedOn = new Date();
    };
}

interface ISoftDelete extends ICreatable, IUpdatable {
    Id: string;
    IsDeleted: boolean;
}

interface ICreatable {
    CreatedOn: Date;
}

interface IUpdatable {
    UpdatedOn?: Date;
}
