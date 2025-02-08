import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperHeroDTO } from './dto/superhero.dto';
import { Superhero } from './entities/superhero.entity';

@Controller('superheroes')
export class SuperheroesController {
    constructor(private readonly superheroesService: SuperheroesService) { }

    //Create a new Superhero with the given data
    @Post()
    async createSuperhero(@Body() data: CreateSuperHeroDTO) {

        // Validate the input data (in content and type) using Zod
        const parsed = CreateSuperHeroDTO.safeParse(data);
        if (!parsed.success) return { error: parsed.error.format() };

        return this.superheroesService.createSuperhero(data);
    }

    //Return all Superheroes sorted by humility score
    @Get()
    async getSuperheroes() {
        return this.superheroesService.getSortedSuperheroes();
    }
}
