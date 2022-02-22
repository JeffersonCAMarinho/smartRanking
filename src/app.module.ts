import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      // 'mongodb+srv://jefferson:passportmongodb@cluster0.bczg0.mongodb.net/smartranking?retryWrites=true&w=majority',
      'mongodb+srv://jefferson:passportmongodb@cluster0.bczg0.mongodb.net',
      { dbName: 'smartranking' },
      // {
      //   useNewUrlParser: true,
      //   useCreatedIndex: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: false,
      // },
    ),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
