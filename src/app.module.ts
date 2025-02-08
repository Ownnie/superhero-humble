import { MiddlewareConsumer, Module, NestModule, Type } from '@nestjs/common';
import { SuperheroesModule } from './modules/superheroes/superheroes.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [SuperheroesModule]
})
export class AppModule implements NestModule {
  // The configure method is used to apply the LoggerMiddleware to all routes in the application.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
