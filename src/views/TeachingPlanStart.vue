<template>
  <div class="h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out">
    <!-- Back Button -->
    <button class="fixed top-6 left-6 btn btn-ghost btn-sm text-gray-600 z-10" @click="goBack">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      返回
    </button>

    <!-- Initial View -->
    <div 
      v-if="viewMode === 'initial'" 
      class="flex-1 flex items-center justify-center p-4 transition-all duration-700 ease-in-out"
    >
      <div class="w-full max-w-4xl flex flex-col items-center">
        <!-- Main Content -->
        <div class="text-center mb-8 flex flex-col items-center transition-all duration-500">
          <svg width="220" height="220" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="transform transition-transform duration-500 hover:scale-105">
          <g clip-path="url(#clip0_15_2)">
            <path
              d="M235.08 157.91C238.24 158.853 263.312 168.191 275.453 172.743L269.009 182.462C269.009 182.462 254.204 177.791 248.255 176.522C242.306 175.253 227.366 173.579 227.366 173.579L230.403 198.739C230.742 201.545 228.793 204.114 225.999 204.543C223.183 204.975 220.537 203.077 220.045 200.271L213.774 164.516C213.278 161.692 214.402 158.826 216.686 157.091C218.288 155.874 220.304 155.332 222.297 155.614C226.658 156.23 232.596 157.169 235.08 157.91Z"
              fill="#E2E8F0" />
            <path
              d="M205.045 159.578C206.218 164.736 208.603 172.009 209.544 176.045C211.32 183.665 201.917 204.743 205.685 212.393C206.276 213.591 207.638 214.07 208.97 214.174C211.843 214.398 214.478 212.651 215.17 209.853C217.091 202.081 219.436 189.256 218.773 186.071C217.941 182.078 225.712 168.07 227.296 164.135C240.315 164.1 262.078 164.31 275.222 164.37L274.08 146.378L213.633 150.056C212.296 150.138 211.024 150.664 210.021 151.552L206.835 154.372C205.352 155.684 204.605 157.647 205.045 159.578Z"
              fill="#CAD5E2" />
            <path
              d="M189.195 217.722C187.457 216.93 186.37 215.153 186.709 213.274C188.662 202.48 196.836 183.218 196.809 179.532C196.771 174.433 205.698 151.166 204.273 144.312C202.849 137.459 214.764 130.898 219.087 132.042C222.546 132.958 267.16 143.842 289.034 149.17L283.109 169.807L224.745 154.358C222.548 166.74 211.597 178.082 208.4 187.557C207.766 194.251 200.425 207.16 196.59 214.867C195.282 217.496 191.867 218.939 189.195 217.722V217.722Z"
              fill="#00B8DB" />
            <rect x="52" y="72" width="155" height="216" rx="12" fill="url(#paint0_linear_15_2)" />
            <path
              d="M96 72H231.8C238.521 72 241.881 72 244.448 73.3079C246.706 74.4584 248.542 76.2942 249.692 78.5521C251 81.1191 251 84.4794 251 91.2V268.8C251 275.521 251 278.881 249.692 281.448C248.542 283.706 246.706 285.542 244.448 286.692C241.881 288 238.521 288 231.8 288H96V72Z"
              fill="#CAD5E2" />
            <path
              d="M140 72H231.8C238.521 72 241.881 72 244.448 73.3079C246.706 74.4584 248.542 76.2942 249.692 78.5521C251 81.1191 251 84.4794 251 91.2V268.8C251 275.521 251 278.881 249.692 281.448C248.542 283.706 246.706 285.542 244.448 286.692C241.881 288 238.521 288 231.8 288H140V72Z"
              fill="#E2E8F0" />
            <path
              d="M179.919 151.55C181.516 148.337 182.314 146.731 182.985 146.049C185.769 143.221 190.482 143.826 192.461 147.265C192.939 148.094 193.306 149.85 194.04 153.362V153.362C194.684 156.448 195.007 157.99 195.482 159.416C197.341 164.999 201.039 169.786 205.972 172.995C207.232 173.814 208.643 174.516 211.465 175.919V175.919C214.679 177.516 216.285 178.314 216.967 178.985C219.795 181.769 219.19 186.482 215.751 188.461C214.922 188.939 213.166 189.306 209.653 190.04V190.04C206.568 190.684 205.025 191.007 203.599 191.482C198.017 193.341 193.23 197.039 190.021 201.972C189.201 203.232 188.5 204.643 187.097 207.466V207.466C185.5 210.679 184.702 212.285 184.03 212.967C181.247 215.795 176.534 215.19 174.554 211.751C174.077 210.922 173.71 209.166 172.976 205.654V205.654C172.331 202.568 172.009 201.025 171.534 199.599C169.675 194.017 165.976 189.23 161.044 186.021C159.784 185.201 158.373 184.5 155.55 183.097V183.097C152.337 181.5 150.731 180.702 150.049 180.03C147.221 177.247 147.826 172.534 151.265 170.554C152.094 170.077 153.85 169.71 157.362 168.976V168.976C160.448 168.331 161.99 168.009 163.416 167.534C168.999 165.675 173.786 161.976 176.995 157.044C177.814 155.784 178.516 154.373 179.919 151.55V151.55Z"
              fill="#FF8904" />
            <path
              d="M216.085 213.405C216.272 211.612 216.365 210.716 216.796 210.233C217.172 209.813 217.708 209.57 218.273 209.566C218.92 209.561 219.654 210.084 221.123 211.129L223.434 212.772C224.922 213.831 225.667 214.36 225.874 214.978C226.054 215.517 225.996 216.107 225.716 216.601C225.394 217.167 224.562 217.543 222.897 218.296L220.293 219.472C218.628 220.225 217.796 220.601 217.158 220.468C216.602 220.353 216.121 220.006 215.836 219.515C215.509 218.951 215.603 218.043 215.792 216.226L216.085 213.405Z"
              fill="#C27AFF" />
            <circle cx="211.5" cy="149.5" r="5.5" fill="#00D5BE" />
            <path
              d="M268.148 311.423C261.792 316.021 252.591 313.46 248.73 306.63C240.246 291.624 228.868 275.151 226.595 260.002C224.109 243.424 223.665 230.967 242.095 207.002C260.526 183.037 270.412 155.515 264.135 142.843C257.857 130.17 253.155 119.085 250.653 111.486C245.973 97.2694 214.776 79.0657 216.465 58.47C216.693 55.6922 219.982 54.8347 222.111 56.6343C239.915 71.6879 258.167 83.6804 273.161 96.7068C277.622 100.583 281.303 118.241 286.955 129.014C292.607 139.786 307.097 155.019 309.61 159.456C312.124 163.892 303.516 182.518 301.558 198.955C299.599 215.391 293.133 237.615 297.095 249.502C299.584 256.967 303.187 264.556 306.178 270.297C309.077 275.859 307.669 282.841 302.586 286.517L268.148 311.423Z"
              fill="url(#paint1_linear_15_2)" />
            <path
              d="M227.906 251.793C230.201 229.981 242.191 203.083 241.728 191.444C241.149 176.895 237.067 172.538 230.76 164.524C223.521 155.326 219.467 139.816 229.603 135.426C239.739 131.037 247.904 146.246 255.479 150.069C263.055 153.892 267.78 158.653 269.332 166.564C270.884 174.476 268.636 183.638 272.389 195.037C275.391 204.155 283.268 217.424 286.832 222.918L227.906 251.793Z"
              fill="url(#paint2_linear_15_2)" />
          </g>
          <defs>
            <linearGradient id="paint0_linear_15_2" x1="207" y1="128.656" x2="156.426" y2="308.633"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#90A1B9" />
              <stop offset="1" stop-color="#CAD5E2" />
            </linearGradient>
            <linearGradient id="paint1_linear_15_2" x1="274.762" y1="258.663" x2="301.93" y2="290.563"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#0092B8" />
              <stop offset="1" stop-color="#00B8DB" />
            </linearGradient>
            <linearGradient id="paint2_linear_15_2" x1="223.788" y1="137.389" x2="263.629" y2="231.914"
              gradientUnits="userSpaceOnUse">
              <stop stop-color="#007595" />
              <stop offset="1" stop-color="#0092B8" />
            </linearGradient>
            <clipPath id="clip0_15_2">
              <rect width="360" height="360" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <h1 class="text-3xl font-bold text-gray-800 mb-3">AI 教案生成</h1>
        <p class="text-lg text-gray-600 mb-8">告诉我您想要创建什么样的教案，我来帮您生成专业的教学方案</p>
      </div>

      <!-- Input Container -->
    <div class="bg-white rounded-2xl p-6 max-w-3xl mx-auto w-full overflow-visible px-4">
          <!-- Smart Input Area -->
          <div class="relative">
          <!-- Template-based Input -->
          <div :class="[
            'w-full min-h-[120px] text-lg leading-relaxed text-gray-800',
            viewMode === 'initial' ? 'max-h-[300px] overflow-y-auto' : ''
          ]">
            <div class="flex flex-wrap items-center gap-1">
              <span>生成</span>
              
              <!-- Grade Dropdown -->
              <div class="relative inline-block">
                <select 
                  v-model="selectedGrade"
                  class="select select-bordered select-sm appearance-none cursor-pointer rounded-full pr-8 focus:outline-none focus:ring-0"
                  @change="updateInput"
                >
                  <option value="1 年级">1 年级</option>
                  <option value="2 年级">2 年级</option>
                  <option value="3 年级">3 年级</option>
                  <option value="4 年级">4 年级</option>
                  <option value="5 年级">5 年级</option>
                  <option value="6 年级">6 年级</option>
                  <option value="7 年级">7 年级</option>
                  <option value="8 年级" selected>8 年级</option>
                  <option value="9 年级">9 年级</option>
                  <option value="高一">高一</option>
                  <option value="高二">高二</option>
                  <option value="高三">高三</option>
                </select>
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              
              <span>的</span>
              
              <!-- Subject Dropdown -->
              <div class="relative inline-block">
                <select 
                  v-model="selectedSubject"
                  class="select select-bordered select-sm appearance-none cursor-pointer rounded-full pr-8 focus:outline-none focus:ring-0"
                  @change="updateInput"
                >
                  <option value="语文" selected>语文</option>
                  <option value="数学">数学</option>
                  <option value="英语">英语</option>
                  <option value="物理">物理</option>
                  <option value="化学">化学</option>
                  <option value="生物">生物</option>
                  <option value="历史">历史</option>
                  <option value="地理">地理</option>
                  <option value="政治">政治</option>
                  <option value="科学">科学</option>
                  <option value="音乐">音乐</option>
                  <option value="美术">美术</option>
                  <option value="体育">体育</option>
                </select>
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              
              <span>学科的</span>
              
              <!-- Course Name Input -->
              <div class="relative inline-block">
                <input 
                  v-model="courseName"
                  type="text"
                  class="input input-bordered input-sm rounded-full min-w-[120px] focus:outline-none focus:ring-0"
                  placeholder="课程名称"
                  @input="updateInput"
                />
              </div>
              
              <span>课程的教案，</span>
              
              <!-- Duration Dropdown -->
              <div class="relative inline-block">
                <select 
                  v-model="selectedDuration"
                  class="select select-bordered select-sm appearance-none cursor-pointer rounded-full pr-8 focus:outline-none focus:ring-0"
                  @change="updateInput"
                >
                  <option value="1 课时">1 课时</option>
                  <option value="2 课时" selected>2 课时</option>
                  <option value="3 课时">3 课时</option>
                  <option value="4 课时">4 课时</option>
                  <option value="5 课时">5 课时</option>
                </select>
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <!-- Additional Requirements (Optional) -->
            <div class="mt-4">
              <textarea 
                v-model="additionalRequirements"
                class="w-full resize-none border-0 focus:ring-0 focus:outline-none text-gray-600 placeholder-gray-400 text-base"
                placeholder="您还有其他特殊要求吗？例如：重点关注学生的理解能力培养..."
                rows="2"
                @input="updateInput"
              ></textarea>
            </div>
          </div>

          <!-- Hidden actual input for form submission -->
          <input type="hidden" v-model="userInput" />

          <!-- Submit Button -->
          <div class="flex justify-between items-end mt-4">
            <!-- Left side buttons -->
            <div class="flex gap-2">
              <button class="btn btn-ghost btn-sm text-gray-500 hover:text-gray-700" @click="addReference" title="参考图">
                <svg class="w-5 h-5" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M56.6865 7C59.869 7.00006 62.9215 8.26427 65.1719 10.5146L95.4854 40.8281C97.7357 43.0785 98.9999 46.131 99 49.3135V101C99 107.627 93.6274 113 87 113H33C26.3726 113 21 107.627 21 101V19C21 12.3726 26.3726 7 33 7H56.6865ZM33 15C30.7909 15 29 16.7909 29 19V101C29 103.209 30.7909 105 33 105H87C89.2091 105 91 103.209 91 101V50H68C61.3726 50 56 44.6274 56 38V15H33ZM77 91C79.2091 91 81 92.7909 81 95C81 97.2091 79.2091 99 77 99H39C36.7909 99 35 97.2091 35 95C35 92.7909 36.7909 91 39 91H77ZM70 77C72.2091 77 74 78.7909 74 81C74 83.2091 72.2091 85 70 85H39C36.7909 85 35 83.2091 35 81C35 78.7909 36.7909 77 39 77H70ZM63 63C65.2091 63 67 64.7909 67 67C67 69.2091 65.2091 71 63 71H39C36.7909 71 35 69.2091 35 67C35 64.7909 36.7909 63 39 63H63ZM64 38C64 40.2091 65.7909 42 68 42H85.3428L64 20.6572V38Z" fill="currentColor"/>
                </svg>
                参考文件
              </button>
              <button class="btn btn-ghost btn-sm text-gray-500 hover:text-gray-700" @click="setRatio" title="联网搜索">
                  <svg class="w-5 h-5"  viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="thickness=Standard, mode=default, name=symbol_informationCircle">
                    <path id="S1" fill-rule="evenodd" clip-rule="evenodd" d="M60 13C57.7989 13 55.6332 13.1513 53.5126 13.4441C53.2063 13.9289 52.8148 14.5723 52.3607 15.3699C51.1703 17.4605 49.5518 20.6063 47.9098 24.7298C46.2635 28.8644 44.5943 33.9798 43.3089 40H76.6911C75.4057 33.9798 73.7365 28.8644 72.0902 24.7298C70.4482 20.6063 68.8297 17.4605 67.6393 15.3699C67.1852 14.5723 66.7937 13.9289 66.4874 13.4441C64.3668 13.1513 62.2011 13 60 13ZM40.4774 21.7703C38.527 26.6685 36.5664 32.7799 35.1422 40H17.4554C22.5602 29.1597 31.6862 20.5865 42.9103 16.2036C42.1286 17.8367 41.3038 19.6948 40.4774 21.7703ZM33.8653 48H14.5458C13.5372 51.8307 13 55.8526 13 60C13 64.1474 13.5372 68.1693 14.5458 72H33.4693C33.1201 68.3726 32.9494 64.5165 33.0131 60.4376C33.0817 56.0447 33.3869 51.8948 33.8653 48ZM34.5735 80H17.4554C22.4752 90.6598 31.3834 99.1273 42.3513 103.574C41.629 102.152 40.8812 100.564 40.1376 98.8146C38.0197 93.8309 35.9373 87.5349 34.5735 80ZM42.7159 80H77.2841C76.0402 86.2706 74.2718 91.5158 72.4997 95.6855C70.8127 99.6549 69.1211 102.653 67.8727 104.632C67.363 105.44 66.9276 106.077 66.5974 106.541C64.4417 106.843 62.2391 107 60 107C57.7609 107 55.5583 106.843 53.4026 106.541C53.0724 106.077 52.637 105.44 52.1273 104.632C50.8789 102.653 49.1873 99.6549 47.5003 95.6855C45.7282 91.5158 43.9598 86.2706 42.7159 80ZM78.4903 72H41.5097C41.1366 68.4396 40.9487 64.6249 41.0121 60.5625C41.0819 56.094 41.4139 51.9016 41.9301 48H78.0699C78.5861 51.9016 78.9181 56.094 78.9879 60.5625C79.0513 64.6249 78.8634 68.4396 78.4903 72ZM85.4265 80C84.0627 87.5349 81.9803 93.8309 79.8624 98.8146C79.1188 100.564 78.371 102.152 77.6487 103.574C88.6166 99.1273 97.5248 90.6598 102.545 80H85.4265ZM105.454 72H86.5307C86.8799 68.3726 87.0506 64.5165 86.9869 60.4376C86.9183 56.0447 86.6131 51.8948 86.1347 48H105.454C106.463 51.8307 107 55.8526 107 60C107 64.1474 106.463 68.1693 105.454 72ZM77.0897 16.2036C88.3138 20.5865 97.4398 29.1597 102.545 40H84.8578C83.4336 32.7799 81.473 26.6685 79.5226 21.7703C78.6962 19.6948 77.8714 17.8367 77.0897 16.2036ZM5 60C5 29.6243 29.6243 5 60 5C90.3757 5 115 29.6243 115 60C115 90.3757 90.3757 115 60 115C29.6243 115 5 90.3757 5 60Z" fill="currentColor"/>
                   </g>
                  </svg>
                联网搜索
              </button>
            </div>

            <!-- Right side buttons -->
            <div class="flex gap-2 items-center">
              <button class="btn btn-ghost btn-sm text-gray-500 hover:text-gray-700" @click="voiceInput" title="语音输入">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z">
                  </path>
                </svg>
              </button>
              <button class="btn btn-primary rounded-full w-10 h-10 p-0 flex items-center justify-center"
                @click="startConversation" :disabled="!userInput.trim()" title="开始创建">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>

    <!-- Chat View -->
    <div 
      v-if="viewMode === 'chat'" 
      class="flex-1 flex flex-col transition-all duration-700 ease-in-out"
    >
      <!-- Chat Messages Area -->
      <div class="flex-1 overflow-auto smooth-scroll" ref="chatContainer">
        <div class="max-w-4xl mx-auto space-y-4">
          <!-- Messages -->
          <div 
            v-for="(message, index) in chatMessages" 
            :key="index"
            class="flex gap-4 animate-fade-in opacity-0"
            :style="{ animationDelay: `${index * 200}ms` }"
          >
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
              </div>
              <div class="text-sm text-gray-500 mt-2" v-if="message.type === 'ai'">
                AI助手
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex gap-4 animate-fade-in opacity-0">
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
      </div>

      <!-- Chat Input Area -->
      <div class="mb-9">
        <div class="max-w-4xl mx-auto flex gap-3">
          <div class="flex-1">
            <input 
              v-model="newUserMessage"
              type="text"
              class="input input-bordered w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="输入您的消息..."
              @keydown.enter="sendNewMessage"
            />
          </div>
          <button 
            class="btn btn-primary rounded-full w-12 h-12 p-0 flex items-center justify-center hover:scale-105 transition-transform duration-200"
            @click="sendNewMessage" 
            :disabled="!newUserMessage.trim()"
            title="发送消息"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 聊天消息类型
interface ChatMessage {
  type: 'ai' | 'user'
  content: string
}

const router = useRouter()
const inputTextarea = ref<HTMLTextAreaElement>()
const userInput = ref('')
const chatContainer = ref<HTMLElement>()

// 新增：视图模式，'initial' 为初始模板输入，'chat' 为对话模式
const viewMode = ref<'initial' | 'chat'>('initial')
// 新增：聊天消息列表
const chatMessages = ref<ChatMessage[]>([])
// 新增：聊天模式下的用户输入
const newUserMessage = ref('')
// 新增：AI 是否正在输入
const isTyping = ref(false)

// Template input fields
const selectedGrade = ref('8 年级')
const selectedSubject = ref('语文')
const courseName = ref('春江花月夜')
const selectedDuration = ref('2 课时')
const additionalRequirements = ref('')

// Update combined input
const updateInput = () => {
  const baseTemplate = `生成"${selectedGrade.value}"的"${selectedSubject.value}"学科"${courseName.value}"课程的教案，"${selectedDuration.value}"`
  const additional = additionalRequirements.value.trim() ? `\n\n${additionalRequirements.value}` : ''
  userInput.value = baseTemplate + additional
}

// Initialize on mount
onMounted(() => {
  updateInput()
})

// 功能按钮（暂时为占位符）
const addReference = () => {
  console.log('添加参考图')
}

const setRatio = () => {
  console.log('设置比例')
}

const voiceInput = () => {
  console.log('语音输入')
}
const startConversation = () => {
  if (!userInput.value.trim()) return

  // 1. 将用户的初始请求添加到消息列表
  addMessage({
    type: 'user',
    content: userInput.value,
  })

  // 2. 切换到聊天视图
  viewMode.value = 'chat'

  // 3. 模拟 AI 回复
  mockAiResponse()
}

// 新增：添加消息到列表并滚动到底部
const addMessage = (message: ChatMessage) => {
  chatMessages.value.push(message)
  nextTick(() => {
    // Give the browser a tick to render message, then scroll
    setTimeout(() => {
      if (chatContainer.value) {
        try {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        } catch (e) {
          /* ignore */
        }
      }
    }, 40)
  })
}

// 新增：发送新消息（用于聊天模式）
const sendNewMessage = () => {
  if (!newUserMessage.value.trim()) return
  addMessage({
    type: 'user',
    content: newUserMessage.value,
  })
  newUserMessage.value = ''
  mockAiResponse()
}

// 新增：模拟 AI 回复
const mockAiResponse = () => {
  isTyping.value = true
  setTimeout(() => {
    isTyping.value = false
    const responses = [
      '好的，我正在处理您的请求...',
      '明白了，请稍等，我正在为您生成内容。',
      '收到！让我想一想...',
    ]
    addMessage({
      type: 'ai',
      content: responses[Math.floor(Math.random() * responses.length)],
    })
  }, 1200)
}

// 返回教学设计页面
const goBack = () => {
  router.push('/dashboard/teaching-design')
}

// 页面加载时聚焦输入框
nextTick(() => {
  if (inputTextarea.value) {
    inputTextarea.value.focus()
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

/* 移除默认的 textarea 边框和焦点样式 */
textarea:focus {
  outline: none;
  box-shadow: none;
}

/* 自定义滚动条 */
textarea::-webkit-scrollbar,
::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track,
::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover,
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

/* 平滑过渡 */
.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>