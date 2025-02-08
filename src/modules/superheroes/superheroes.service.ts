import { Injectable } from '@nestjs/common';
import { Superhero } from './entities/superhero.entity';

@Injectable()
export class SuperheroesService {
    private superheroes: Superhero[] = [];
    private idCounter = 1;

    //Create a new Superhero with the given data
    createSuperhero(data: Superhero): Superhero {
        const newSuperhero: Superhero = {
            id: this.idCounter++,
            name: data.name,
            superpower: data.superpower,
            humilityScore: data.humilityScore
        };

        this.superheroes.push(newSuperhero);
        return newSuperhero;
    }

    //Return all Superheroes sorted by humility score

    getSortedSuperheroes(): Superhero[] {
        return this.superheroes.sort((a, b) => a.humilityScore - b.humilityScore);
    }
}
