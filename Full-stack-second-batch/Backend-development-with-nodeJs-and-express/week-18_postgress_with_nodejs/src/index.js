const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // 1) createMany (bulk insert) with skipDuplicates
  await prisma.course.createMany({
    data: [
      { name: 'Math' },
      { name: 'Physics' },
      { name: 'History' },
      { name: 'Biology' }
    ],
    skipDuplicates: true
  })

  // 2) findUnique
  const math = await prisma.course.findUnique({ where: { name: 'Math' } })
  const physics = await prisma.course.findUnique({ where: { name: 'Physics' } })

  if (!math || !physics) {
    throw new Error('Required courses not found')
  }

  // 3) upsert with nested writes and relation connect
  const demoEmail = 'demo.prisma.student@example.com'
  const demoStudent = await prisma.student.upsert({
    where: { email: demoEmail },
    update: {
      firstName: 'Demo',
      lastName: 'Student',
      address: {
        upsert: {
          create: { street: '10 Demo St', city: 'Metropolis', country: 'Freedonia' },
          update: { street: '10 Demo St', city: 'Metropolis', country: 'Freedonia' }
        }
      },
      courses: { set: [{ id: math.id }, { id: physics.id }] }
    },
    create: {
      firstName: 'Demo',
      lastName: 'Student',
      email: demoEmail,
      address: {
        create: { street: '10 Demo St', city: 'Metropolis', country: 'Freedonia' }
      },
      courses: { connect: [{ id: math.id }, { id: physics.id }] }
    },
    include: { address: true, courses: true }
  })

  console.log('Upserted student:', demoStudent)

  // 4) createMany (simple records without nested writes)
  await prisma.student.createMany({
    data: [
      {
        firstName: 'Demo',
        lastName: 'Batch',
        email: 'demo.prisma+1@example.com'
      },
      {
        firstName: 'Demo',
        lastName: 'Batch',
        email: 'demo.prisma+2@example.com'
      }
    ],
    skipDuplicates: true
  })

  // 5) findFirst
  const firstStudent = await prisma.student.findFirst({
    where: { lastName: 'Batch' },
    orderBy: { id: 'asc' }
  })
  console.log('First Batch student:', firstStudent)

  // 6) findMany with filters, pagination, include
  const studentsInMath = await prisma.student.findMany({
    where: { courses: { some: { name: 'Math' } } },
    include: { address: true, courses: true },
    orderBy: { id: 'desc' },
    take: 5,
    skip: 0
  })
  console.log('Students in Math (paginated):', studentsInMath.length)

  // 7) select (only specific fields)
  const studentEmails = await prisma.student.findMany({
    where: { email: { contains: 'demo.prisma' } },
    select: { id: true, email: true }
  })
  console.log('Demo emails:', studentEmails)

  // 8) update (single record)
  const updatedDemo = await prisma.student.update({
    where: { email: demoEmail },
    data: { lastName: 'Learner' }
  })
  console.log('Updated student:', updatedDemo)

  // 9) updateMany (bulk update)
  const updatedMany = await prisma.student.updateMany({
    where: { email: { startsWith: 'demo.prisma+' } },
    data: { lastName: 'BatchUpdated' }
  })
  console.log('Updated many:', updatedMany.count)

  // 10) count
  const totalStudents = await prisma.student.count()
  console.log('Total students:', totalStudents)

  // 11) include _count for relations
  const coursesWithCounts = await prisma.course.findMany({
    select: { name: true, _count: { select: { students: true } } }
  })
  console.log('Course counts:', coursesWithCounts)

  // 12) transaction (multiple operations)
  const [createdCourse, deletedCourse] = await prisma.$transaction([
    prisma.course.create({ data: { name: 'Temp Course' } }),
    prisma.course.delete({ where: { name: 'Temp Course' } })
  ])
  console.log('Transaction results:', createdCourse.name, deletedCourse.name)

  // 13) cleanup (delete demo data only)
  await prisma.address.deleteMany({
    where: { student: { email: { startsWith: 'demo.prisma' } } }
  })
  await prisma.student.deleteMany({
    where: { email: { startsWith: 'demo.prisma' } }
  })
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
