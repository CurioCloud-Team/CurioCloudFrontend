<template>
  <div class="min-h-screen flex flex-col transition-all duration-500 ease-in-out">
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
        <p class="text-lg text-gray-600 mb-8">让我来帮您创建一份专业的教学方案</p>

        <!-- Loading indicator while starting conversation -->
        <div v-if="isTyping" class="flex flex-col items-center">
          <div class="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
          <p class="text-gray-600">正在初始化对话...</p>
        </div>
        </div>
      </div>
    </div>

    <!-- Chat View -->
    <div 
      v-if="viewMode === 'chat'" 
      class="flex-1 flex flex-col transition-all duration-700 ease-in-out"
    >
      <!-- Header Section (moved from center) -->
      <div class="flex-shrink-0 p-8 pb-4">
        <div class="max-w-4xl mx-auto text-center">
          <div class="flex flex-col items-center">
            <svg width="120" height="120" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="transform transition-transform duration-500 hover:scale-105 mb-4">
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

            <h1 class="text-2xl font-bold text-gray-800 mb-2">AI 教案生成</h1>
            <p class="text-base text-gray-600">让我来帮您创建一份专业的教学方案</p>
          </div>
        </div>
      </div>

      <!-- Chat Messages Area -->
      <div class="flex-1 overflow-y-auto smooth-scroll min-h-0" ref="chatContainer">
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
              <!-- AI Message -->
              <div v-if="message.type === 'ai'" :class="[
                'rounded-2xl px-6 py-4 transition-all duration-300 ease-out',
                'bg-white text-gray-800 shadow-sm border border-gray-100'
              ]">
                <p class="text-base leading-relaxed">{{ message.content }}</p>
              </div>

              <!-- User Message -->
              <div v-else-if="message.type === 'user'" :class="[
                'rounded-2xl px-6 py-4 transition-all duration-300 ease-out',
                'bg-blue-500 text-white ml-auto shadow-md'
              ]">
                <p class="text-base leading-relaxed">{{ message.content }}</p>
              </div>

              <!-- Question Card -->
              <div v-else-if="message.type === 'question' && message.questionCard" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div class="mb-4">
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ message.questionCard.question }}</h3>
                  <p class="text-sm text-gray-600">请选择一个选项继续：</p>
                </div>
                <div class="space-y-2">
                  <button
                    v-for="(option, optionIndex) in message.questionCard.options"
                    :key="optionIndex"
                    @click="selectOption(option)"
                    class="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <span class="text-gray-700">{{ option }}</span>
                  </button>
                </div>
                <div v-if="message.questionCard.allows_free_text" class="mt-4">
                  <input
                    v-model="newUserMessage"
                    type="text"
                    class="input input-bordered w-full"
                    placeholder="或输入自定义回答..."
                    @keydown.enter="sendNewMessage"
                  />
                </div>
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
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { startConversationAPI, processAnswerAPI } from '@/services/teaching'
import type { QuestionCard, ProcessAnswerResponse } from '@/types/teaching'

// 聊天消息类型
interface ChatMessage {
  type: 'ai' | 'user' | 'question'
  content?: string
  questionCard?: QuestionCard
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
// 新增：当前会话ID
const currentSessionId = ref<string>('')

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
  // 自动开始会话
  startConversation()
})

// 监听消息变化，确保滚动到底部
watch(chatMessages, () => {
  nextTick(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 200)
  })
}, { deep: true })

const startConversation = async () => {
  try {
    // 显示加载状态
    isTyping.value = true

    // 调用 API 开始会话
    const response = await startConversationAPI({ use_dynamic_mode: true })

    // 切换到聊天视图
    viewMode.value = 'chat'
    isTyping.value = false

    currentSessionId.value = response.session_id

    // 添加问题卡片消息
    addMessage({
      type: 'question',
      questionCard: response.question_card,
    })
  } catch (error) {
    console.error('开始会话失败:', error)
    isTyping.value = false
    // 可以添加错误处理
  }
}

// 新增：处理选项选择
const selectOption = async (option: string) => {
  // 添加用户选择的消息
  addMessage({
    type: 'user',
    content: option,
  })

  try {
    isTyping.value = true
    const response: ProcessAnswerResponse = await processAnswerAPI({
      session_id: currentSessionId.value,
      answer: option,
    })
    isTyping.value = false

    if (response.lesson_plan) {
      // 如果有教案，跳转到教案详情页面
      router.push({
        name: 'LessonPlanDetail',
        params: { planId: response.lesson_plan.id.toString() }
      })
    } else if (response.question_card) {
      // 否则显示下一个问题
      addMessage({
        type: 'question',
        questionCard: response.question_card,
      })
    }
  } catch (error) {
    console.error('处理回答失败:', error)
    isTyping.value = false
    // 可以添加错误处理
  }
}

// 新增：添加消息到列表并滚动到底部
const addMessage = (message: ChatMessage) => {
  chatMessages.value.push(message)
  nextTick(() => {
    // 等待DOM更新后滚动到底部
    setTimeout(() => {
      scrollToBottom()
      // 再次延迟滚动，确保所有动画和渲染完成
      setTimeout(() => {
        scrollToBottom()
      }, 50)
    }, 100)
  })
}

// 新增：滚动到底部的函数
const scrollToBottom = () => {
  if (chatContainer.value) {
    try {
      const container = chatContainer.value
      container.scrollTop = container.scrollHeight
      // 使用 scrollIntoView 作为备选方案
      const lastMessage = container.querySelector('.animate-fade-in:last-child')
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    } catch (e) {
      // 忽略滚动错误
      console.warn('滚动失败:', e)
    }
  }
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

// 新增：模拟 AI 回复（保留用于其他情况）
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

/* 平滑滚动 */
.smooth-scroll {
  scroll-behavior: smooth;
}
</style>