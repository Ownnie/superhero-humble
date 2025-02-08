import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';
import { Superhero } from './entities/superhero.entity';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroesService],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test for createSuperhero method
  it('should create a superhero', () => {
    const data: Superhero = { name: 'Spiderman', superpower: 'Agilidad', humilityScore: 8 } as Superhero;

    // Call the createSuperhero method
    const result = service.createSuperhero(data);

    // Verify that the result is as expected
    expect(result).toEqual({ ...data });

    // Verify that the superhero was added to the array
    expect(service['superheroes']).toContainEqual({ ...data });
  });

  // Test for getSortedSuperheroes method
  it('should return an array of superheroes sorted by humility score', () => {
    const superheroes: Superhero[] = [
      { id: 1, name: 'Spiderman', superpower: 'Agilidad', humilityScore: 8 },
      { id: 2, name: 'Ironman', superpower: 'Tecnología', humilityScore: 5 },
      { id: 3, name: 'Hulk', superpower: 'Fuerza', humilityScore: 7 },
    ];

    // Add superheroes to the service
    service['superheroes'] = superheroes;

    // Call the getSortedSuperheroes method
    const result = service.getSortedSuperheroes();

    // Verify that the result is sorted by humility score
    expect(result).toEqual([
      { id: 2, name: 'Ironman', superpower: 'Tecnología', humilityScore: 5 },
      { id: 3, name: 'Hulk', superpower: 'Fuerza', humilityScore: 7 },
      { id: 1, name: 'Spiderman', superpower: 'Agilidad', humilityScore: 8 },
    ]);
  });
});