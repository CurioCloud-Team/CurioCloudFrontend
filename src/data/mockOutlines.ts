// 教学大纲详细数据类型
export interface TeachingOutlineDetail {
  id: number
  title: string
  subject: string
  grade: string
  description: string
  createTime: string
  modifyTime: string
  duration: string
  author: string
  status: string
  objectives: string[]
  contents: {
    title: string
    description: string
    keyPoints?: string[]
  }[]
  process: {
    title: string
    duration: string
    description: string
    activities?: string[]
  }[]
  assessments: {
    type: string
    description: string
    weight: string
  }[]
  totalHours: string
  knowledgePoints: number
  activitiesCount: number
  difficulty: number
  resources: {
    id: number
    name: string
    type: string
  }[]
  tags: string[]
  comments: {
    id: number
    author: string
    time: string
    content: string
  }[]
}

// 模拟教学大纲详细数据
export const mockOutlineDetails: Record<number, TeachingOutlineDetail> = {
  1: {
    id: 1,
    title: '《分数的初步认识》教学大纲',
    subject: '数学',
    grade: '三年级',
    description: '本节课通过实际操作和生活实例，让学生初步认识分数的含义，理解分数各部分的名称，能正确读写简单的分数。',
    createTime: '2024-03-15',
    modifyTime: '2024-03-18',
    duration: '1课时',
    author: '张老师',
    status: '已发布',
    objectives: [
      '让学生通过具体的操作活动和生活实例，初步认识分数，知道分数各部分的名称。',
      '会读写简单的分数，知道分数各部分的名称。',
      '能用分数表示一些具体情境中"部分与整体"的关系。',
      '培养学生的观察能力、动手操作能力和语言表达能力。'
    ],
    contents: [
      {
        title: '分数的产生',
        description: '通过分苹果的实际情况，引出"一半"的概念，进而引入分数的概念。',
        keyPoints: ['一半的概念', '分数的必要性', '生活中的分数']
      },
      {
        title: '分数的认识',
        description: '认识分数的各部分名称：分子、分母、分数线，理解它们的含义。',
        keyPoints: ['分子', '分母', '分数线', '分数的意义']
      },
      {
        title: '分数的读写',
        description: '学会正确读写简单分数，掌握分数的读写规则。',
        keyPoints: ['分数的读法', '分数的写法', '读写规则']
      }
    ],
    process: [
      {
        title: '情境导入',
        duration: '5分钟',
        description: '通过分苹果的生活情境，引发学生思考如何表示"一半"。',
        activities: [
          '出示两个苹果，分给两个小朋友',
          '提问：每人分到多少？',
          '引出"一半"的概念'
        ]
      },
      {
        title: '探索新知',
        duration: '25分钟',
        description: '通过折纸、涂色等活动，让学生认识分数的含义和各部分名称。',
        activities: [
          '折纸活动：将正方形纸片对折',
          '涂色活动：涂其中一部分',
          '认识1/2的写法和意义',
          '学习分数各部分名称'
        ]
      },
      {
        title: '巩固练习',
        duration: '8分钟',
        description: '通过多种练习形式，巩固对分数的认识。',
        activities: [
          '看图写分数',
          '读分数练习',
          '判断题练习'
        ]
      },
      {
        title: '课堂小结',
        duration: '2分钟',
        description: '总结本节课学习的内容，强化重点知识。',
        activities: [
          '回顾分数的意义',
          '复习分数的读写方法'
        ]
      }
    ],
    assessments: [
      {
        type: '课堂观察',
        description: '观察学生在操作活动中的表现和参与度',
        weight: '30%'
      },
      {
        type: '口头表达',
        description: '学生能否正确表达分数的意义和读法',
        weight: '25%'
      },
      {
        type: '练习完成',
        description: '课堂练习的完成情况和正确率',
        weight: '35%'
      },
      {
        type: '课后作业',
        description: '课后练习题的完成质量',
        weight: '10%'
      }
    ],
    totalHours: '40分钟',
    knowledgePoints: 5,
    activitiesCount: 8,
    difficulty: 3,
    resources: [
      { id: 1, name: '分数认识PPT课件', type: 'PPT' },
      { id: 2, name: '折纸操作视频', type: '视频' },
      { id: 3, name: '分数练习题', type: 'PDF' },
      { id: 4, name: '教学素材包', type: '压缩包' }
    ],
    tags: ['分数', '三年级', '数学基础', '动手操作', '生活应用'],
    comments: [
      {
        id: 1,
        author: '李老师',
        time: '2024-03-20',
        content: '这个教学设计很好，活动安排合理，学生容易理解。'
      },
      {
        id: 2,
        author: '王老师',
        time: '2024-03-19',
        content: '建议在探索新知环节增加更多的实物操作。'
      },
      {
        id: 3,
        author: '刘老师',
        time: '2024-03-18',
        content: '评估方式很全面，能够多角度检验学生的学习效果。'
      }
    ]
  },
  2: {
    id: 2,
    title: '《春天的诗歌》教学大纲',
    subject: '语文',
    grade: '二年级',
    description: '通过朗读春天主题的诗歌，培养学生的语感和审美能力，理解诗歌表达的情感，学会有感情地朗读诗歌。',
    createTime: '2024-03-12',
    modifyTime: '2024-03-16',
    duration: '2课时',
    author: '李老师',
    status: '已发布',
    objectives: [
      '能正确、流利、有感情地朗读春天主题的诗歌。',
      '理解诗歌的主要内容，感受春天的美好。',
      '学会欣赏诗歌的语言美，培养语感。',
      '能够背诵至少一首春天的诗歌。'
    ],
    contents: [
      {
        title: '春天诗歌导读',
        description: '介绍几首经典的春天诗歌，感受诗歌的韵律美。',
        keyPoints: ['诗歌韵律', '情感表达', '语言美感']
      },
      {
        title: '诗歌朗读技巧',
        description: '学习朗读诗歌的基本技巧，包括语调、节奏、情感等。',
        keyPoints: ['语调变化', '朗读节奏', '情感表达']
      },
      {
        title: '诗歌创作体验',
        description: '尝试创作简单的春天小诗，体验诗歌创作的乐趣。',
        keyPoints: ['创作灵感', '词汇运用', '表达技巧']
      }
    ],
    process: [
      {
        title: '诗歌导入',
        duration: '10分钟',
        description: '通过春天的图片和音乐，营造诗歌学习氛围。',
        activities: [
          '播放春天的音乐',
          '展示春天的美丽图片',
          '引导学生说说对春天的感受'
        ]
      },
      {
        title: '诗歌学习',
        duration: '50分钟',
        description: '学习经典春天诗歌，掌握朗读技巧。',
        activities: [
          '教师范读诗歌',
          '学生跟读练习',
          '理解诗歌内容',
          '练习有感情朗读'
        ]
      },
      {
        title: '创作体验',
        duration: '15分钟',
        description: '引导学生创作简单的春天小诗。',
        activities: [
          '观察春天景物',
          '用词语描述春天',
          '组成简单诗句'
        ]
      },
      {
        title: '展示交流',
        duration: '5分钟',
        description: '学生展示朗读和创作成果。',
        activities: [
          '朗读展示',
          '作品分享',
          '互相评价'
        ]
      }
    ],
    assessments: [
      {
        type: '朗读表现',
        description: '评估学生朗读诗歌的流利程度和情感表达',
        weight: '40%'
      },
      {
        type: '理解程度',
        description: '检查学生对诗歌内容和情感的理解',
        weight: '30%'
      },
      {
        type: '参与度',
        description: '观察学生在课堂活动中的参与情况',
        weight: '20%'
      },
      {
        type: '创作表现',
        description: '评价学生的诗歌创作尝试',
        weight: '10%'
      }
    ],
    totalHours: '80分钟',
    knowledgePoints: 6,
    activitiesCount: 10,
    difficulty: 2,
    resources: [
      { id: 1, name: '春天诗歌选集', type: 'PDF' },
      { id: 2, name: '朗读示范音频', type: '音频' },
      { id: 3, name: '春天图片素材', type: '图片' },
      { id: 4, name: '背景音乐', type: '音频' }
    ],
    tags: ['诗歌', '二年级', '语文', '朗读', '春天', '情感表达'],
    comments: [
      {
        id: 1,
        author: '张老师',
        time: '2024-03-17',
        content: '诗歌选择很好，适合二年级学生的理解水平。'
      },
      {
        id: 2,
        author: '王老师',
        time: '2024-03-16',
        content: '建议增加更多的互动环节，让学生更好地参与。'
      }
    ]
  }
}

// 根据ID获取教学大纲详情的函数
export function getOutlineDetail(id: number): TeachingOutlineDetail | null {
  return mockOutlineDetails[id] || null
}