export interface Slide {
  title: string
  content: string
  type: '标题页' | '内容页' | '活动页' | '练习页' | '总结页'
  elements?: string[]
  bulletPoints?: string[]
  steps?: string[]
  notes?: string[]
  exercises?: Array<{
    question: string
    options?: string[]
  }>
}

export interface SavedPPT {
  id: number
  title: string
  subject: string
  grade: string
  slideCount: number
  createTime: string
  outlineId: number
  downloadUrl: string
  fileSize: number
  generationTime: number
  slides: Slide[]
}

export const savedPPTs: SavedPPT[] = [
  {
    id: 1,
    title: '《分数的初步认识》教学课件',
    subject: '数学',
    grade: '三年级',
    slideCount: 6,
    createTime: '2024-03-20T10:30:00Z',
    outlineId: 1,
    downloadUrl: '/api/ppts/1/download',
    fileSize: 5.2 * 1024 * 1024,
    generationTime: 125,
    slides: [
      {
        title: '分数的初步认识',
        content: '本节课将通过生动有趣的方式，帮助同学们初步认识分数，理解分数在日常生活中的重要作用，为后续学习打下坚实的基础。',
        type: '标题页',
        elements: ['标题', '副标题', '装饰']
      },
      {
        title: '什么是分数',
        content: '分数表示一个整体的一部分。当我们把一个苹果平均分成两份时，每一份就是这个苹果的二分之一，记作 1/2。',
        type: '内容页',
        elements: ['图片', '文字', '动画'],
        bulletPoints: [
          '分数来源于分割和测量的需要',
          '分数表示部分与整体的关系',
          '生活中到处都有分数的应用',
          '分数让我们能够表达不够整数的量'
        ]
      },
      {
        title: '分数的各部分名称',
        content: '每个分数都由三部分组成：上面的数叫分子，下面的数叫分母，中间的横线叫分数线。',
        type: '内容页',
        elements: ['图表', '标注', '文字'],
        bulletPoints: [
          '分子：表示取了多少份',
          '分母：表示平均分成多少份',
          '分数线：表示除法运算',
          '读法：先读分母，再读"分之"，最后读分子'
        ]
      },
      {
        title: '实践活动：折纸游戏',
        content: '通过动手折纸，直观理解二分之一的概念',
        type: '活动页',
        elements: ['操作步骤', '图片', '说明'],
        steps: [
          '准备一张正方形纸片',
          '将纸片对折，确保两边完全重合',
          '展开纸片，观察折痕将纸片分成两个相等的部分',
          '涂色其中一部分，这就是整张纸的 1/2',
          '尝试折出 1/4、1/8 等其他分数'
        ],
        notes: [
          '确保折叠时两边完全重合',
          '可以用不同颜色区分各个部分',
          '鼓励学生说出自己的发现'
        ]
      },
      {
        title: '分数的读写练习',
        content: '掌握分数的正确读法和写法是学好分数的基础',
        type: '内容页',
        elements: ['示例', '练习', '音频'],
        bulletPoints: [
          '写分数时要先画分数线',
          '分母写在分数线下方',
          '分子写在分数线上方',
          '读分数要清晰准确'
        ]
      },
      {
        title: '课堂练习',
        content: '通过练习巩固今天学到的分数知识',
        type: '练习页',
        elements: ['题目', '选择', '判断'],
        exercises: [
          {
            question: '把一个圆平均分成4份，其中的1份用分数表示是？',
            options: ['A. 1/2', 'B. 1/3', 'C. 1/4', 'D. 1/5']
          },
          {
            question: '分数 3/5 中，分子是多少？',
            options: ['A. 3', 'B. 5', 'C. 8', 'D. 2']
          },
          {
            question: '下面哪个分数表示把一个整体平均分成8份？',
            options: ['A. 3/5', 'B. 2/8', 'C. 5/3', 'D. 8/2']
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: '《春天的诗歌》朗诵课件',
    subject: '语文',
    grade: '二年级',
    slideCount: 18,
    createTime: '2024-03-18T14:15:00Z',
    outlineId: 2,
    downloadUrl: '/api/ppts/2/download',
    fileSize: 3.8 * 1024 * 1024,
    generationTime: 95,
    slides: [
      {
        title: '春天的诗歌',
        content: '一起走进诗歌的春天，感受文字的魅力。',
        type: '标题页'
      },
      {
        title: '《春晓》孟浩然',
        content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
        type: '内容页'
      }
    ]
  }
]

export function getPPTById(id: number): SavedPPT | undefined {
  return savedPPTs.find(ppt => ppt.id === id)
}
