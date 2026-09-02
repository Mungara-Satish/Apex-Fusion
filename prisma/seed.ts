import { PrismaClient } from '@prisma/client';
import {
  SUBJECTS,
  CHAPTERS,
  CURRENT_STUDENT,
  CURRENT_TUTOR,
  SAMPLE_TUTORS,
  SAMPLE_DOUBTS,
  SAMPLE_MOCK_TESTS,
  SAMPLE_RESOURCES,
  BADGES,
} from '../lib/mock-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding 10th-grade Online Tutoring database...');

  // 1. Seed Student User
  const student = await prisma.user.upsert({
    where: { email: CURRENT_STUDENT.email },
    update: {},
    create: {
      id: CURRENT_STUDENT.id,
      email: CURRENT_STUDENT.email,
      name: CURRENT_STUDENT.name,
      role: 'STUDENT',
      board: CURRENT_STUDENT.board,
      avatar: CURRENT_STUDENT.avatar,
      streakCount: CURRENT_STUDENT.streakCount,
      points: CURRENT_STUDENT.points,
      studyHoursWeekly: CURRENT_STUDENT.studyHoursWeekly,
    },
  });

  // 2. Seed Tutors
  for (const tutor of SAMPLE_TUTORS) {
    const user = await prisma.user.upsert({
      where: { email: `${tutor.name?.toLowerCase().replace(/[^a-z]/g, '')}@eduten.org` },
      update: {},
      create: {
        id: tutor.userId,
        email: `${tutor.name?.toLowerCase().replace(/[^a-z]/g, '')}@eduten.org`,
        name: tutor.name || 'Tutor',
        role: 'TUTOR',
        board: 'CBSE',
        avatar: tutor.avatar,
        streakCount: 20,
        points: 2500,
        studyHoursWeekly: 30,
      },
    });

    await prisma.tutorProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        id: tutor.id,
        userId: user.id,
        headline: tutor.headline,
        bio: tutor.bio,
        qualifications: tutor.qualifications,
        hourlyRate: tutor.hourlyRate,
        rating: tutor.rating,
        reviewCount: tutor.reviewCount,
        verified: tutor.verified,
        subjectsTaught: JSON.stringify(tutor.subjectsTaught),
        availabilitySlots: JSON.stringify(tutor.availabilitySlots),
      },
    });
  }

  // 3. Seed Subjects & Chapters
  for (const sub of SUBJECTS) {
    await prisma.subject.upsert({
      where: { slug: sub.slug },
      update: {},
      create: {
        id: sub.id,
        name: sub.name,
        code: sub.code,
        slug: sub.slug,
        grade: sub.grade,
        description: sub.description,
        icon: sub.icon,
        color: sub.color,
      },
    });
  }

  for (const chap of CHAPTERS) {
    await prisma.chapter.upsert({
      where: { id: chap.id },
      update: {},
      create: {
        id: chap.id,
        subjectId: chap.subjectId,
        chapterNumber: chap.chapterNumber,
        title: chap.title,
        unitName: chap.unitName,
        description: chap.description,
        estHours: chap.estHours,
        totalQuestions: chap.totalQuestions,
        difficulty: chap.difficulty,
      },
    });

    // Seed student progress for each chapter
    await prisma.chapterProgress.upsert({
      where: {
        userId_chapterId: {
          userId: student.id,
          chapterId: chap.id,
        },
      },
      update: {},
      create: {
        userId: student.id,
        chapterId: chap.id,
        status: chap.status || 'NOT_STARTED',
        completedAt: chap.status === 'COMPLETED' ? new Date() : null,
      },
    });
  }

  // 4. Seed Mock Tests & Questions
  for (const test of SAMPLE_MOCK_TESTS) {
    const createdTest = await prisma.mockTest.upsert({
      where: { id: test.id },
      update: {},
      create: {
        id: test.id,
        subjectId: test.subjectId,
        chapterId: test.chapterId,
        title: test.title,
        description: test.description || '',
        durationMinutes: test.durationMinutes,
        totalMarks: test.totalMarks,
        passingMarks: test.passingMarks,
        difficulty: test.difficulty,
      },
    });

    if (test.questions) {
      for (const q of test.questions) {
        await prisma.testQuestion.upsert({
          where: { id: q.id },
          update: {},
          create: {
            id: q.id,
            mockTestId: createdTest.id,
            questionText: q.questionText,
            options: JSON.stringify(q.options),
            correctOptionIndex: q.correctOptionIndex,
            explanation: q.explanation,
            marks: q.marks,
            topic: q.topic,
            difficulty: q.difficulty,
          },
        });
      }
    }
  }

  // 5. Seed Doubts & Replies
  for (const d of SAMPLE_DOUBTS) {
    const createdDoubt = await prisma.doubt.upsert({
      where: { id: d.id },
      update: {},
      create: {
        id: d.id,
        studentId: student.id,
        subjectId: d.subjectId,
        chapterId: d.chapterId,
        title: d.title,
        content: d.content,
        imageUrl: d.imageUrl,
        status: d.status,
        views: d.views,
        upvotes: d.upvotes,
        createdAt: new Date(d.createdAt),
      },
    });

    for (const r of d.replies) {
      await prisma.doubtReply.upsert({
        where: { id: r.id },
        update: {},
        create: {
          id: r.id,
          doubtId: createdDoubt.id,
          authorId: r.authorId,
          content: r.content,
          isAccepted: r.isAccepted,
          isTutorVerified: r.isTutorVerified,
          upvotes: r.upvotes,
          createdAt: new Date(r.createdAt),
        },
      });
    }
  }

  // 6. Seed Study Resources
  for (const res of SAMPLE_RESOURCES) {
    await prisma.studyResource.upsert({
      where: { id: res.id },
      update: {},
      create: {
        id: res.id,
        subjectId: res.subjectId,
        chapterId: res.chapterId,
        title: res.title,
        resourceType: res.resourceType,
        fileUrl: res.fileUrl,
        fileFormat: res.fileFormat,
        fileSize: res.fileSize,
        year: res.year,
        downloads: res.downloads,
      },
    });
  }

  // 7. Seed Badges
  for (const b of BADGES) {
    const createdBadge = await prisma.badge.upsert({
      where: { id: b.id },
      update: {},
      create: {
        id: b.id,
        name: b.name,
        description: b.description,
        icon: b.icon,
        category: b.category,
        pointsReq: b.pointsReq,
      },
    });

    if (b.unlocked) {
      await prisma.userBadge.upsert({
        where: {
          userId_badgeId: {
            userId: student.id,
            badgeId: createdBadge.id,
          },
        },
        update: {},
        create: {
          userId: student.id,
          badgeId: createdBadge.id,
          earnedAt: b.unlockedAt ? new Date(b.unlockedAt) : new Date(),
        },
      });
    }
  }

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
