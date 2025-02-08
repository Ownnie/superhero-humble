import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('SuperheroesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Debe crear un superhéroe', async () => {
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send({ name: 'Spiderman', superpower: 'Agilidad', humilityScore: 8 });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Spiderman');
  });
});
