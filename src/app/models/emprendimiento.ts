import { Imagen } from './imagen';
export class Emprendimiento {

    public id: string;
    public title: string;
    public description: string;
    public images: Imagen[];

    constructor(title: string, description: string) {

        this.title = title;
        this.description = description;
        this.images = [];
        
    }
}
