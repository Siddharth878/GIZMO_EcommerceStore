/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html'
    // "./node_modules/flowbite/**/*.js"
  ],
  theme: {
     extend: {
        backgroundImage: {
      
            'hero-pattern': "linear-gradient(to right, rgba(0,0,0), rgba(255,255,255)), url('https://picsum.photos/id/36/1280/400')",
         
          // doubt how to use it
          // 'hero-pattern': "url('/IMG/mac.jpg')",
          // 'footer-texture': "url('/img/footer-texture.png')",
        }
      },
  },
  plugins: [
    // require('flowbite/plugin')
  ]
}

