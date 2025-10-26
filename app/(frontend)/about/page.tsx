import React from 'react'

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-24 lg:px-8 lg:py-32">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About the Author</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Author&apos;s Bio</h2>
          
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              Barbara Townsend has had a lifelong love of reading and writing stories. She has been a librarian, 
              a teacher to people from age three to seventy years, a textbook writer, and a facilitator of creative 
              writing for children, farmworkers and students from Gabon.
            </p>
            
            <p>
              Her aim in this facilitation work, and in her subsequent writing, is to give a voice to people who 
              might otherwise be forgotten and to tell the lesser-known histories of South Africa.
            </p>
            
            <p>
              <em>Ida&apos;s Line</em> and <em>Out of Mind – a story of Robben Island</em>, her first two novels are 
              about such histories. Her third novel is a childhood memoir – <em>The Colour of Flying</em> – 
              released in August 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage