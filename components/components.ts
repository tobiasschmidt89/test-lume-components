import { Site } from "lume/core.ts";
import { merge, warn } from "lume/core/utils.ts";
import ComponentLoader from "./component_loader.ts";

export interface Options {
  /** The directory where the components are */
  directory: string;

  /** The helper name used to access to the components */
  name: string;
}

const defaults: Options = {
  directory: "_components",
  name: "comp",
};

export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    // Create the component loader
    const components = new ComponentLoader(site, options.directory);

    // Create a proxy to returns the components
    // as comp.button() instead of comp.getComponent("button").render()
    const proxy = new Proxy(components, {
      get(target: ComponentLoader, name: string) {
        const component = target.getComponent(name);

        if (component) {
          return component.render;
        }

        warn("Component not found.", { name });
        return () => undefined;
      },
    });

    site.data(options.name, proxy);
    site.addEventListener("beforeBuild", () => components.loadComponents());
    site.addEventListener("beforeUpdate", () => components.loadComponents());
    site.addEventListener(
      "afterRender",
      () => site.pages.push(...components.getAssets()),
    );
  };
}
