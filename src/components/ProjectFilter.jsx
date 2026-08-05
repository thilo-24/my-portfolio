import React, { useState } from 'react';

export default function ProjectFilter({ initialProjects }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories dynamically from projects
  const categories = ['All', ...new Set(initialProjects.map((p) => p.data.category))];

  // Filter projects based on the selected tab
  const filteredProjects = selectedCategory === 'All'
    ? initialProjects
    : initialProjects.filter((p) => p.data.category === selectedCategory);

  return (
    <div class="space-y-8">
      {/* Category Tabs Bar */}
      <div class="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            class={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Dynamic Projects Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          // Clean slug extraction for routing
          const slug = project.id.replace(/\.[^/.]+$/, '');

          return (
            <article
              key={project.id}
              class="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div class="p-6">
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {project.data.category}
                  </span>
                </div>

                <h3 class="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {project.data.title}
                </h3>

                <p class="text-slate-400 text-sm mt-2 line-clamp-2">
                  {project.data.description}
                </p>

                <div class="flex flex-wrap gap-2 mt-4">
                  {project.data.tags.map((tag) => (
                    <span key={tag} class="text-xs text-slate-400 bg-slate-800/80 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div class="p-6 pt-0 mt-auto flex items-center justify-between border-t border-slate-800/60 pt-4">
                <a
                  href={`/projects/${slug}`}
                  class="text-sm font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1"
                >
                  Read Case Study &rarr;
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div class="text-center py-12 text-slate-500 text-sm">
          No projects found under this category.
        </div>
      )}
    </div>
  );
}