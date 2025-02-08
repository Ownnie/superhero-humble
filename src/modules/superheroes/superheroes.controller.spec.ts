import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperHeroDTO } from './dto/create-superhero.dto';
import { Superhero } from './entities/superhero.entity';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: {
            createSuperhero: jest.fn().mockImplementation((data: CreateSuperHeroDTO) => {
              return { ...data };
            }),
            getSortedSuperheroes: jest.fn().mockReturnValue([
              { id: 1, name: 'Spiderman', superpower: 'Agilidad', humilityScore: 8 },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test for createSuperhero method
  it('should create a superhero', async () => {
    const dto: CreateSuperHeroDTO = { id: 1, name: 'Spiderman', superpower: 'Agilidad', humilityScore: 8 };

    // Call the createSuperhero method
    const result = await controller.createSuperhero(dto);

    // Verify that the service's createSuperhero method was called with the correct data
    expect(service.createSuperhero).toHaveBeenCalledWith(dto);

    // Verify that the result is as expected
    expect(result).toEqual({ ...dto });
  });

  // Test for getSuperheroes method
  it('should return an array of superheroes', async () => {
    // Call the getSuperheroes method
    const result = await controller.getSuperheroes();

    // Verify that the service's getSortedSuperheroes method was called
    expect(service.getSortedSuperheroes).toHaveBeenCalled();

    // Verify that the result is as expected
    expect(result).toEqual([
      { id: 1, name: 'Spiderman', superpower: 'Agilidad', humilityScore: 8 },
    ]);
  });
});