export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string; 
}

export interface PostParamater {
    id: number;
    title: string;
    body: string;
    readonly clone: PostApiParamater;
}

export interface PostApiParamater {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export type CreatePostParameter = Omit<PostParamater, "id" | "clone">;

export class Post {
    readonly id: number;
    title: string;
    body: string;
    readonly clone: PostApiParamater;

    constructor(params: PostParamater) {
        this.id = params.id;
        this.title = params.title;
        this.body = params.body;
        this.clone = params.clone;
    }

    static fromApi(data: PostApiParamater): Post {
        const params = {
            id: data.id,
            title: data.title,
            body: data.body,
            clone: data,
        };
        return new Post(params);
    }

    toApi(): PostApiParamater {
        return {
            ...this.clone,
            id: this.id,
            title: this.title,
            body: this.body,
        };
    }

}