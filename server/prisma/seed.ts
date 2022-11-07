import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Icaro Santos',
      email: 'icaro@gmail.com',
      avatarUrl: 'https://github.com/Icar0S.png',
    },
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Exemple pool',
      code: 'BOL12',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.201Z',
      firstTeamCountryCode: 'QA',
      secondTeamCountryCode: 'EC'
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-04T16:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'RS',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 0,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    },
  })

}

main()