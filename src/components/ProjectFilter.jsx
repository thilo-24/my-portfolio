import React, { useState } from 'react';

export default function ProjectFilter({ initialProjects = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories dynamically from projects
  const categories = ['All', ...new Set(initialProjects.map((p) => p.data?.category).filter(Boolean))];

  // Filter projects based on the selected tab
  const filteredProjects = selectedCategory === 'All'
    ? initialProjects
    : initialProjects.filter((p) => p.data?.category === selectedCategory);

  return (
    <div className="space-y-10">
      
      {/* Category Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-4">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 scale-[1.02]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800/90 border border-slate-800'
              }`}
            >
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              {category}
            </button>
          );
        })}
      </div>

      {/* Dynamic Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          // Clean slug extraction for routing
          const slug = project.id ? project.id.replace(/\.[^/.]+$/, '') : '';
          const { title, description, category, tags = [], image, github, demo } = project.data || {};

          return (
            <article
              key={project.id || title}
              className="group relative bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm"
            >
              
              {/* Optional Project Image / Gradient Header */}
              <div className="relative h-48 w-full bg-slate-950 overflow-hidden border-b border-slate-800/60">
                {image ? (
                  <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 flex items-center justify-center p-6 text-slate-700">
                    <svg className="w-12 h-12 text-slate-800 group-hover:text-indigo-500/30 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                )}

                {/* Category Badge Floating overlay */}
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-indigo-400 border border-indigo-500/30 shadow-md">
                    {category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-indigo-400 transition-colors duration-200">
                    {title}
                  </h3>

                  <p className="text-slate-400 text-sm mt-2.5 leading-relaxed line-clamp-2">
                    {description}
                  </p>
                </div>

                {/* Tags Ribbon */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[11px] font-mono text-slate-400 bg-slate-800/60 border border-slate-800 px-2.5 py-1 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-slate-800/60 pt-4">
                <a
                  href={`/projects/${slug}`}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1.5 transition-colors"
                >
                  Read Case Study
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                <div className="flex items-center gap-3">
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      title="View GitHub Repository"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    </a>
                  )}

                  {demo && (
                    <a
                      href={demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-400 transition-colors p-1"
                      title="Live Preview"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
          <p className="text-slate-400 text-sm font-medium">
            No projects found under the "{selectedCategory}" category.
          </p>
        </div>
      )}

    </div>
  );
}