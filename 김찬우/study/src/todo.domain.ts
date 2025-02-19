export class Todo {
    id: string;
    title: string;
    description: string;
    done: boolean;
    createdAt: Date;
    lastUpdatedAt: Date;

    constructor(
        id: string,
        title: string,
        description: string,
        done: boolean,
        createdAt: Date,
        lastUpdatedAt: Date,
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.done = done
        this.createdAt = createdAt
        this.lastUpdatedAt = lastUpdatedAt
    }
}