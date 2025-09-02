export default function Home() {
  const projects = [
    {
      name: "MarvelSearch",
      description: "A Marvel character search application built with React and Marvel API",
      githubUrl: "https://github.com/YuriValenca/fpass_challenge",
      liveUrl: "/marvel-search", 
    },
    {
      name: "PokéConsult",
      description: "A Pokémon consultation app using PokeAPI with detailed stats",
      githubUrl: "https://github.com/YuriValenca/desafioJusta",
      liveUrl: "/poke-consult",
    },
    {
      name: "Third Project",
      description: "Coming soon - new project under development",
      githubUrl: "#",
      liveUrl: "/third-project",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Yuri Valença
          </h1>
          <p className="text-xl text-gray-300">
            Full Stack Developer & Software Engineer
          </p>
        </header>

        <section>
          <h2 className="text-3xl font-semibold mb-8 text-center">
            My Projects
          </h2>
          
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <li 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:bg-gray-700/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-400">
                  {project.name}
                </h3>
                
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-sm font-medium rounded-md transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                  
                  {project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-medium rounded-md transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
