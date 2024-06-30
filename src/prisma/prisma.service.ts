import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      const readActions = ['findMany', 'findFirst',];
      const deleteActions = ['delete', 'deleteMany'];

      if (readActions.includes(params.action)) {
        if (params.args?.where) {
          if (params.args.where.deletedAt === undefined) {
            params.args.where['deletedAt'] = null;
          }
        } else {
          params.args = { ...params.args, where: { deletedAt: null } };
        }
      }

      if (deleteActions.includes(params.action)) {
        params.action = params.action === 'delete' ? 'update' : 'updateMany';
        if (params.args?.data) {
          params.args.data['deletedAt'] = new Date();
        } else {
          params.args = { ...params.args, data: { deletedAt: new Date() } };
        }
      }

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
