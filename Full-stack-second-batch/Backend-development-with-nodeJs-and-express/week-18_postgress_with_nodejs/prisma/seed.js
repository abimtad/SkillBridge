const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const COURSE_NAMES = [
  'Math',
  'Physics',
  'History',
  'Biology',
  'Chemistry',
  'Literature',
  'Computer Science',
  'Economics',
  'Philosophy',
  'Art'
]

const FIRST_NAMES = [
  'Alice',
  'Bob',
  'Charlie',
  'Diana',
  'Evan',
  'Farah',
  'Gabe',
  'Hana',
  'Ivan',
  'Julia',
  'Kofi',
  'Lina',
  'Maya',
  'Noah',
  'Omar',
  'Priya',
  'Quinn',
  'Rosa',
  'Sam',
  'Tariq'
]

const LAST_NAMES = [
  'Smith',
  'Jones',
  'Brown',
  'Taylor',
  'Williams',
  'Johnson',
  'Davis',
  'Martinez',
  'Lee',
  'Wilson',
  'Anderson',
  'Thomas',
  'Garcia',
  'Moore',
  'Clark'
]

const STREET_NAMES = [
  'Main St',
  'Oak Ave',
  'Pine Rd',
  'Maple Blvd',
  'Cedar Ln',
  'Elm St',
  'River Dr',
  'Hillcrest Way'
]

const CITIES = ['Metropolis', 'Smallville', 'Gotham', 'Star City', 'Central City']
const COUNTRIES = ['Freedonia', 'Genovia', 'Ruritania', 'Elbonia']

function pick(list, index) {
  return list[index % list.length]
}

async function ensureCourses() {
  await prisma.course.createMany({
    data: COURSE_NAMES.map((name) => ({ name })),
    skipDuplicates: true
  })
  return prisma.course.findMany()
}

async function main() {
  console.log('Seeding database...')

  const courses = await ensureCourses()
  const courseIds = courses.map((course) => course.id)

  const totalStudents = 200
  const seededStudents = []

  for (let i = 1; i <= totalStudents; i += 1) {
    const firstName = pick(FIRST_NAMES, i)
    const lastName = pick(LAST_NAMES, i * 3)
    const email = `student${String(i).padStart(4, '0')}@example.com`
    const streetNumber = 100 + i
    const street = `${streetNumber} ${pick(STREET_NAMES, i * 5)}`
    const city = pick(CITIES, i * 7)
    const country = pick(COUNTRIES, i * 11)

    const courseCount = 2 + (i % 3)
    const selectedCourseIds = Array.from({ length: courseCount }, (_, idx) => {
      return courseIds[(i + idx) % courseIds.length]
    })

    const student = await prisma.student.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        address: {
          upsert: {
            create: { street, city, country },
            update: { street, city, country }
          }
        },
        courses: { set: selectedCourseIds.map((id) => ({ id })) }
      },
      create: {
        firstName,
        lastName,
        email,
        address: {
          create: { street, city, country }
        },
        courses: { connect: selectedCourseIds.map((id) => ({ id })) }
      }
    })

    seededStudents.push(student)
  }

  console.log('Seeded courses:', courses.length)
  console.log('Seeded students:', seededStudents.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
