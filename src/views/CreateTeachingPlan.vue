<template>
  <div class="min-h-screen flex flex-col">
    <!-- Back Button -->
    <button class="fixed top-6 left-6 btn btn-ghost btn-sm text-gray-600 z-10" @click="goBack">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      返回
    </button>

    <div class="flex-1 flex flex-col">
      <!-- Chat Container -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <div class="bg-white border-b border-gray-200 p-6">
          <div class="flex items-center justify-center">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-lg font-semibold text-gray-800">AI 教案助手</h1>
                <p class="text-gray-600 text-sm">让我来帮您创建一份完美的教案</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Messages -->
        <div class="flex-1 overflow-y-auto p-6 bg-gray-50 max-w-4xl mx-auto w-full" ref="chatContainer">
          <div class="space-y-6">
            <!-- AI Messages -->
            <div v-for="(message, index) in chatMessages" :key="index" 
                 class="flex gap-4 opacity-0 transform translate-y-4 animate-fade-in"
                 :style="{ animationDelay: `${index * 100}ms` }">
              <!-- AI Avatar -->
              <div v-if="message.type === 'ai'" class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <!-- User Avatar -->
              <div v-else class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            
            <!-- Message Content -->
            <div class="flex-1 max-w-2xl">
              <div :class="[
                'rounded-2xl px-6 py-4 transition-all duration-300 ease-out',
                message.type === 'ai' ? 'bg-white text-gray-800 shadow-sm border border-gray-100' : 'bg-blue-500 text-white ml-auto shadow-md'
              ]">
                <p class="text-base leading-relaxed">{{ message.content }}</p>
                
                <!-- Quick Action Buttons for AI messages -->
                <div v-if="message.type === 'ai' && message.options" class="mt-4 flex flex-wrap gap-2">
                  <button 
                    v-for="option in message.options" 
                    :key="option.value"
                    class="btn btn-sm btn-outline hover:scale-105 transition-transform duration-200"
                    @click="selectOption(option)"
                  >
                    {{ option.label }}
                  </button>
                </div>

                <!-- Input Field for Current Question -->
                <div v-if="message.type === 'ai' && message.showInput && index === chatMessages.length - 1" class="mt-6 transform transition-all duration-500 ease-out">
                  <!-- Select type with quick options -->
                  <div v-if="currentQuestion.type === 'select'" class="space-y-4">
                    <!-- Quick option buttons -->
                    <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div class="text-sm text-gray-600 mb-3">快速选择：</div>
                      <div class="flex flex-wrap gap-3">
                        <button 
                          v-for="option in currentQuestion.options" 
                          :key="option"
                          class="btn btn-outline btn-sm hover:btn-primary transition-all duration-300 hover:scale-105"
                          :class="{ 
                            'btn-primary border-primary text-white shadow-md': currentAnswer === option,
                            'bg-white border-gray-300 text-gray-700 hover:border-primary hover:text-primary': currentAnswer !== option
                          }"
                          @click="selectQuickOption(option)"
                        >
                          <svg v-if="currentAnswer === option" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {{ option }}
                        </button>
                      </div>
                    </div>
                    <!-- Traditional select as backup (optional) -->
                    <div class="text-sm text-gray-500 text-center">
                      或选择其他选项：
                    </div>
                    <select 
                      class="select select-bordered w-full bg-white transition-all duration-300 focus:scale-105"
                      v-model="currentAnswer"
                      @change="handleAnswerChange"
                    >
                      <option value="">{{ currentQuestion.placeholder }}</option>
                      <option v-for="option in currentQuestion.options" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <!-- Textarea type -->
                  <div v-else-if="currentQuestion.type === 'textarea'" class="space-y-3">
                    <textarea 
                      class="textarea textarea-bordered w-full h-24 resize-none transition-all duration-300 focus:scale-105 focus:shadow-lg"
                      :placeholder="currentQuestion.placeholder"
                      v-model="currentAnswer"
                      @input="handleAnswerChange"
                    ></textarea>
                  </div>
                  <!-- Text input type -->
                  <div v-else class="space-y-3">
                    <div class="relative">
                      <input 
                        type="text"
                        class="input input-bordered w-full pr-12 transition-all duration-300 focus:scale-105 focus:shadow-lg"
                        :placeholder="currentQuestion.placeholder"
                        v-model="currentAnswer"
                        @keyup.enter="submitAnswer"
                        @input="handleAnswerChange"
                      />
                      <!-- Voice input button (visual only) -->
                      <button class="btn btn-ghost btn-sm absolute right-2 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform duration-200" disabled>
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <!-- Submit button -->
                  <button 
                    class="btn btn-primary w-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    @click="submitAnswer"
                    :disabled="!currentAnswer || currentAnswer.trim() === ''"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                    确认
                  </button>
                </div>
              </div>
              <div class="text-sm text-gray-500 mt-2" v-if="message.type === 'ai'">
                AI助手
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex gap-4 opacity-0 animate-fade-in">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div class="flex-1 max-w-2xl">
              <div class="bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Actions -->
        <div class="p-6 bg-white border-t border-gray-200 max-w-4xl mx-auto w-full">
          <!-- Quick suggestions for current question (if applicable) -->
          <div v-if="currentQuestionIndex < questions.length && questions[currentQuestionIndex]?.type === 'textarea'" class="mb-4">
            <div class="text-sm text-gray-600 mb-3">快速建议：</div>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="suggestion in getQuickSuggestions()" 
                :key="suggestion"
                class="btn btn-ghost btn-sm text-blue-600 hover:scale-105 transition-transform duration-200"
                @click="addSuggestion(suggestion)"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                {{ suggestion }}
              </button>
            </div>
          </div>
          
          <!-- Progress and actions -->
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
              <div class="text-base text-gray-600">
                {{ completedFields }} / {{ totalFields }} 项已完成
              </div>
              <!-- Progress bar -->
              <div class="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-blue-500 transition-all duration-500 ease-out"
                  :style="{ width: `${(completedFields / totalFields) * 100}%` }"
                ></div>
              </div>
            </div>
            <div class="flex gap-3">
              <button class="btn btn-ghost hover:scale-105 transition-all duration-300" @click="saveDraft" v-if="completedFields > 0">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                保存草稿
              </button>
              <button 
                class="btn btn-primary hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                @click="generatePlan"
                v-if="completedFields === totalFields"
                :class="{ 'loading': isGenerating }"
                :disabled="isGenerating"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-if="!isGenerating">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                {{ isGenerating ? '生成中...' : '生成教案' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 聊天消息类型
interface ChatMessage {
    type: 'ai' | 'user'
    content: string
    options?: Array<{ label: string; value: string }>
    showInput?: boolean
}

// 问题类型
interface Question {
    id: string
    type: 'text' | 'select' | 'textarea'
    content: string
    placeholder: string
    options?: string[]
    required: boolean
}

// 教案数据类型
interface TeachingPlanData {
    title: string
    subject: string
    grade: string
    duration: string
    description: string
    objectives: string
    keyPoints: string
    difficulties: string
    methods: string
    resources: string
    assessment: string
}

// 响应式数据
const chatMessages = ref<ChatMessage[]>([])
const currentQuestionIndex = ref(0)
const currentAnswer = ref('')
const isTyping = ref(false)
const isGenerating = ref(false)
const chatContainer = ref<HTMLElement>()

// 教案数据
const planData = ref<TeachingPlanData>({
    title: '',
    subject: '',
    grade: '',
    duration: '',
    description: '',
    objectives: '',
    keyPoints: '',
    difficulties: '',
    methods: '',
    resources: '',
    assessment: ''
})

// 问题列表
const questions: Question[] = [
    {
        id: 'title',
        type: 'text',
        content: '您好！我是AI教案助手，很高兴为您服务。让我们开始创建您的教案吧！首先，请告诉我这份教案的名称是什么？',
        placeholder: '例如：《分数的初步认识》',
        required: true
    },
    {
        id: 'subject',
        type: 'select',
        content: '很好！接下来请选择这份教案的学科领域：',
        placeholder: '请选择学科',
        options: ['数学', '语文', '英语', '科学', '历史', '地理', '音乐', '美术', '体育'],
        required: true
    },
    {
        id: 'grade',
        type: 'select',
        content: '请选择适用的年级：',
        placeholder: '请选择年级',
        options: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三'],
        required: true
    },
    {
        id: 'duration',
        type: 'select',
        content: '这份教案需要多少课时？',
        placeholder: '请选择课时',
        options: ['1课时', '2课时', '3课时', '4课时', '5课时'],
        required: true
    },
    {
        id: 'description',
        type: 'textarea',
        content: '请简要描述这节课的主要内容和目标：',
        placeholder: '例如：通过实际操作和生活实例，让学生初步认识分数的含义...',
        required: false
    },
    {
        id: 'objectives',
        type: 'textarea',
        content: '请描述这节课的教学目标（包括知识目标、能力目标、情感目标）：',
        placeholder: '例如：知识目标：理解分数的基本概念...',
        required: true
    },
    {
        id: 'keyPoints',
        type: 'textarea',
        content: '请说明本课的教学重点：',
        placeholder: '例如：分数概念的理解和应用...',
        required: true
    },
    {
        id: 'difficulties',
        type: 'textarea',
        content: '请说明本课的教学难点：',
        placeholder: '例如：分数意义的抽象理解...',
        required: true
    },
    {
        id: 'methods',
        type: 'textarea',
        content: '您计划采用什么教学方法？',
        placeholder: '例如：情境教学法、动手操作法、小组合作学习...',
        required: false
    },
    {
        id: 'resources',
        type: 'textarea',
        content: '需要哪些教学资源和工具？',
        placeholder: '例如：多媒体课件、教具、实验材料...',
        required: false
    },
    {
        id: 'assessment',
        type: 'textarea',
        content: '最后，您打算如何评价学生的学习效果？',
        placeholder: '例如：课堂问答、练习题、小组展示...',
        required: false
    }
]

// 计算属性
const currentQuestion = computed(() => questions[currentQuestionIndex.value])
const totalFields = computed(() => questions.filter(q => q.required).length)
const completedFields = computed(() => {
    return questions.filter((q, index) => {
        if (index >= currentQuestionIndex.value) return false
        return q.required ? planData.value[q.id as keyof TeachingPlanData] !== '' : true
    }).length
})

// 方法
const addMessage = (message: ChatMessage) => {
    chatMessages.value.push(message)
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
    })
}

const showTyping = () => {
    isTyping.value = true
    setTimeout(() => {
        isTyping.value = false
    }, 1000)
}

const askNextQuestion = () => {
    if (currentQuestionIndex.value < questions.length) {
        showTyping()
        setTimeout(() => {
            const question = questions[currentQuestionIndex.value]
            addMessage({
                type: 'ai',
                content: question.content,
                showInput: true
            })
        }, 1000)
    } else {
        // 所有问题都完成了
        showTyping()
        setTimeout(() => {
            addMessage({
                type: 'ai',
                content: '太棒了！我已经收集了所有必要的信息。您现在可以生成完整的教案了。点击下方的"生成教案"按钮，我将为您创建一份专业的教学方案。'
            })
        }, 1000)
    }
}

const handleAnswerChange = () => {
    // 实时更新答案
}

const submitAnswer = () => {
    if (!currentAnswer.value || currentAnswer.value.trim() === '') return

    const question = questions[currentQuestionIndex.value]
    const answer = currentAnswer.value.trim()

    // 添加用户回答
    addMessage({
        type: 'user',
        content: answer
    })

    // 保存答案
    planData.value[question.id as keyof TeachingPlanData] = answer

    // 重置输入
    currentAnswer.value = ''

    // 移动到下一个问题
    currentQuestionIndex.value++

    // AI 确认回答
    const confirmations = [
        '好的，我记下了！',
        '很好！',
        '明白了！',
        '收到！',
        '了解！'
    ]
    const randomConfirmation = confirmations[Math.floor(Math.random() * confirmations.length)]

    showTyping()
    setTimeout(() => {
        addMessage({
            type: 'ai',
            content: randomConfirmation
        })

        // 继续下一个问题
        setTimeout(() => {
            askNextQuestion()
        }, 500)
    }, 800)
}

const selectOption = (option: { label: string; value: string }) => {
  currentAnswer.value = option.value
  submitAnswer()
}

const selectQuickOption = (option: string) => {
  currentAnswer.value = option
  // 可以选择立即提交，或者等用户点击确认按钮
  // submitAnswer() // 取消注释以实现点击即提交
}

const getQuickSuggestions = () => {
  const currentQ = questions[currentQuestionIndex.value]
  if (!currentQ) return []
  
  // 根据问题类型返回建议
  switch (currentQ.id) {
    case 'objectives':
      return ['培养学生的...', '让学生掌握...', '提高学生的...', '激发学生的...']
    case 'keyPoints':
      return ['重点理解...', '掌握...的方法', '理解...的概念', '学会运用...']
    case 'difficulties':
      return ['抽象概念的理解', '理论联系实际', '知识的迁移运用', '思维方法的掌握']
    case 'methods':
      return ['情境教学法', '小组合作学习', '问题导向学习', '多媒体教学']
    case 'resources':
      return ['多媒体课件', '教学视频', '实验器材', '学习工具']
    case 'assessment':
      return ['课堂问答', '练习检测', '小组讨论', '作品展示']
    default:
      return []
  }
}

const addSuggestion = (suggestion: string) => {
  if (currentAnswer.value) {
    currentAnswer.value += suggestion
  } else {
    currentAnswer.value = suggestion
  }
}

const generatePlan = async () => {
    isGenerating.value = true

    try {
        // 模拟生成过程
        addMessage({
            type: 'ai',
            content: '正在为您生成专业的教案，请稍候...'
        })

        await new Promise(resolve => setTimeout(resolve, 3000))

        addMessage({
            type: 'ai',
            content: '教案生成完成！您的教案已经保存到教案库中，现在将为您跳转到教案详情页面。'
        })

        setTimeout(() => {
            router.push('/dashboard/teaching-design')
        }, 2000)

    } catch (error) {
        console.error('生成教案失败:', error)
        addMessage({
            type: 'ai',
            content: '抱歉，生成教案时出现了问题，请稍后重试。'
        })
    } finally {
        isGenerating.value = false
    }
}

const saveDraft = () => {
    console.log('保存草稿:', planData.value)
    addMessage({
        type: 'ai',
        content: '草稿已保存！您可以随时回来继续编辑。'
    })
}

const goBack = () => {
    router.push('/dashboard/teaching-design')
}

// 初始化
onMounted(() => {
  // 检查是否有来自开始页面的初始请求
  const initialRequest = sessionStorage.getItem('initialTeachingRequest')
  if (initialRequest) {
    // 清除 sessionStorage
    sessionStorage.removeItem('initialTeachingRequest')
    
    // 添加用户的初始请求作为第一条消息
    addMessage({
      type: 'user',
      content: initialRequest
    })
    
    // AI 确认并开始提问
    setTimeout(() => {
      addMessage({
        type: 'ai',
        content: '好的，我已经了解了您的需求！让我来帮您创建这份教案。我需要收集一些详细信息来为您生成专业的教学方案。'
      })
      
      setTimeout(() => {
        askNextQuestion()
      }, 1000)
    }, 800)
  } else {
    // 没有初始请求，直接开始正常流程
    setTimeout(() => {
      askNextQuestion()
    }, 500)
  }
})
</script>

<style scoped>
/* 淡入动画 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

/* 平滑滚动 */
.smooth-scroll {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 输入框焦点效果 */
.input:focus,
.textarea:focus,
.select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 按钮悬停效果 */
.btn:hover {
  transform: translateY(-1px);
}

/* 消息气泡动画 */
.message-bubble {
  transition: all 0.3s ease;
}

.message-bubble:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
</style>