import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperHeroDTO } from './dto/create-superhero.dto';
import { Superhero } from './entities/superhero.entity';

@Controller('superheroes')
export class SuperheroesController {
    constructor(private readonly superheroesService: SuperheroesService) { }

    //Create a new Superhero with the given data
    @Post()
    async createSuperhero(@Body() data: Superhero) {
        // Validate the input data (in content and type) using Zod
        try {
            const parsed = CreateSuperHeroDTO.safeParse(data);
            if (!parsed.success) {
                throw new BadRequestException(parsed.error.format());
            }
            return this.superheroesService.createSuperhero(data);
        } catch (error) {
            throw new InternalServerErrorException('Error creating superhero');
        }
    }

    //Return all Superheroes sorted by humility score
    @Get()
    async getSuperheroes() {
        return this.superheroesService.getSortedSuperheroes();
    }
}
