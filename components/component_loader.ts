import { Page, Site } from "lume/core.ts";
import { SitePage } from "lume/core/filesystem.ts";
import { Component, ComponentLoader } from "./types.ts";

export default class LumeComponents implements ComponentLoader {
  site: Site;
  directory: string;
  components: Map<string, Component> = new Map();
  css: Set<string> = new Set();
  js: Set<string> = new Set();

  constructor(site: Site, directory: string) {
    this.site = site;
    this.directory = directory;
  }

  async loadComponents() {
    for await (const entry of Deno.readDir(this.site.src(this.directory))) {
      if (entry.isFile) {
        const component = await this.#loadComponent(this.directory, entry.name);

        if (component) {
          this.components.set(component.name.toLowerCase(), component);
        }
      }
    }
  }

  getAssets(): Page[] {
    const assets: Page[] = [];

    if (this.css.size) {
      const page = new SitePage();
      page.dest.path = "/components";
      page.dest.ext = ".css";
      page.content = Array.from(this.css).join("\n");
      assets.push(page);
    }

    if (this.js.size) {
      const page = new SitePage();
      page.dest.path = "/components";
      page.dest.ext = ".js";
      page.content = Array.from(this.js).join("\n");
      assets.push(page);
    }

    return assets;
  }

  getComponent(name: string) {
    const component = this.components.get(name.toLowerCase());

    if (!component) {
      return;
    }

    if (!component.used) {
      component.used = true;

      if (component.css) {
        this.css.add(component.css);
      }

      if (component.js) {
        this.js.add(component.js);
      }
    }

    return component;
  }

  async #loadComponent(
    directory: string,
    filename: string,
  ): Promise<Component | undefined> {
    const file = this.site.src(directory, filename);
    const info = this.site.source.getPageLoader(file);

    if (info) {
      const [ext, loader] = info;
      const data = await this.site.source.readFile(file, loader);

      return {
        name: filename.slice(0, -ext.length),
        render: data.content,
        css: data.css,
        js: data.js,
        used: false,
      } as Component;
    }
  }
}
